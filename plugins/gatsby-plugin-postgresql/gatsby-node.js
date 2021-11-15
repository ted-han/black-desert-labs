// const knex = require("./db");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.BDL_HOST,
    port: process.env.BDL_PORT,
    user: process.env.BDL_USER,
    password: process.env.BDL_PASSWORD,
    database: process.env.BDL_DATABASE,
  },
});

const getCraftInfo = () => {
  return knex.raw(
    `
    select
      item_id,
      item_name,
      1 as cnt,
      string_agg(concat('{"item_name":"',ingredient,'","item_id":',coalesce((select item_id from items where item_name=ingredient),0),',"cnt":',ingredient_cnt,'}'), ', ') as craft,
      is_basic,
      category
    from (
      select 
        i.item_id,
        i.item_name,
        c.ingredient,
        coalesce(c.ingredient_cnt,0) as ingredient_cnt,
        i.is_basic,
        i.category
      from items i
      left join craft c
      on i.item_name = c.craft_name
    ) x
    group by item_id, item_name, is_basic, category;
  `,
    [],
  );
};

const getIngredientInfo = () => {
  return knex.raw(
    `
    WITH step1 AS (
      SELECT 
        craft_name,
        ingredient
      FROM craft
    ),
    step2 AS (
      select
        item_id,
        item_name,
        1 as cnt,
        string_agg(concat('{"item_name":"',ingredient,'","item_id":',coalesce((select item_id from items where item_name=ingredient),0),',"cnt":',ingredient_cnt,'}'), ', ') as craft,
        is_basic,
        category
      from (
        select 
          i.item_id,
          i.item_name,
          c.ingredient,
          coalesce(c.ingredient_cnt,0) as ingredient_cnt,
          i.is_basic,
          i.category
        from items i
        left join craft c
        on i.item_name = c.craft_name
      ) x
      group by item_id, item_name, is_basic, category
    )
    SELECT 
      step1.craft_name as name,
      step1.ingredient,
      step2.craft
    FROM step1 
    INNER JOIN step2
    ON step1.craft_name = step2.item_name
    ORDER BY step1.craft_name;
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
    const name = updateResultCraftInfo[i].item_name;
    resultObj[name] = updateResultCraftInfo[i];
  }

  // craft 얻어오는 재귀함수
  const getCraft = (o) => {
    if (o.is_basic) {
      return [];
    }

    const cc = o.craft.map((v, index) => {
      if (!resultObj[v.item_name].is_basic) {
        return {
          ...v,
          is_basic: resultObj[v.item_name].is_basic,
          craft: getCraft({
            ...v,
            is_basic: resultObj[v.item_name].is_basic,
            craft: resultObj[v.item_name].craft,
          }),
        };
      }
      return {
        ...v,
        is_basic: resultObj[v.item_name].is_basic,
        craft: resultObj[v.item_name].craft,
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
