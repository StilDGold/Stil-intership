import React, { Component } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../dynamicstyle.css";
import Slider from "react-slick";
import HotCollectionsDynamic from "../../DynamicComponents/HotCollectionsDynamic";

const HotCollections = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
    <section id="section-collections" className="no-bottom">
      <div className="container ">
        <div className="row ">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {elems.map((elem) => (
              <HotCollectionsDynamic elem={elem} isLoading={isLoading}/>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
