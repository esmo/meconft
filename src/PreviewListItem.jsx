import { useState, useEffect } from "react";

import yaml from "js-yaml";
import { Link } from "react-router-dom";
import Viewer from "./Viewer";

import "./PreviewListItem";

export default ({ token }) => {
  const [metamata, setMetaData] = useState({});
  const [fileName, setFileName] = useState("");
  const [blobURL, setBlobURL] = useState(null);

  useEffect(() => {
    let loadData = async () => {
      return fetch(
        new Request("https://ipfs.infura.io:5001/api/v0/cat?arg=" + token.uri, {
          method: "POST",
        })
      )
        .then(async (resp) => await resp.text())
        .then((data) => {
          let metadata = yaml.load(data);
          setMetaData(metadata);
          setFileName(metadata.CID + "." + metadata.fileType);
          return metadata;
        });
    };
    let loadBlob = async (blobUri) => {
      fetch(
        new Request("https://ipfs.infura.io:5001/api/v0/cat?arg=" + blobUri, {
          method: "POST",
        })
      )
        .then((resp) => resp.blob())
        .then((blob) => {
          setBlobURL(URL.createObjectURL(blob));
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    loadData().then((metadata) => {
      loadBlob(metadata.CID);
    });
  }, [token.uri]);

  return (
    <div className="preview-list-item" key={token.id}>
      <Link to={"/item/" + token.uri}>
        <Viewer src={blobURL} filename={fileName} width="192" height="192" />
        <div>{metamata.title}</div>
        {/*<a target="_blank" href={"https://ipfs.io/ipfs/" + token.uri}>
        {token.uri}
      </a>*/}
      </Link>
    </div>
  );
};
