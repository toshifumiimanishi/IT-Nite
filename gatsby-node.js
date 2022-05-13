const path = require(`path`)
const webpack = require(`webpack`)

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const sources = await graphql(
    `
      {
        allMicrocmsPosts(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  )

  if (sources.errors) {
    throw sources.errors
  }

  const posts = sources.data.allMicrocmsPosts.edges

  posts.forEach(({ node }) => {
    createPage({
      path: node.id,
      component: path.resolve(`src/templates/blog-post.tsx`),
      context: {
        slug: node.id,
      },
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        buffer: require.resolve(`buffer/`),
        stream: require.resolve(`stream-browserify`),
        util: require.resolve(`util/`),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
      }),
    ],
  })
}