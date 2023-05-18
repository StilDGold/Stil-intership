import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [sellers, setTopSellers] = useState([]);
  const [items, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    const topSellers = axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    const newItems = axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );

    axios.all([topSellers, newItems]).then(
      axios.spread((...allData) => {
        const allDataSeller = allData[0].data;
        const allDataItems = allData[1].data;

        setTopSellers(allDataSeller);
        setNewItems(allDataItems);

        console.log(allDataSeller);
        console.log(allDataItems);
      })
    );
  }

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <SkeletonTheme>
      <Router>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<Home sellers={sellers} isLoading={isLoading} />}
          />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/author/:authorId"
            element={<Author sellers={sellers} items={items} />}
          />
          <Route path="/item-details" element={<ItemDetails />} />
        </Routes>
        <Footer />
      </Router>
    </SkeletonTheme>
  );
}

export default App;
