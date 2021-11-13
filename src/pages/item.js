import React from "react";
import { Link, graphql } from "gatsby";

export default function ItemInfo({ data }) {
  console.log(data);
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
}

export const query = graphql`
  query ($id: String!, $name: String!) {
    craft(id: { eq: $id }) {
      id
      name
      cnt
      levelone
      craft {
        name
        cnt
        levelone
        craft {
          name
          cnt
          levelone
          craft {
            name
            cnt
            levelone
            craft {
              name
              cnt
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
          name
          cnt
        }
      }
    }
  }
`;
