import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Countdown from "../UI/Countdown";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExploreItems = () => {
  // variable for Skeleton loading 
  const [isLoading, setIsLoading] = useState(true);

  //  Load more button
  const [visible, setVisible] = useState(8);

  const showMore = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  // here i make another fething
  const [data, setData] = useState([]);

  async function fetchExplore() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setData(data);
    console.log(data);
  }

  useEffect(() => {
    fetchExplore();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  async function filterNfts(filter) {
    setIsLoading(true);
    if (filter === "") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setData(data);
    }

    if (filter === "price_low_to_high") {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
      );
      setData(data);
    }

    if (filter === "price_high_to_low") {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low"
      );
      setData(data);
    }

    if (filter === "likes_high_to_low") {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low"
      );
      setData(data);
    }
    setIsLoading(false);
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterNfts(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {data.slice(0, visible).map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            {isLoading ? (
              <Skeleton circle width={50} height={50} />
            ) : (
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
            )}

            {isLoading ? null : <Countdown item={item} />}
            {isLoading ? (
              <Skeleton height={300} />
            ) : (
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
            )}
            {isLoading ? (
              <Skeleton />
            ) : (
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={showMore}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;