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
  border-radius: 2px;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 0 2px;
  }

  &:focus-within {
    box-shadow: 0 0 0 2px;
  }
`

const CardHeader = styled.div`
  flex-shrink: 0;
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;

  > * + * {
    margin-top: 10px;
  }

  :nth-last-child(2) {
    margin-bottom: 10px;
  }

  :last-child {
    margin-top: auto;
  }

  time {
    font-size: 12px;
    text-align: right;
  }
`

const toLocaleDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>IT Nite</h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Cards>
      { data.allMicrocmsPosts.edges.map((edge) => {
        return (
          <Card key={ edge.node.id }>
            <Link to={`${edge.node.id}`}>
              <CardHeader>
                <img
                  src={ edge.node._embedded.url }
                  alt=""
                />
              </CardHeader>
              <CardBody>
                <div>{ edge.node.title }</div>
                <time dateTime={ edge.node.createdAt }>{ toLocaleDate(edge.node.createdAt) }</time>
              </CardBody>
            </Link>
          </Card>
        )
      }) }
    </Cards>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
    allMicrocmsPosts(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          title
          createdAt
          _embedded {
            url
          }
        }
      }
    }
  }
`
