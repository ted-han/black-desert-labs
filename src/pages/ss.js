import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";

import Search from "../components/search";

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const IndexPage = ({ data }) => {
  console.log(data);
  const arrData = data.allCraft.nodes;

  const [updateData, setUpdateData] = useState([]);
  const [value, setValue] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");
    const urlSearchParams = new URLSearchParams(window.location.search);
    const param = urlSearchParams.get("q");
    console.log(param);
    setQ(param);
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, []);

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
          .filter((v) => v.item_name.includes(q))
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
