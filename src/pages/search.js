import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";

import Search from "../components/search";

const arrData = [
  { id: "edde8055-84f6-5637-a8d9-36ce4c443b66", item_name: "옥수수" },
  { id: "e7c5ed32-1932-5e61-bf7c-67b283419f5a", item_name: "사과" },
  { id: "a7f77534-a33f-5ae9-9110-81b9bd354b69", item_name: "양배추" },
  { id: "fa70b79e-2718-50bf-a515-b6325e3c39df", item_name: "설탕" },
  { id: "59bc5a17-1456-5511-9424-23a832d144d3", item_name: "발효제" },
  { id: "6972f414-59f1-5d47-b5e0-4409ab41d80d", item_name: "식초" },
  { id: "91ca53a8-e9e4-5d3f-a6af-363b841ab340", item_name: "채소 절임" },
];

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const IndexPage = ({ data }) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const param = urlSearchParams.get("q");
  console.log(param);

  const [updateData, setUpdateData] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(value);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
    setUpdateData(
      arrData.filter(
        (v) =>
          v.item_name.includes(event.target.value) && event.target.value !== "",
      ),
    );
  };

  return (
    <main style={pageStyles}>
      <title>검은사막</title>
      <h1>검은사막</h1>
      <Search />
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        {arrData
          .filter((v) => v.item_name.includes(param))
          .map((v) => (
            <div key={v.id}>
              <a href={v.item_name.replace(/ /gi, "-")}>{v.item_name}</a>
            </div>
          ))}
      </div>
    </main>
  );
};

export const query = graphql`
  {
    allCraft {
      nodes {
        id
        item_name
      }
    }
  }
`;

export default IndexPage;
