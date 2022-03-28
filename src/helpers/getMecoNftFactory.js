import getWeb3 from "./getWeb3";

import MecoNftFactory from "../contracts/MecoNftFactory.json";

async function getMecoNftFactory() {
  const address = "0x17bbfb791c99f219c03Eb64422930c51e33FFbE8";

  const web3 = await getWeb3();
  return new web3.eth.Contract(MecoNftFactory.abi, address);
}
export default getMecoNftFactory;
