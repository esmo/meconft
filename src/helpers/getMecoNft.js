import getWeb3 from "./getWeb3";

import MeCoNFT from "../contracts/MeCoNFT.json";

async function getMecoNft() {
  const address = "0xd2e8d9173584d4daa5c8354a79ef75cec2dfa228";

  const web3 = await getWeb3();
  return new web3.eth.Contract(MeCoNFT.abi, address);
}
export default getMecoNft;
