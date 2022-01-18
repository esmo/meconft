import {useState, useEffect} from "react";

import Web3 from "web3";

import "./App.css";

import {BounceLoader} from "react-spinners";

import {Header} from "semantic-ui-react";

import NftForm from "./NftForm";
import "semantic-ui-css/semantic.min.css";

import ipfs from "./helpers/ipfs";

import MecoNftFactory from "./contracts/MecoNftFactory";

function App() {
  const [formData, setFormData] = useState({});
  const [account, setAccount] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [transactionReceipt, setTransactionReceipt] = useState("");
  const [loading, setLoading] = useState(false);
  const initWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      return true;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      return true;
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return false;
    }
  };

  const connectToBlockchain = async () => {
    const accounts = await window.web3.eth.getAccounts();
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
      const ipfsHash = await ipfs.add(formData.image);
      console.log("ipfsHash", ipfsHash);
      setIpfsHash(ipfsHash.path);
    } else {
      console.log("no image found");
    }

    const nftContract = await MecoNftFactory();
    const receipt = await nftContract.methods
      .mint(account, ipfsHash.path)
      .call(function (err, res) {
        if (!err) {
          console.log(res);
        } else {
          console.log(err);
        }
      });
    console.log("receipt as returned by smart contract:", receipt);
    setTransactionReceipt(receipt);
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
                await initWeb3();
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
          <div>Transaction receipt: {transactionReceipt}</div>
        </div>
      </div>
    </>
  );
}

export default App;
