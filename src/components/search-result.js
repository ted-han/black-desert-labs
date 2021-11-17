import React, { useState } from "react";
import { Link, graphql, StaticQuery, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  searchLogo,
  searchWrapper,
  searchInput,
  searchButton,
  searchReulstList,
  searchInputWrapper,
  searchReulstListName,
} from "./searchresult.module.css";

const SearchResultComponent = ({ query, data = [] }) => {
  console.log(query);
  console.log(data);

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
        <li>
          <StaticImage
            alt="9059"
            src="../images/9059.png"
            width={30}
            height={30}
          />
          <Link to="/옥수수">옥수수</Link>
        </li>
        <li>
          <StaticImage
            alt="9059"
            src="../images/9059.png"
            width={30}
            height={30}
          />
          <Link to="/옥수수">사과</Link>
        </li>
        <li>
          <StaticImage
            alt="9059"
            src="../images/9059.png"
            width={30}
            height={30}
          />
          <Link to="/식초">식초</Link>
        </li>

        {data.map((v) => (
          <li key={v.id}>
            <StaticImage
              alt="9059"
              src="../images/9059.png"
              width={30}
              height={30}
            />
            <Link to={v.item_name.replace(/ /gi, "-")}>{v.item_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultComponent;
