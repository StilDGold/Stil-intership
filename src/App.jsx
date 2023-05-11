import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {

  const [elems, setElem] = useState([]);
  const [isLoading, setIsLoading ] = useState(true)

  async function fetchElem() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setElem(data);
    setIsLoading(false)
  }
  useEffect(() => {
    fetchElem();
  }, []);
  
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home elems={elems} />} />
        <Route path="/explore/" element={<Explore />} />
        <Route path="/author/" element={<Author />} />
        <Route path="/item-details/:id" element={<ItemDetails elems={elems} isLoading={isLoading}/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
