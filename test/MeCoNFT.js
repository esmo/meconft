const MeCoNFT = artifacts.require("MeCoNFT");

contract("MeCoNFT test", async (accounts) => {
  it("should mint an an NFT with hash", async () => {
    const nftHash = "QmPHdg8cyMgdQcsiep2R1j4itZa5iybLm6PBEKo5gV3mwX";
    const instance = await MeCoNFT.deployed();
    const tokenIdBefore = await instance.tokenIdsByURIs(nftHash);
    console.log("token before", tokenIdBefore.words[0]);
    assert.equal(
      tokenIdBefore.words[0],
      0,
      "Token ID should be 0 before minting."
    );
    const mintedNFT = await instance.mintNft(accounts[0], nftHash);
    const tokenIdAfter = await instance.tokenIdsByURIs(nftHash);
    console.log("token before", tokenIdAfter.words[0]);

    assert.notEqual(
      tokenIdAfter.words[0],
      0,
      "Token ID should not be 0 after minting."
    );
  });
});
