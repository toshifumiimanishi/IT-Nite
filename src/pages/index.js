import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Qiita from '../components/qiita'

const Container = styled.div`
  padding: 40px 0;
`

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
  border-radius: var(--base-border-radius);
  width: 300px;
  overflow: hidden;
  transition: all var(--base-duration) var(--base-timing-function);

  &:hover {
    color: var(--base-link-color);
    box-shadow: 0 0 0 2px;
  }

  &:focus-within {
    color: var(--base-link-color);
    box-shadow: 0 0 0 2px;
  }
`

const CardHeader = styled.div`
  flex-shrink: 0;

  > img {
    border-radius: var(--base-border-radius);
    object-fit: cover;
    width: 100%;
    height: 160px;
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
    <Container>
      <Cards>
        {data.allMicrocmsPosts.edges.map(({ node }) => {
          return (
            <Card key={node.id}>
              <Link to={`${node.id}`}>
                <CardHeader>
                  <img src={node._embedded.url} alt="" />
                </CardHeader>
                <CardBody>
                  <div>{node.title}</div>
                  <time dateTime={node.createdAt}>
                    {toLocaleDate(node.createdAt)}
                  </time>
                </CardBody>
              </Link>
            </Card>
          )
        })}
      </Cards>
      <Qiita post={data.allQiitaPost} />
    </Container>
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
    allQiitaPost {
      edges {
        node {
          id
          title
          url
          likes_count
          created_at
        }
      }
    }
  }
`
