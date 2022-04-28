import { useContext } from "react";
import { useParams } from "react-router-dom";

// import Viewer from "./Viewer";
import DetailView from "./DetailView";

// import { AppContext } from "./AppContext";

export default () => {
  // const [contractProxy, ownedTokens] = useContext(AppContext);

  let params = useParams();

  return <DetailView token={{ uri: params.tokenUri }} />;
};
