import * as React from "react";
import { Link } from "gatsby";

const HowIngredient = ({ allIngredient }) => {
  console.log(allIngredient);
  return (
    <div>
      {allIngredient.nodes.map((v) => {
        return (
          <div key={v.name}>
            {v.name} = {v.craft.map((c) => c.item_name)}
          </div>
        );
      })}
    </div>
  );
};

const ItemInfo = ({ data }) => {
  if (!data) return null;
  console.log(data);
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
      return getAllCraftWay(v, cnt * v.cnt);
    });
  };

  getAllCraftWay(data.craft, data.craft.cnt);

  console.log(data.craft.craft);
  console.log(arr);
  const HowCraft = ({ craft, arr }) => {
    console.log(arr);
    // 가장 기본이 되는 원재료인 경우
    if (craft.is_basic) {
      return (
        <div>
          <div>{data.craft.item_name}</div>
        </div>
      );
    }
    return (
      <div>
        {craft.craft.map((v) => {
          return (
            <div key={v.item_id}>
              {v.item_name} {v.cnt}
            </div>
          );
        })}
        <br />
        ------------
        {craft.craft.length !== arr.length && (
          <div>
            {arr
              .filter((v) => !v.is_basic)
              .map((vv) => {
                return (
                  <div>
                    {vv.item_name}
                    {vv.craft.map((c) => c.item_name)}
                  </div>
                );
              })}

            {Object.keys(
              arr.reduce((acc, curr) => {
                if (!curr.is_basic) return acc;
                if (acc[curr.item_name]) {
                  acc[curr.item_name].cnt = acc[curr.item_name].cnt + curr.cnt;
                  return acc;
                }
                acc[curr.item_name] = curr;
                return acc;
              }, {}),
            ).map((v) => v.item_name)}
          </div>
        )}
      </div>
    );
  };

  // // 0. 아래꺼가 true면 가장 낮은 레벨인거임, 획득방법 표시
  // console.log(craft.is_basic);
  // // 1. 아래꺼가 맨 첫줄, 메인조합
  // console.log(craft.craft);
  // // 2. 아래껀 첫줄중에 조합필요한거 보여주면 되는데 is_basic false인거만 약간 차이둬서 보여주면됨.
  // console.log(arr);
  // // 3. 아래 중 is_basic true 인건 total로 해서 젤 아래에 보여주기, 조건 craft.craft.length !== arr.length
  // console.log(arr);

  // if (craft.is_basic) {
  //   return <div>{craft.craft.map((v) => v.item_name)}</div>;
  // }

  return (
    <div>
      <HowCraft craft={data.craft} arr={arr} />
      <HowIngredient allIngredient={data.allIngredient} />
    </div>
  );
};
export default ItemInfo;
