import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {

 

  return (
    <SkeletonTheme>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore  />} />
          <Route path="/author/:authorId" element={<Author />} />
          <Route path="/item-details/:nftId" element={<ItemDetails />} />
        </Routes>
        <Footer />
      </Router>
    </SkeletonTheme>
  );
}

export default App;
