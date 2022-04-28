import { useState, useEffect } from "react";
import PreviewListItem from "./PreviewListItem";
import "./PreviewList.scss";

export default ({ data }) => {
  return (
    <div className="preview-list">
      {data.map((token) => (
        <PreviewListItem key={token.id} token={token} />
      ))}
    </div>
  );
};
