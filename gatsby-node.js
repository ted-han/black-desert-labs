const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      allCraft {
        nodes {
          id
          name
        }
      }
    }
  `);

  data.allCraft.nodes.forEach((node) => {
    actions.createPage({
      // path: `${node.name.replace(/ /gi, "-")}`,
      path: node.name,
      component: require.resolve(`./src/pages/item.js`),
      context: {
        id: node.id,
        name: node.name,
      },
    });
  });
};
