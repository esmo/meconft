export default function ContractProxy(contract, account) {
  this.contract = contract;
  this.account = account;

  this.mintNft = async (nftHash) => {
    return await this.contract.methods.mintNft(nftHash).send({
      from: this.account,
    });
  };

  this.lastTokenId = async () => {
    return await this.contract.methods.lastTokenId().call({
      from: this.account,
    });
  };

  this.tokenURI = async (tokenId) => {
    return await this.contract.methods.tokenURI(tokenId).call({
      from: this.account,
    });
  };

  this.tokenUrls = async (accountAddress) => {
    let tokenIds = await this.tokenIds();
    return await this.tokenUrisFromTokenIds(tokenIds);
  };

  this.tokensOfUser = async (accountAddress) => {
    return await this.contract.methods.tokensOfUser(accountAddress).call({
      from: this.account,
    });
  };

  this.tokenUrlsOfUser = async (accountAddress) => {
    let tokenIds = await this.tokensOfUser(accountAddress);
    return await this.tokenUrisFromTokenIds(tokenIds);
  };

  this.tokenUrisFromTokenIds = async (tokenIds) => {
    return await Promise.all(
      await tokenIds.map(async (tokenId) => {
        let tokenURI = await this.contract.methods.tokenURI(tokenId).call({
          from: this.account,
        });
        return {
          id: tokenId,
          uri: tokenURI,
        };
      })
    );
  };

  this.allTokenUris = async () => {
    let lastTokenId = await this.lastTokenId();
    let tokenIds = [];
    for (let i = 1; i <= lastTokenId; i++) {
      tokenIds.push(i);
    }
    return await Promise.all(
      await tokenIds.map(async (tokenId) => {
        let tokenURI = await this.contract.methods.tokenURI(tokenId).call({
          from: this.account,
        });
        return {
          id: tokenId,
          uri: tokenURI,
        };
      })
    );
  };

  this.userOwnedTokens = async () => {
    return await this.contract.methods.userOwnedTokens().call({
      from: this.account,
    });
  };
}
