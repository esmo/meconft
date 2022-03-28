const MeCoNFT = artifacts.require("./MeCoNFT.sol");

module.exports = async function(deployer) {
  deployer.deploy(MeCoNFT);
};
