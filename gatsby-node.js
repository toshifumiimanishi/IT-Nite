const path = require(`path`)

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
      component: path.resolve(`src/templates/blog-post.js`),
      context: {
        slug: node.id
      }
    })
  })
}
