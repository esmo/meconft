// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/safemath.sol";

contract MecoNftFactory is ERC721 {
    using SafeMath for uint;

    mapping(string => address) tokenToOwner;
    mapping(address => uint) ownerTokenCount;
    mapping(string => address) approvals;

    event Transfer(address indexed _from, address indexed _to, string _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        string _value
    );

    constructor() ERC721("MeCoNft", "MECONFT") {}

    function balanceOf(address _owner) public view override returns (uint256) {
        return ownerTokenCount[_owner];
    }

    function ownerOf(string memory _tokenId) public view returns (address) {
        return tokenToOwner[_tokenId];
    }

    function approve(address _to, string memory _tokenId) external {
        require(tokenToOwner[_tokenId] == msg.sender, "not permitted");
        approvals[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        string memory _tokenId
    ) external payable {
        require(
            (tokenToOwner[_tokenId] == msg.sender ||
                approvals[_tokenId] == msg.sender),
            "operation not permitted"
        );
        require(msg.value == 10000000 gwei, "Transfer costs 0.01 ETH");
        tokenToOwner[_tokenId] = _to;
        delete approvals[_tokenId];
        emit Transfer(_from, _to, _tokenId);
    }

    function mint(address _recipient, string memory _hash) external {
        require(_recipient != address(0));
        require(tokenToOwner[_hash] == address(0), "hash already exists");
        tokenToOwner[_hash] = _recipient;
        ownerTokenCount[_recipient] = ownerTokenCount[_recipient].add(1);
        emit Transfer(address(0), _recipient, _hash);
    }
}
