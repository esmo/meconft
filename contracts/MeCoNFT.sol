// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MeCoNft is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIds;
    mapping(string => uint256) private tokenIdByURI;
    mapping(address => uint256[]) public userOwnedTokens;
    mapping(uint256 => uint256) private userOwnedTokenIndexes;

    constructor() ERC721("MeCoNft", "MECONFT") {}

    function lastTokenId() public view returns (uint256) {
        return Counters.current(tokenIds);
    }

    function mintNft(string memory tokenURI) external returns (uint256) {
        require(tokenIdByURI[tokenURI] == 0, "URI already minted");
        tokenIds.increment();
        uint256 newNftTokenId = tokenIds.current();
        userOwnedTokens[msg.sender].push(newNftTokenId);
        userOwnedTokenIndexes[newNftTokenId] =
            userOwnedTokens[msg.sender].length -
            1;
        _safeMint(msg.sender, newNftTokenId);
        setTokenURI(newNftTokenId, tokenURI);

        return newNftTokenId;
    }

    function setTokenURI(uint256 _tokenId, string memory _tokenURI) private {
        _setTokenURI(_tokenId, _tokenURI);
        tokenIdByURI[_tokenURI] = _tokenId;
    }

    function tokensOfUser(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        return userOwnedTokens[_owner];
    }

    function removeUserOwnedToken(address from, uint256 tokenId) private {
        require(
            userOwnedTokens[from].length > 0,
            "Sender seems to have no tokens."
        );

        // put last element in place of the to-be-deleted, effectively removing it
        userOwnedTokens[from][userOwnedTokenIndexes[tokenId]] = userOwnedTokens[from][userOwnedTokens[from]
            .length - 1];
        // delete obsolete entry
        userOwnedTokens[from].pop();
        // delete index entry for token index
        delete userOwnedTokenIndexes[tokenId];
    }

    function addUserOwnedToken(address to, uint256 tokenId) private {
        userOwnedTokens[to].push(tokenId);
        // update index entry
        userOwnedTokenIndexes[tokenId] = userOwnedTokens[to].length - 1;
    }

    /* Transfer must update userOwnedTokens, so disable it for now */

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {

        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner"
        );
        removeUserOwnedToken(from, tokenId);
        addUserOwnedToken(to, tokenId);
        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        removeUserOwnedToken(from, tokenId);
        addUserOwnedToken(to, tokenId);
        _safeTransfer(from, to, tokenId, _data);
    }
}
