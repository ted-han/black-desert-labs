import React from "react";
import { graphql } from "gatsby";

import SearchComponent from "../components/search";
import SearchResultComponent from "../components/search-result";

const IndexPage = ({ data, location }) => {
  const urlSearchParamsx = new URLSearchParams(location.search);
  const query = urlSearchParamsx.get("q");
  const filterData = data.allCraft.nodes.filter(
    (v) => v.item_name.includes(query) && query !== "",
  );

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
