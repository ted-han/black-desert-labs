import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";

import SearchComponent from "../components/search";
import SearchResultComponent from "../components/search-result";

const IndexPage = ({ data }) => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const filterData = data.allCraft.nodes.filter(
    (v) => v.item_name.includes(query) && query !== "",
  );

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const param = urlSearchParams.get("q");
    setQuery(param);
    return;
  }, [search]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const param = urlSearchParams.get("q");
    setSearch(param);
    return;
  }, []);

  return (
    <main>
      <title>검은사막</title>
      <SearchComponent page="search" />
      <SearchResultComponent query={query} data={filterData} />
    </main>
  );
};

export const query = graphql`
  {
    allCraft {
      nodes {
        id
        item_id
        item_name
      }
    }
  }
`;

export default IndexPage;
