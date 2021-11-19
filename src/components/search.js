import React, { useState } from "react";
import { Link, graphql, StaticQuery, navigate } from "gatsby";

import {
  searchLogo,
  searchWrapper,
  searchInput,
  searchButton,
  searchList,
  searchInputWrapper,
} from "./search.module.css";

const SearchComponent = ({ data, page }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const itemArr = data.allCraft.nodes || [];

  const handleClickSearch = () => {
    navigate(`/search?q=${value}`);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${value}`);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  const handleInputFocus = () => {
    setVisible(true);
  };

  const renderSearchResults = () => {
    //자동완성 x개까지만 제한
    const itemFilter = itemArr.filter(
      (v) => v.item_name.includes(value) && value !== "",
    );

    if (itemFilter.length === 0) {
      return null;
    }

    return (
      <ul>
        {itemFilter.map(({ id, item_name }) => {
          return (
            <li key={id}>
              <Link to={`/${item_name.replace(/ /gi, "-")}`}>{item_name}</Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <div id={searchWrapper}>
        <div id={searchLogo}></div>
        <div id={searchInputWrapper}>
          <input
            id={searchInput}
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            maxLength="16"
            autoFocus
          />
        </div>
        <div id={searchButton} onClick={handleClickSearch}>
          <span>&#128269;</span>
        </div>
      </div>
      <div id={searchList}>{visible && renderSearchResults()}</div>
    </div>
  );
};

export default ({ page }) => (
  <StaticQuery
    query={graphql`
      {
        allCraft {
          nodes {
            id
            item_name
          }
        }
      }
    `}
    render={(data) => <SearchComponent data={data} page={page} />}
  />
);
