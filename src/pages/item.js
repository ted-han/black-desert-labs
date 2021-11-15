import React from "react";
import { Link, graphql } from "gatsby";

import ItemInfo from "../components/item-info";

export default function Item({ data }) {
  console.log(data);

  return <ItemInfo data={data} />;

  // return <pre>{JSON.stringify(data, null, 4)}</pre>;
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
