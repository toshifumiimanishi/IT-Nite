import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const Cards = styled.ul`
  display: grid;
  grid-gap: 30px;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px 0;
`

const Card = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--base-border-radius);
  width: 300px;
  overflow: hidden;
  transition: all var(--base-duration) var(--base-timing-function);

  &:hover {
    color: var(--link-color);
    box-shadow: 0 0 0 2px;
  }

  &:focus-within {
    color: var(--link-color);
    box-shadow: 0 0 0 2px;
  }
`

const CardHeader = styled.div`
  flex-shrink: 0;

  > img {
    border-radius: var(--base-border-radius);
  }
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

const toLocaleDate = date => {
  return new Date(date).toLocaleDateString()
}

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Cards>
      {data.allMicrocmsPosts.edges.map(edge => {
        return (
          <Card key={edge.node.id}>
            <Link to={`${edge.node.id}`}>
              <CardHeader>
                <img src={edge.node._embedded.url} alt="" />
              </CardHeader>
              <CardBody>
                <div>{edge.node.title}</div>
                <time dateTime={edge.node.createdAt}>
                  {toLocaleDate(edge.node.createdAt)}
                </time>
              </CardBody>
            </Link>
          </Card>
        )
      })}
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
