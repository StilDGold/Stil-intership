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

function App() {
  const [nfts, setExplore] = useState([]);

  async function fetchData() {
    const exploreItems = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );

    axios.all([exploreItems]).then(
      axios.spread((...allData) => {
        const allDataExplore = allData[0].data;

        setExplore(allDataExplore);

      })
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/explore"
          element={<Explore nfts={nfts}  />}
        />
        <Route path="/author/:authorId" element={<Author nfts={nfts} />} />
        <Route
          path="/item-details/:nftId"
          element={<ItemDetails nfts={nfts} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
