import React from 'react'
import Skeleton from '../components/UI/Skeleton'
import { Link } from 'react-router-dom'

export default function HotCollectionsDynamic({elem, isLoading}) {
  return (
    <div className="hot-collection" key={elem.id}>
    <div className="nft_coll">
      <div className="nft_wrap">
        {isLoading ? (
          <Skeleton  />
        ) : (
          <Link to={`/item-details/${elem.id}`}>
            <img
              src={elem.nftImage}
              className="lazy img-fluid"
              alt={elem.authorId}
            />
          </Link>
        )}
      </div>
      <div className="nft_coll_pp">
        {isLoading ? (
          <Skeleton circle={true} height={50} width={50} />
        ) : (
          <Link to="/author">
            <img
              className="lazy pp-coll"
              src={elem.authorImage}
              alt=""
            />
          </Link>
        )}
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info">
        <Link to="/explore">
          <h4>{elem.title}</h4>
        </Link>
        <span>{elem.code}</span>
      </div>
    </div>
  </div>
  )
}
