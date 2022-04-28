import { useState, useEffect } from "react";

import loadNft from "./helpers/loadNft";

import yaml from "js-yaml";
import { Link } from "react-router-dom";
import Viewer from "./Viewer";

import { BounceLoader } from "react-spinners";

import "./DetailView.scss";

export default ({ token }) => {
  const [nftBlob, setNftBlob] = useState("");
  const [nftMetadata, setNftMetadata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData();
  }, []);

  let setData = async () => {
    let nftData = await loadNft(token.uri);
    setNftBlob(nftData.blob);
    setNftMetadata(nftData.metadata);
    setLoading(false);
  };

  return loading ? (
    <BounceLoader />
  ) : (
    <div className="detail-view">
      <Viewer
        src={nftBlob}
        filename={nftMetadata.CID + "." + nftMetadata.fileType}
        width="256"
        height="256"
      />
      <div className="metadata">
        <h1>{nftMetadata.title}</h1>
        <div>
          by <span className="creator">{nftMetadata.creator}</span>
        </div>
        <div>{nftMetadata.description}</div>
        <div>
          {/*<a href={"https://ipfs.io/ipfs/"+nftMetadata.CID} target="_blank">download file</a>*/}
        </div>
      </div>
    </div>
  );
};
