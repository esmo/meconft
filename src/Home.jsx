import { useState, useEffect, useContext } from "react";

import { BounceLoader } from "react-spinners";

import { Header } from "semantic-ui-react";
import ipfs from "./helpers/ipfs";

import yaml from "js-yaml";
import { AppContext } from "./AppContext";

import NftForm from "./NftForm";

import PreviewList from "./PreviewList";
import PreviewListItem from "./PreviewListItem";
import "semantic-ui-css/semantic.min.css";

function Home() {
  const [contractProxy, ownedTokens, allTokenUris] = useContext(AppContext);

  const [formData, setFormData] = useState({});
  const [transactionReceipt, setTransactionReceipt] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [haveTokens, setHaveTokens] = useState(false);

  const updateFormData = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const submitForm = async () => {
    // create zip file from formData

    setLoading(true);

    // if (!contractProxy) connectToBlockchain();
    if (
      formData.image &&
      formData.creator &&
      formData.title &&
      formData.description
    ) {
      let metaData = {};

      // get hash for content file
      // let ipfsContentHash = await ipfs.add(formData.image, { onlyHash: true });
      let ipfsContentHash = await ipfs.add(formData.image);

      metaData.CID = ipfsContentHash.path;
      metaData.fileType = formData.imageName
        .match(/\.([0-9A-Za-z])+$/i)[0]
        .substring(1);
      metaData.creator = formData.creator;
      metaData.title = formData.title;
      metaData.description = formData.description;

      let metaDataYaml = yaml.dump(metaData);

      // let ipfsResponse = await ipfs.add(metaDataYaml, { onlyHash: true });
      let ipfsResponse = await ipfs.add(metaDataYaml);

      try {
        const receipt = await contractProxy.mintNft(ipfsResponse.path);
        setTransactionReceipt(receipt);
      } catch (anything) {
        alert("Something unexpected happened. See console log for details.");
        setLoading(false);
        console.log(anything);
      }
      setLoading(false);
    } else {
      alert("please upload a file and fill in the form.");
    }
  };

  let accountInfo = contractProxy ? (
    <div>
      <div> Account: {contractProxy.account} </div>
    </div>
  ) : (
    ""
  );

  return (
    <div className="main">

      {loading ? (
        <div className="spinner">
          <BounceLoader color={"#6CEC7D"} loading={loading} />
        </div>
      ) : (
        ""
      )}
      <div className="top-box">
        <header>
          <h2>
            Create your individual non - fungible token with our new nftMAKER.
          </h2>
          <div>
            <ul>
              <li> We created our own smart contract based on ERC721. </li>
              <li> We use Polygon for low gas fee. </li>
              <li>

                Every NFT is unique and saved on the Ethereum sidechain.
              </li>
              <li> Upload any file type. </li>
              <li> Save and protect whole concepts as NFT. </li>
            </ul>
          </div>
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
      <div className="bottom-box">
        <h3> Our Collection </h3>
        <nav>
          <ul>
            <li>
              <a
                className={showAll ? "active" : ""}
                onClick={() => {
                  setShowAll(true);
                }}
              >
                all
              </a>
            </li>
            <li>
              <a
                className={showAll ? "" : "active"}
                onClick={() => {
                  setShowAll(false);
                }}
              >
                my items
              </a>
            </li>
          </ul>
        </nav>
        <div>

          {(showAll && allTokenUris.length > 0) ||
          (!showAll && ownedTokens.length > 0) ? (
            <PreviewList data={showAll ? allTokenUris : ownedTokens} />
          ) : (
            <div> Lade dein erstes NFT hoch, dann erscheint es hier. </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
