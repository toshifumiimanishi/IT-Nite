import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const Cards = styled.ul`
  display: grid;
  grid-gap: 30px;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(3, 1fr);
`

const Card = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 0.25rem;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 0 0.25rem;
  }

  &:focus-within {
    box-shadow: 0 0 0 0.25rem;
  }
`

const CardHeader = styled.div`
  flex-shrink: 0;
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <Cards>
      { data.allMicrocmsPosts.edges.map((edge) => {
        return (
          <Card key={ edge.node.slug }>
            <a href="">
              <CardHeader>
                <img
                  src={ edge.node._embedded.url }
                  alt=""
                />
              </CardHeader>
              <div>{ edge.node.title }</div>
            </a>
          </Card>
        )
      }) }
    </Cards>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
    allMicrocmsPosts(sort: {fields: createdAt}) {
      edges {
        node {
          id
          title
          content
          _embedded {
            url
          }
        }
      }
    }
  }
`
