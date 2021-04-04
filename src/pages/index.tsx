import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Qiita from '../components/Qiita'
import GitHub from '../components/GitHub'
import Card from '../components/molecules/Card'
import { breakpointDown } from '../utils/breakpoints'
import { Query } from '../../types/graphql-types'

type Props = {
  data: Query
}

const Home = styled.div`
  .home_qiita {
    margin-top: 70px;
  }

  .home_github {
    margin-top: 100px;
  }
`

const Container = styled.div`
  padding: 40px;

  ${breakpointDown('md')} {
    padding-right: 6.25%;
    padding-left: 6.25%;
  }
`

const Cards = styled.ul`
  display: grid;
  grid-gap: 30px;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(auto-fill, minmax(280px, auto));
  justify-content: center;
`

const IndexPage: React.FC<Props> = ({ data }) => {
  return (
    <Home className="home">
      <Layout>
        <SEO title="Home" />
        <Container>
          <Cards>
            {data.allMicrocmsPosts.edges.map(({ node }) => {
              return <Card data={node} key={node.id} />
            })}
          </Cards>
          <Qiita className="home_qiita" post={data.allQiitaPost} />
          <GitHub className="home_github" viewer={data.github.viewer} />
        </Container>
      </Layout>
    </Home>
  )
}

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
    github {
      viewer {
        contributionsCollection {
          commitContributionsByRepository(maxRepositories: 6) {
            repository {
              id
              url
              name
              updatedAt
              forkCount
              stargazers {
                totalCount
              }
            }
            contributions {
              totalCount
            }
          }
          user {
            starredRepositories {
              totalCount
            }
            contributionsCollection {
              totalCommitContributions
            }
          }
        }
      }
    }
  }
`
