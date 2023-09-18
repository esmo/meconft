import getWeb3 from "./getWeb3";

import MeCoNft from "../contracts/MeCoNft.json";

async function getMecoNft() {
  // ethereum
  // const address = "0x958dd4B9A7aA2E5b5D38d023FD8DBE71BDc0B322";
  // polygon mumbay 1
  // const address = "0x43d0216c08607a9f922c5a834444f4d9f9766d9a";
// mumbay 2
  // const address = "0xC1A1dEc68d2550EDCB5C2869EDc4e153361599E3";
// polygon mainnet
  const address = "0x44138EAD4aA0D796661CBFDEBE4D592b1Cc17e47";

  const web3 = await getWeb3();
  return new web3.eth.Contract(MeCoNft.abi, address);
}
export default getMecoNft;
