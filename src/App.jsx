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
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  async function fetchItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <SkeletonTheme>
      <Router>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<Home isLoading={isLoading} items={items} />}
          />
          <Route path="/explore" element={<Explore />} />
          <Route path="/author/:authorId" element={<Author isLoading={isLoading} items={items} />} />
          <Route
            path="/item-details/:nftId"
            element={<ItemDetails items={items} isLoading={isLoading} />}
          />
        </Routes>
        <Footer />
      </Router>
    </SkeletonTheme>
  );
}

export default App;
