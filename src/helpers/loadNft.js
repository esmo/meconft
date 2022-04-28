import yaml from "js-yaml";

let loadData = async (tokenUri) => {
  return await fetch(
    new Request("https://ipfs.infura.io:5001/api/v0/cat?arg=" + tokenUri, {
      method: "POST",
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
    })
  )
    .then((resp) => resp.blob())
    .then((blob) => {
      return URL.createObjectURL(blob);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default async (tokenUri) => {
  return await loadData(tokenUri).then(async (metadata) => {
    let blob = await loadBlob(metadata.CID);
    return { metadata: metadata, blob: blob };
  });
};
