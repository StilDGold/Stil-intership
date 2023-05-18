import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopSellers = ({ sellers, isLoading }) => {
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {sellers.map((seller) => {
                return (
                  <li key={seller.id}>
                    {isLoading ? (
                      <Skeleton circle width={50} height={50} />
                    ) : (
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${seller.authorId}`}
                          onClick={() => {
                            window.scroll(0, 0);
                          }}
                        >
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                    )}
                    {isLoading ? (
                      <Skeleton count={2} />
                    ) : (
                      <div className="author_list_info">
                        <Link
                          to={`/author/${seller.authorId}`}
                          onClick={() => {
                            window.scroll(0, 0);
                          }}
                        >
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
