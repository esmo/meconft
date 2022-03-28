/* taken from */

/** @dev Take file input from user */
const captureFile = (event, callback) => {
  event.stopPropagation(); // stop react bubbling up click event
  event.preventDefault(); // stop react refreshing the browser
  let file = event.target.files[0];
  let reader = new window.FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => convertToBuffer(reader, callback);
};

/** @dev Convert the file to buffer to store on IPFS */
const convertToBuffer = async (reader, callback) => {
  //file is converted to a buffer for upload to IPFS
  const buffer = await Buffer.from(reader.result);
  //set this buffer as state variable, using React hook function
  callback(buffer);
};

export default captureFile;
