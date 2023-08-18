import yaml from "js-yaml";

// const projectId = "24Bgonpoc1bKP4R6rTI0atzuuZx";
// const projectSecret = "ca86e098058f1692489c36320150d187";

const credentials = btoa(process.env.REACT_APP_INFURA_PROJECT_ID + ":" + process.env.REACT_APP_INFURA_PROJECT_SECRET);

let loadData = async (tokenUri) => {
    return await fetch(
      new Request("https://ipfs.infura.io:5001/api/v0/cat?arg=" + tokenUri, {
          method: "POST",
          headers: {
            "Authorization": "Basic " + credentials
        }
      })
  )
  .then(async (resp) => await resp.text())
  .then((data) => {
    let metadata = yaml.load(data);
    // console.log("metadata", metadata);

    // setMetaData(metadata);
    // setFileName(metadata.CID + "." + metadata.fileType);
    return metadata;
  });
};

let loadBlob = async (blobUri) => {
    return await fetch(
      new Request("https://ipfs.infura.io:5001/api/v0/cat?arg=" + blobUri, {
          method: "POST",
          headers: {
            "Authorization": "Basic " + credentials
        }
      })
  )
  .then((resp) => resp.blob())
  .then((blob) => {
    return URL.createObjectURL(blob);
  })
  .catch(function(error) {
    console.log(error);
  });
};

export default async (tokenUri) => {
  return await loadData(tokenUri).then(async (metadata) => {
    let blob = await loadBlob(metadata.CID);
    return {
      metadata: metadata,
      blob: blob
    };
  });
};
