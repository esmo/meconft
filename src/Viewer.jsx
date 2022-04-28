import React, { useState } from "react";
import "./Viewer.scss";

import {
  OBJModel,
  GLTFModel,
  AmbientLight,
  DirectionLight,
} from "react-3d-viewer";

import FileViewer from "react-file-viewer";

export default ({ src, filename, width, height }) => {
  width = width || 392;
  height = height || 392;
  let fileSuffix = filename.match(/\.[0-9A-Za-z]+$/i);
  if (Array.isArray(fileSuffix)) fileSuffix = fileSuffix[0];
  let filetype = fileSuffix !== null ? fileSuffix.substring(1) : null;
  let canvas;
  switch (filetype) {
    case null:
      return null;
      break;
    case "jpg":
    case "JPG":
    case "jpeg":
    case "png":
      canvas = (
        <img
          style={{ width: width + "px", height: height + "px" }}
          src={src}
          alt={filename}
        />
      );
      break;
    case "pdf":
    case "csv":
    case "xslx":
    case "docx":
    case "mp4":
    case "webm":
    case "mp3":
      canvas = <FileViewer fileType={filetype} filePath={src} />;
      break;
    case "obj":
      canvas = (
        <OBJModel
          width={width}
          height={height}
          position={{ x: 0, y: -100, z: 0 }}
          src={src}
        />
      );
      break;
    case "gltf":
    case "glb":
      canvas = <GLTFModel width={width} height={height} src={src}></GLTFModel>;
      break;
    default:
      canvas = (
        <div className="no-preview">
          <h1>{filetype.toUpperCase()}</h1>
        </div>
      );
  }

  return <div className="viewer-item">{canvas}</div>;
};
