import React, {useState} from "react";
import placeholder from "./placeholder.jpg";
import "./ImagePreview.css";

import captureFile from "./helpers/captureFile";

import {
  OBJModel,
  GLTFModel,
  AmbientLight,
  DirectionLight,
} from "react-3d-viewer";

const ImgPrev = ({setImage, setLoading}) => {
  const [{alt, src}, setState] = useState({
    src: placeholder,
    alt: placeholder,
  });

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const handleImg = (e) => {
    setLoading(true);
    console.log("setLoading(true) ");
    let src = URL.createObjectURL(e.target.files[0]);
    if (e.target.files[0]) {
      setState({
        src: src,
        alt: e.target.files[0].name,
      });

      captureFile(e, (buffer) => {
        console.log("storing file buffer");
        setImage(buffer);
        console.log("setLoading(false) ");
        setLoading(false);
      });
    }
  };

  const getViewer = (src, alt) => {
    let filetype = alt.match(/\.[0-9A-Za-z]+$/i);
    if (Array.isArray(filetype)) filetype = filetype[0];
    if (filetype == null) return <div>Der Dateityp wurde nicht erkannt.</div>;

    switch (filetype) {
      case ".jpg":
      case ".JPG":
      case ".jpeg":
      case ".png":
        return <img src={src} alt={alt} />;
        break;
      case ".obj":
        return (
          <OBJModel
            width="480"
            height="500"
            position={{x: 0, y: -100, z: 0}}
            src={src}
            onLoad={() => {
              console.log("loading...");
              //...
            }}
            onProgress={(xhr) => {
              console.log("progress...");
              //...
            }}
            onError={(xhr) => {
              console.log("error...");
              //...
            }}
          />
        );
        break;
      case ".gltf":
        return <GLTFModel width="480" height="480" src={src}></GLTFModel>;
        break;
      default:
        return <div>Der Dateityp {filetype} wird nicht unterstützt.</div>;
    }
  };

  return (
    <div className="form__img-input-container">
      <input
        type="file"
        accept=".png, .jpg, .JPG, .jpeg, .gltf"
        id="photo"
        className="visually-hidden"
        onChange={handleImg}
      />
      <label htmlFor="photo" className="form-img__file-label">
        <div>Hochladen</div>
      </label>
      <div className="form-img__img-preview">{getViewer(src, alt)}</div>
    </div>
  );
};

export default ImgPrev;
