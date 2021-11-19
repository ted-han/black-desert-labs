import React from "react";
import { graphql } from "gatsby";

import ItemInfo from "../components/item-info";
import SearchComponent from "../components/search";

export default function Item({ data }) {
  console.log(data);

  return (
    <main>
      <title>검은사막</title>
      <SearchComponent page="" />
      <ItemInfo data={data} />
    </main>
  );
}

export const query = graphql`
  query ($id: String, $name: String) {
    craft(id: { eq: $id }) {
      id
      item_id
      item_name
      cnt
      is_basic
      craft {
        item_id
        item_name
        is_basic
        cnt
        craft {
          item_id
          item_name
          is_basic
          cnt
          craft {
            item_id
            item_name
            cnt
            is_basic
            craft {
              item_id
              item_name
              cnt
              is_basic
            }
          }
        }
      }
    }
    allIngredient(filter: { ingredient: { eq: $name } }) {
      nodes {
        name
        ingredient
        craft {
          item_id
          item_name
          cnt
        }
      }
    }
  }
`;
