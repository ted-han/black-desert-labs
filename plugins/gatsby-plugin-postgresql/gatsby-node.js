const knex = require("./db");

const getCraftInfo = () => {
  return knex.raw(
    `
      SELECT 
        name,
        1 as cnt,        
        string_agg(concat('{"name":"',craft,'","cnt":',cnt,'}'), ', ') as craft,
        levelone
      FROM test
      GROUP BY name, levelone;
  `,
    [],
  );
};

const getIngredientInfo = () => {
  return knex.raw(
    `
      WITH step1 AS (
        SELECT * 
        FROM test
        WHERE craft is not null
      ),
      step2 AS (
        SELECT 
          name,
          1 as cnt,
          string_agg(concat('{"name":"',craft,'","cnt":',cnt,'}'), ', ') as craft,
          levelone
        FROM test
        GROUP BY name, levelone
      )
      SELECT 
        step1.name,
        step1.craft as incredient,
        step2.craft
      FROM step1 
      INNER JOIN step2
      ON step1.name = step2.name
      ORDER BY step1.craft;
  `,
    [],
  );
};

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions;

  // 상세 검색 상단부분
  const resultCraftInfo = await getCraftInfo();
  const updateResultCraftInfo = resultCraftInfo.rows.map((v) => {
    return {
      ...v,
      craft: JSON.parse(`[${v.craft}]`),
    };
  });

  // 오브젝트로 저장
  const resultObj = {};
  for (let i = 0; i < updateResultCraftInfo.length; i++) {
    const name = updateResultCraftInfo[i].name;
    resultObj[name] = updateResultCraftInfo[i];
  }

  // craft 얻어오는 재귀함수
  const getCraft = (o) => {
    if (o.levelone) {
      return [];
    }

    const cc = o.craft.map((v, index) => {
      if (!resultObj[v.name].levelone) {
        return {
          ...v,
          levelone: resultObj[v.name].levelone,
          craft: getCraft({
            ...v,
            levelone: resultObj[v.name].levelone,
            craft: resultObj[v.name].craft,
          }),
        };
      }
      return {
        ...v,
        levelone: resultObj[v.name].levelone,
        craft: resultObj[v.name].craft,
      };
    });
    return cc;
  };

  // 상세 상단에서 사용할 최종형태
  const finalResult = updateResultCraftInfo.map((v) => {
    return {
      ...v,
      craft: getCraft(v),
    };
  });

  // loop through data and create Gatsby nodes
  finalResult.forEach((post, index) =>
    createNode({
      ...post,
      id: createNodeId(`Craft-${index}`),
      parent: null,
      children: [],
      internal: {
        type: "Craft",
        content: JSON.stringify(post),
        contentDigest: createContentDigest(post),
      },
    }),
  );

  // 상세 검색 하단부분
  const resultIngredientInfo = await getIngredientInfo();
  const updateResultIngredientInfo = resultIngredientInfo.rows.map((v) => {
    return {
      ...v,
      craft: JSON.parse(`[${v.craft}]`),
    };
  });

  updateResultIngredientInfo.forEach((post, index) =>
    createNode({
      ...post,
      id: createNodeId(`Ingredient-${index}`),
      parent: null,
      children: [],
      internal: {
        type: "Ingredient",
        content: JSON.stringify(post),
        contentDigest: createContentDigest(post),
      },
    }),
  );

  return;
};
