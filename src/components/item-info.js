import * as React from "react";
import { Link, navigate } from "gatsby";
import { replaceItemObj, replaceItemArr } from "./common";

import {
  itemWrapperHeader,
  ingredientTopWrapper,
  ingredientBottomWrapper,
  itemBoxWrapper,
  itemBox,
  itemBoxHeader,
  mainItemDivider,
} from "./item.module.css";

const ItemBox = ({ data, total = false }) => (
  <div
    className={itemBox}
    onClick={() => {
      navigate(`/${data.item_name.replace(/ /gi, "-")}`);
    }}
  >
    <div className={itemBoxHeader}>
      <img
        alt={`${data.item_name}`}
        src={`/${data.item_id}.png`}
        width="36px"
        height="36px"
      />
      <span>x{total ? data.total : data.cnt}</span>
    </div>
    <span>{data.item_name}</span>
  </div>
);

const ItemInfo = ({ data }) => {
  if (!data) return null;
  // 현재 아이템의 재료 중 조합이 필요한 아이템이 있는지 확인
  const arr = [];
  const getAllCraftWay = (o, cnt) => {
    o.craft.map((v) => {
      if (v.is_basic) {
        arr.push({
          ...v,
          total: cnt * v.cnt,
          main: v.main ?? false,
        });
        return;
      }
      arr.push({
        ...v,
        total: cnt * v.cnt,
        main: v.main ?? false,
      });
      return getAllCraftWay({ ...v, craft: v.craft }, cnt * v.cnt);
    });
  };
  getAllCraftWay(
    {
      ...data.craft,
      craft: data.craft.craft.map((v) => ({ ...v, main: true })),
    },
    data.craft.cnt,
  );

  // 페이지 상단
  // 아이템 설명, 제조, 하위제조, 필요한 모든 기본아이템
  const HowCraft = ({ craft, arr }) => {
    // 가장 기본이 되는 원재료인 경우, 조합이 필요없는 경우
    if (craft.is_basic) {
      const replaceItemName = replaceItemObj[craft.item_name];
      let replaceItemNameText = `${replaceItemName}: `;
      if (replaceItemName) {
        const arr = replaceItemArr[replaceItemName];
        for (let i = 0; i < arr.length; i++) {
          replaceItemNameText = replaceItemNameText + arr[i];
          if (i !== arr.length - 1) {
            replaceItemNameText = replaceItemNameText + ", ";
          }
        }
      }
      return (
        <>
          <div className={itemWrapperHeader}>
            <img
              alt={`${craft.item_name}`}
              src={`/${craft.item_id}.png`}
              width="60"
              height="60"
            />
            <h3>{craft.item_name}</h3>
          </div>
          {replaceItemName && (
            <div>
              <span>{replaceItemNameText}</span>
            </div>
          )}
        </>
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
          <h3>{craft.item_name}</h3>
        </div>
        <h4>조합</h4>
        <div id={ingredientTopWrapper}>
          <table>
            <tbody>
              <tr>
                <td>
                  <Link to={`/${craft.item_name.replace(/ /gi, "-")}`}>
                    {craft.item_name}
                  </Link>
                </td>
                <td>
                  <div className={itemBoxWrapper}>
                    {craft.craft.map((c) => {
                      return <ItemBox key={c.item_id} data={c} />;
                    })}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 style={{ margin: 0 }}>하위 조합</h4>
        <div id={ingredientTopWrapper}>
          <table>
            <tbody>
              {arr
                .filter((v) => !v.is_basic)
                .map((vv, idx) => {
                  return (
                    <tr key={idx} className={vv.main ? mainItemDivider : ""}>
                      <td>
                        <Link to={`/${vv.item_name.replace(/ /gi, "-")}`}>
                          {vv.item_name}
                        </Link>
                      </td>
                      <td>
                        <div className={itemBoxWrapper}>
                          {vv.craft.map((c) => {
                            return <ItemBox key={c.item_id} data={c} />;
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {craft.craft.length !== arr.length && (
                <tr>
                  <td>전체</td>
                  <td>
                    <div className={itemBoxWrapper}>
                      {Object.values(
                        arr.reduce((acc, curr) => {
                          if (!curr.is_basic) return acc;
                          if (acc[curr.item_name]) {
                            acc[curr.item_name].total =
                              acc[curr.item_name].total + curr.total;
                            return acc;
                          }
                          acc[curr.item_name] = curr;
                          return acc;
                        }, {}),
                      ).map((v) => {
                        return (
                          <ItemBox key={v.item_id} data={v} total={true} />
                        );
                      })}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
        <h4>상위 아이템</h4>
        <div id={ingredientBottomWrapper}>
          <table>
            <tbody>
              {allIngredient.nodes.map((v, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <Link to={`/${v.name.replace(/ /gi, "-")}`}>
                        {v.name}
                      </Link>
                    </td>
                    <td>
                      <div className={itemBoxWrapper}>
                        {v.craft.map((c) => (
                          <ItemBox key={c.item_id} data={c} />
                        ))}
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

  return (
    <div>
      <HowCraft craft={data.craft} arr={arr} />
      <HowIngredient allIngredient={data.allIngredient} />
    </div>
  );
};
export default ItemInfo;
