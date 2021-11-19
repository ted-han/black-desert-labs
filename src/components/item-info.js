import * as React from "react";
import { Link, navigate } from "gatsby";

import {
  ingredientWrapper,
  itemBox,
  itemBoxHeader,
  itemWrapper,
  itemWrapperHeader,
  itemWrapperFooter,
} from "./item.module.css";

const ItemBox = ({ data }) => (
  <div
    className={itemBox}
    onClick={() => {
      navigate(`/${data.item_name.replace(/ /gi, "-")}`);
    }}
  >
    <div className={itemBoxHeader}>
      <img alt={`${data.item_name}`} src={`/${data.item_id}.png`} width="30" />
      <span>x{data.cnt}</span>
    </div>
    <span>{data.item_name}</span>
  </div>
);

const ItemInfo = ({ data }) => {
  if (!data) return null;
  console.log(data);

  // 현재 아이템의 재료 중 조합이 필요한 아이템이 있는지 확인
  const arr = [];
  const getAllCraftWay = (o, cnt) => {
    o.craft.map((v, index) => {
      if (v.is_basic) {
        arr.push({
          ...v,
          total: cnt * v.cnt,
        });
        return;
      }
      arr.push({
        ...v,
        total: cnt * v.cnt,
      });
      return getAllCraftWay({ ...v, craft: v.craft }, cnt * v.cnt);
    });
  };

  getAllCraftWay(data.craft, data.craft.cnt);
  console.log(data.craft.craft);
  console.log(arr);

  // 페이지 상단
  // 아이템 설명, 제조, 하위제조, 필요한 모든 기본아이템
  const HowCraft = ({ craft, arr }) => {
    // 가장 기본이 되는 원재료인 경우, 조합이 필요없는 경우
    if (craft.is_basic) {
      return (
        <div className={itemWrapperHeader}>
          <img
            alt={`${craft.item_name}`}
            src={`/${craft.item_id}.png`}
            width="60"
            height="60"
          />
          <h4>{craft.item_name}</h4>
        </div>
      );
    }

    return (
      <>
        <div className={itemWrapperHeader}>
          <img
            alt={`${craft.item_id}`}
            src={`/${craft.item_id}.png`}
            width="60"
            height="60"
          />
          <h4>{craft.item_name}</h4>
        </div>
        <h3>조합</h3>
        <div id={ingredientWrapper}>
          <table>
            <thead>
              <tr>
                <th>아이템</th>
                <th>재료</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to={`/${craft.item_name.replace(/ /gi, "-")}`}>
                    {craft.item_name}
                  </Link>
                </td>
                <td>
                  <div className={itemWrapper}>
                    {craft.craft.map((c) => {
                      return <ItemBox data={c} />;
                    })}
                  </div>
                </td>
              </tr>
              {arr
                .filter((v) => !v.is_basic)
                .map((vv) => {
                  return (
                    <tr>
                      <td>
                        <Link to={`/${vv.item_name.replace(/ /gi, "-")}`}>
                          {vv.item_name}
                        </Link>
                      </td>
                      <td>
                        <div className={itemWrapper}>
                          {vv.craft.map((c) => {
                            return <ItemBox data={c} />;
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className={itemWrapperFooter}>
          {craft.craft.length !== arr.length && (
            <div className={itemWrapper}>
              {Object.values(
                arr.reduce((acc, curr) => {
                  if (!curr.is_basic) return acc;
                  if (acc[curr.item_name]) {
                    acc[curr.item_name].cnt =
                      acc[curr.item_name].cnt + curr.cnt;
                    return acc;
                  }
                  acc[curr.item_name] = curr;
                  return acc;
                }, {}),
              ).map((v) => {
                return <ItemBox data={v} />;
              })}
            </div>
          )}
        </div>
      </>
    );
  };

  // 페이지 하단
  // 해당 아이템을 이용하여 만들 수 있는 아이템 전체
  const HowIngredient = ({ allIngredient }) => {
    if (allIngredient.nodes.length === 0) return null;

    return (
      <>
        <h3>상위 아이템</h3>
        <div id={ingredientWrapper}>
          <table>
            <thead>
              <tr>
                <th>아이템</th>
                <th>재료</th>
              </tr>
            </thead>
            <tbody>
              {allIngredient.nodes.map((v) => {
                return (
                  <tr>
                    <td>
                      <Link to={`/${v.name.replace(/ /gi, "-")}`}>
                        {v.name}
                      </Link>
                    </td>
                    <td>
                      <div className={itemWrapper}>
                        {v.craft.map((c) => {
                          return <ItemBox data={c} />;
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  console.log(1);
  return (
    <div>
      <HowCraft craft={data.craft} arr={arr} />
      <HowIngredient allIngredient={data.allIngredient} />
    </div>
  );
};
export default ItemInfo;
