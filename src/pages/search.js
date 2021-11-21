import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
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
      <Seo
        title={`검색결과:${query} - 검은사막 연구소. 검은사막 검색 ${query}`}
        description={`검색결과:${query} - 검은사막 연구소. 검은사막 검색 ${query}`}
        keywords={`검은사막 ${query}, 검은사막 생활, 검은사막 요리`}
      />
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
