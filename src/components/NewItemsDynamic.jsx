import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./dynamicstyle.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function NewItemsDynamic({ item, isLoading }) {
  let startTime = Date.now();
  let countdown = item.expiryDate - startTime;

  const [secondsText, setSecondsText] = useState(countdown);
  const [minutesText, setMinutesText] = useState(countdown);
  const [hoursText, setHoursText] = useState(countdown);

  function updateTime() {
    let startTime = Date.now();
    let countdown = item.expiryDate - startTime;

    if (countdown < 0) {
      countdown = "";
    }

    let secondsLeft = countdown / 1000;
    let minutesLeft = secondsLeft / 60;
    let hoursLeft = minutesLeft / 24;

    let secondsText = Math.floor(secondsLeft) % 60;
    let minutesText = Math.floor(minutesLeft) % 60;
    let hoursText = Math.floor(hoursLeft);

    if (secondsText.toString().length < 2) {
      secondsText = secondsText.toString().padStart(2, "0");
    }
    if (minutesText.toString().length < 2) {
      minutesText = minutesText.toString().padStart(2, "0");
    }
    if (hoursText.toString().length < 1) {
      hoursText = hoursText.toString().padStart(1, "0");
    }

    setSecondsText(secondsText);
    setMinutesText(minutesText);
    setHoursText(hoursText);
  }

  setInterval(updateTime, 1000);

  return (
    <div className="hot-collection">
      <div className="nft__item" key={item.nftId}>
        {isLoading ? (
          <Skeleton circle width={50} height={50} />
        ) : (
          <div className="author_list_pp">
            <Link
              to={`/author/${item.authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas"
            >
              <img className="lazy" src={item.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
        )}
        {isLoading ? (
          <Skeleton  />
        ) : (
          <div className="de_countdown">
            {hoursText}h<span> </span>
            {minutesText}m<span> </span>
            {secondsText}s
          </div>
        )}
        {isLoading ? (
          <Skeleton height={200} />
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
          <Skeleton height={30}/>
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
  );
}
