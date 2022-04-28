import React, { useState } from "react";
import placeholder from "./placeholder.jpg";

import Viewer from "./Viewer";

import "./ImagePreview.scss";

import captureFile from "./helpers/captureFile";

const ImgPrev = ({ setImage, setLoading }) => {
  const [{ alt, src }, setState] = useState({
    src: placeholder,
    alt: placeholder,
  });

  const handleImg = (e) => {
    setLoading(true);
    let src = URL.createObjectURL(e.target.files[0]);
    if (e.target.files[0]) {
      setState({
        uploadedFile: e.target.files[0],
        src: src,
        alt: e.target.files[0].name,
      });

      captureFile(e, (buffer) => {
        setImage(e.target.files[0].name, buffer);
        setLoading(false);
      });
    }
  };

  return (
    <div className="form__img-input-container">
      <input
        type="file"
        id="photo"
        className="visually-hidden"
        onChange={handleImg}
      />
      <label htmlFor="photo" className="form-img__file-label">
        <div>click to upload</div>
      </label>
      <div className="form-img__img-preview">
        <Viewer src={src} filename={alt} width="340" height="340" />
      </div>
    </div>
  );
};

export default ImgPrev;
