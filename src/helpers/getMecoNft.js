import getWeb3 from "./getWeb3";

import MeCoNft from "../contracts/MeCoNft.json";

async function getMecoNft() {
  // ethereum
  // const address = "0x958dd4B9A7aA2E5b5D38d023FD8DBE71BDc0B322";
  // polygon
  // const address = "0x43d0216c08607a9f922c5a834444f4d9f9766d9a";
  const address = "0xd32483aa7328c0e892523977c07458aadd5140c9";
  const web3 = await getWeb3();
  return new web3.eth.Contract(MeCoNft.abi, address);
}
export default getMecoNft;
