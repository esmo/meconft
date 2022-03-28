import { useState, useEffect } from "react";

import "./App.scss";

import { BounceLoader } from "react-spinners";

import { Header } from "semantic-ui-react";

import NftForm from "./NftForm";

import PreviewListItem from "./PreviewListItem";
import "semantic-ui-css/semantic.min.css";

import ipfs from "./helpers/ipfs";
import getWeb3 from "./helpers/getWeb3";

import yaml from "js-yaml";

import getMecoNft from "./helpers/getMecoNft";

import ContractProxy from "./helpers/ContractProxy";

function App() {
  const [formData, setFormData] = useState({});
  const [contractProxy, setContractProxy] = useState(null);
  const [ownedTokens, setOwnedTokens] = useState([]);
  const [tokenURIs, setTokenURIs] = useState([]);
  const [ipfsHash, setIpfsHash] = useState("");
  const [transactionReceipt, setTransactionReceipt] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const imagesFromBlockchain = async (ownedTokens) => {
    return await Promise.all(
      ownedTokens.map(async (token) => {
        token.data = await ipfs.get(token.uri);
        return token;
      })
    );
  };

  const connectToBlockchain = async () => {
    const web3 = await getWeb3();
    let contract = await getMecoNft();
    let accounts = await web3.eth.getAccounts();
    let contractProxy = new ContractProxy(contract, accounts[0]);
    let ownedTokens = await contractProxy.tokenUrlsOfUser(
      contractProxy.account
    );

    let numberOfNFTs = await contractProxy.lastTokenId();
    console.log("numberOfNFTs", numberOfNFTs);
    // let tokenIds = [...Array(numberOfNFTs + 1).keys()]; // create array with number of token ids
    // tokenIds.shift(); // get rid of 0 entry, NFTs start at 1
    // console.log("tokenIds", tokenIds);
    // let tokenURIs = await contractProxy(tokenIds);

    setContractProxy(contractProxy);
    // setTokenURIs(tokenURIs);
    setOwnedTokens(ownedTokens);
  };

  const updateFormData = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const submitForm = async () => {
    // create zip file from formData

    setLoading(true);

    let metaData = {};

    // get hash for content file
    let ipfsContentHash = await ipfs.add(formData.image, { onlyHash: true });

    console.log("content hash", ipfsContentHash);

    metaData.CID = ipfsContentHash.path;
    metaData.fileType = formData.imageName.match(/\.([0-9A-Za-z])+$/i)[0].substring(1);
    metaData.creator = formData.creator;
    metaData.title = formData.title;
    metaData.description = formData.description;

    let metaDataYaml = yaml.dump(metaData);

    console.log("metadata", metaDataYaml);

    let ipfsHash = await ipfs.add(metaDataYaml, { onlyHash: true });

    console.log("metadata hash", ipfsHash);

    setLoading(false);

    // if (!contractProxy) connectToBlockchain();
    // if (formData.image) {
    //   const ipfsResponse = await ipfs.add(formData.image);
    //   setIpfsHash(ipfsResponse.path);
    //   try {
    //     const receipt = await contractProxy.mintNft(ipfsResponse.path);
    //     setTransactionReceipt(receipt);
    //   } catch (anything) {
    //     console.log(anything);
    //   }
    // } else {
    //   console.log("no image found");
    // }
  };

  useEffect(async () => {
    if (!contractProxy) {
      await connectToBlockchain();
    }
  });

  let accountInfo = contractProxy ? (
    <div>
      <div> Account: {contractProxy.account} </div>
    </div>
  ) : (
    ""
  );

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
        <header>
          <img src="logo.png" />
        </header>
        <div className="top-box">
          <header>
            <h2> Lade ein Bild oder 3 D - Objekt hoch </h2>
            <div>Derzeit werden die Formate PNG, JPG und GLTF unterstützt.</div>
          </header>
          <div className="form-container">
            <NftForm
              formData={formData}
              handleChange={updateFormData}
              handleSubmit={submitForm}
              setLoading={setLoading}
            />
          </div>
        </div>
        <div>
          <h3> meine NFTs </h3>
          <div>
            {(showAll && tokenURIs.length > 0) ||
            (!showAll && ownedTokens.length > 0) ? (
              (showAll ? tokenURIs : ownedTokens).map((token) => (
                <PreviewListItem key={token.id} token={token} />
              ))
            ) : (
              <div> Lade dein erstes NFT hoch, dann erscheint es hier. </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
