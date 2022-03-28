import {create} from "ipfs-http-client";

const projectId = "24Bgonpoc1bKP4R6rTI0atzuuZx";
const projectSecret = "ca86e098058f1692489c36320150d187";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
export default ipfs;
