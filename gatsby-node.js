const { replaceItemObj } = require(`./src/components/common`);

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      allCraft {
        nodes {
          id
          item_name
        }
      }
    }
  `);

  data.allCraft.nodes.forEach((node) => {
    actions.createPage({
      path: `${node.item_name.replace(/ /gi, "-")}`,
      component: require.resolve(`./src/pages/item.js`),
      context: {
        id: node.id,
        name: replaceItemObj[node.item_name] || node.item_name,
      },
    });
  });
};
