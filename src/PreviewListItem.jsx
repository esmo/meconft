import { useState, useEffect } from "react";

export default ({ token }) => {
  const [imageBlobURL, setImageBlobURL] = useState(null);

  useEffect(() => {
    async function loadImage() {
      fetch(
        new Request("https://ipfs.infura.io:5001/api/v0/cat?arg=" + token.uri, {
          method: "POST",
        })
      )
        .then((resp) => resp.blob())
        .then((blob) => {
          setImageBlobURL(URL.createObjectURL(blob));
          // event.target.src = ;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (imageBlobURL == null) loadImage();
  });

  return (
    <a
      className="preview-list-item"
      key={token.id}
      target="_blank"
      href={"https://ipfs.io/ipfs/" + token.uri}
    >
      <img className="list-preview" id="token_image" src={imageBlobURL} />
      <span>ID: {token.id}</span>
      <span>ID: {token.id}</span>
      <span>{token.uri}</span>
    </a>
  );
};
