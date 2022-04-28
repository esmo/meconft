import { createContext, useState, useEffect } from "react";

import ipfs from "./helpers/ipfs";
import getWeb3 from "./helpers/getWeb3";

import yaml from "js-yaml";

import getMecoNft from "./helpers/getMecoNft";

import ContractProxy from "./helpers/ContractProxy";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [contractProxy, setContractProxy] = useState(null);
  const [ownedTokens, setOwnedTokens] = useState([]);
  const [allTokenUris, setAllTokenUris] = useState([]);

  const connectToBlockchain = async () => {
    const web3 = await getWeb3();
    let contract = await getMecoNft();
    let accounts = await web3.eth.getAccounts();
    let contractProxy = new ContractProxy(contract, accounts[0]);
    let ownedTokens = await contractProxy.tokenUrlsOfUser(
      contractProxy.account
    );
    let allTokenUris = await contractProxy.allTokenUris();

    setContractProxy(contractProxy);
    setOwnedTokens(ownedTokens);
    setAllTokenUris(allTokenUris);
  };

  useEffect(async () => {
    if (!contractProxy) {
      await connectToBlockchain();
    }
  });

  return (
    <AppContext.Provider value={[contractProxy, ownedTokens, allTokenUris]}>
      {children}
    </AppContext.Provider>
  );
};
