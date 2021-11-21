import React from "react";
import { navigate } from "gatsby";
import {
  searchReulstList,
  searchReulstListName,
} from "./searchresult.module.css";

const SearchResultComponent = ({ query, data = [] }) => {
  const handleClick = (item_name) => {
    navigate(`/${item_name.replace(/ /gi, "-")}`);
  };

  if (data.length === 0) {
    return (
      <div id={searchReulstList}>
        <h3>검색어: {query}</h3>
      </div>
    );
  }

  return (
    <div id={searchReulstList}>
      <h3 id={searchReulstListName}>검색어: {query}</h3>
      <ul>
        {data.map((v) => (
          <li key={v.id} onClick={() => handleClick(v.item_name)}>
            <img alt={`${v.item_id}`} src={`/${v.item_id}.png`} width="30px" />
            <span>{v.item_name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultComponent;
