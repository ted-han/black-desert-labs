import React, { useState } from "react";
import { Link, graphql, StaticQuery } from "gatsby";

const Search = (props) => {
  console.log(props);
  const emptyQuery = "";

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state.query);
  };
  const handleInputChange = (event) => {
    const query = event.target.value;
    const { data } = props;
    console.log(data);
    const posts = data.allCraft.nodes || [];

    const filteredData = posts.filter((post) => {
      console.log(post);
      console.log(query);
      return post.item_name.includes(query) && query !== "";
    });

    setState({
      query,
      filteredData,
    });
  };

  const renderSearchResults = () => {
    const { query, filteredData } = state;
    const hasSearchResults = filteredData && query !== emptyQuery;
    const posts = hasSearchResults ? filteredData : [];
    console.log(posts);
    return (
      posts &&
      posts.map(({ item_name }) => {
        return <div>{item_name}</div>;
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={state.query} onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {renderSearchResults()}
    </div>
  );
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        allCraft {
          nodes {
            id
            item_name
          }
        }
      }
    `}
    render={(data) => <Search data={data} {...props} />}
  />
);
