import React from "react";
import Seo from "../components/seo";
import SearchComponent from "../components/search";

const IndexPage = () => {
  return (
    <main>
      <Seo
        title="검은사막 연구소"
        keywords={`검은사막, 검은사막 생활, 검은사막 요리`}
      />
      <h1>검은사막 연구소</h1>
      <SearchComponent page="main" />
      <h2>검은사막 연구소</h2>
    </main>
  );
};

export default IndexPage;
