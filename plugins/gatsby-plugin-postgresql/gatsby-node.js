const knex = require("./db");

const a = () => {
  return knex.raw(
    `
      select * from test;
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

  // 아래를 추가해서 쿼리를 여러개 만들 수 있따.
  const data = await a();
  console.log(data);
  // loop through data and create Gatsby nodes
  data.rows.forEach((post, index) =>
    createNode({
      ...post,
      id: createNodeId(`Item-${index}`),
      parent: null,
      children: [],
      internal: {
        type: "Item",
        content: JSON.stringify(post),
        contentDigest: createContentDigest(post),
      },
    }),
  );

  return;
};
