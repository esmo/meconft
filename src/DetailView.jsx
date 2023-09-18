import { useState, useEffect } from "react";

import loadNft from "./helpers/loadNft";
//
// import yaml from "js-yaml";
// import { Link } from "react-router-dom";
import Viewer from "./Viewer";

// import fileDownload from "js-file-download";

import { BounceLoader } from "react-spinners";

import "./DetailView.scss";

export default ({ token }) => {
  const [nftBlob, setNftBlob] = useState("");
  const [nftMetadata, setNftMetadata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function setData(){
      let nftData = await loadNft(token.uri);
      if(!ignore) {
        setNftBlob(nftData.blob);
        setNftMetadata(nftData.metadata);
        setLoading(false);
      }
    }

    let ignore = false;
    setData();
    return () => {
      ignore = true;
    }
  }, []);


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
          {/*
          <a
            href={nftBlob}
            target="_blank"
            download={nftMetadata.CID + "." + nftMetadata.fileType}
          >
            Download
          </a>
          */}
        </div>
      </div>
    </div>
  );
};
