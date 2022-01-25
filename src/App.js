import {useState, useEffect} from "react";

import "./App.css";

import {BounceLoader} from "react-spinners";

import {Header} from "semantic-ui-react";

import NftForm from "./NftForm";
import "semantic-ui-css/semantic.min.css";

import ipfs from "./helpers/ipfs";
import getWeb3 from "./helpers/getWeb3";

import getMecoNft from "./helpers/getMecoNft";

function App() {
  const [formData, setFormData] = useState({});
  const [account, setAccount] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [transactionReceipt, setTransactionReceipt] = useState({});
  const [loading, setLoading] = useState(false);
  // const initWeb3 = async () => {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //     return true;
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //     return true;
  //   } else {
  //     window.alert(
  //       "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //     );
  //     return false;
  //   }
  // };

  const connectToBlockchain = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const updateFormData = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const submitForm = async () => {
    console.log("SUBMITTING FORM!");
    setLoading(true);
    if (formData.image) {
      const ipfsResponse = await ipfs.add(formData.image);
      console.log("ipfsResponse", ipfsResponse);
      setIpfsHash(ipfsResponse.path);
      try {
        const contract = await getMecoNft();
        // const nftContract = await MecoNftFactory();
        const receipt = await contract.methods
          .mintNft(account, ipfsResponse.path)
          .send({
            from: account,
          });
        console.log("receipt as returned by smart contract:", receipt);
        setTransactionReceipt(receipt);
      } catch (anything) {
        console.log(anything);
      }
    } else {
      console.log("no image found");
    }

    setLoading(false);
  };

  useEffect(async () => {
    // await initWeb3();
    // await connectToBlockchain();
    // initIpfsClient();
  });

  return (
    <>
      {loading ? (
        <div className="spinner">
          <BounceLoader color={"#6CEC7D"} loading={loading} />
        </div>
      ) : (
        ""
      )}
      <div className="app">
        <h2>Account</h2>
        <h2>
          {account || (
            <button
              onClick={async () => {
                // await initWeb3();
                await connectToBlockchain();
              }}
            >
              Verbinden
            </button>
          )}
        </h2>
        <h1>Ein neues NFT erstellen</h1>
        <NftForm
          formData={formData}
          handleChange={updateFormData}
          handleSubmit={submitForm}
          setLoading={setLoading}
        />
        <div>
          <div>IPFS hash: {ipfsHash}</div>
          <div>Transaction receipt: {JSON.stringify(transactionReceipt)}</div>
        </div>
      </div>
    </>
  );
}

export default App;
