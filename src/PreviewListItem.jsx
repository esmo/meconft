import { useState, useEffect } from "react";

import yaml from "js-yaml";
import { Link } from "react-router-dom";
import Viewer from "./Viewer";

import loadNft from "./helpers/loadNft";

import { BounceLoader } from "react-spinners";

import "./PreviewListItem";

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

  // useEffect(() => {
  //   let loadData = async () => {
  //     return fetch(
  //       new Request("https://ipfs.infura.io:5001/api/v0/cat?arg=" + token.uri, {
  //         method: "POST",
  //       })
  //     )
  //       .then(async (resp) => await resp.text())
  //       .then((data) => {
  //         console.log("HAVE METADATA: ", data);
  //         let metadata = yaml.load(data);
  //         console.log("HAVE METADATA: ", metadata);
  //         setMetaData(metadata);
  //         setFileName(metadata.CID + "." + metadata.fileType);
  //         return metadata;
  //       })
  //       .catch((error) => {
  //         console.log("REQUEST FAILED for: " + token.uri);
  //         setMetaData({
  //           title: "An error occured. Please try again later."
  //         });
  //         setFileName("error");
  //       });
  //   };
  //   let loadBlob = async (blobUri) => {
  //     fetch(
  //       new Request("https://ipfs.infura.io:5001/api/v0/cat?arg=" + blobUri, {
  //         method: "POST",
  //       })
  //     )
  //       .then((resp) => resp.blob())
  //       .then((blob) => {
  //         setBlobURL(URL.createObjectURL(blob));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };
  //   loadData().then((metadata) => {
  //     loadBlob(metadata.CID);
  //   });
  // }, [token.uri]);

  return loading ? (
    <BounceLoader />
  ) : (
    <div className="preview-list-item" key={token.id}>
      <Link to={"/item/" + token.uri}>
        <Viewer
          src={nftBlob}
          filename={nftMetadata.CID + "." + nftMetadata.fileType}
          width="192"
          height="192"
        />
        <div>{nftMetadata.title}</div>
        {/*<a target="_blank" href={"https://ipfs.io/ipfs/" + token.uri}>
        {token.uri}
      </a>*/}
      </Link>
    </div>
  );
};
