import React from "react";
import { Link } from "gatsby";
import {
  searchReulstList,
  searchReulstListName,
} from "./searchresult.module.css";

const SearchResultComponent = ({ query, data = [] }) => {
  if (data.length === 0) {
    return (
      <div id={searchReulstList}>
        <h3>검색어: {query}</h3>
      </div>
    );
  }

  return (
    <div id={searchReulstList}>
      <h3>검색어: {query}</h3>
      <h3 id={searchReulstListName}>검색결과</h3>
      <ul>
        {data.map((v) => (
          <li key={v.id}>
            <img alt={`${v.item_id}`} src={`/${v.item_id}.png`} width="30" />
            <Link to={`/${v.item_name.replace(/ /gi, "-")}`}>
              {v.item_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultComponent;
