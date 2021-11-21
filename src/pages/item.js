import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
import ItemInfo from "../components/item-info";
import SearchComponent from "../components/search";

export default function Item({ data }) {
  return (
    <main>
      <Seo
        title={`${data.craft.item_name} - 검은사막 연구소`}
        description={`${data.craft.item_name} - 검은사막 연구소. 검은사막 ${data.craft.item_name} 조합, 검은사막 요리`}
        keywords={`검은사막 ${data.craft.item_name}, 검은사막 생활, 검은사막 요리`}
      />
      <SearchComponent page="item" />
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
