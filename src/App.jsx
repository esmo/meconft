import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {AppContextProvider} from "./AppContext";

import Layout from "./Layout";
import Home from "./Home";
import Detail from "./Detail";
import Contact from "./Contact";

function App() {

  return (
    <AppContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="item/:tokenUri" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
