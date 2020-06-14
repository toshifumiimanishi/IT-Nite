import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Qiita from '../components/Qiita'
import GitHub from '../components/GitHub'
import Time from '../components/atoms/Time'
import { breakpointUp, breakpointDown } from '../utils/breakpoints'
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

const Card = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--base-border-radius);
  overflow: hidden;
  transition: all var(--base-duration) var(--base-timing-function);

  &:focus-within {
    color: var(--base-link-color);
    box-shadow: 0 0 0 2px;
  }

  ${breakpointUp('md')} {
    &:hover {
      color: var(--base-link-color);
      box-shadow: 0 0 0 2px;
    }
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

const IndexPage: React.FC<Props> = ({ data }) => (
  <Home className="home">
    <Layout>
      <SEO title="Home" />
      <Container>
        <Cards>
          {data.allMicrocmsPosts.edges.map(({ node }) => {
            return (
              <Card key={node.id}>
                <Link to={`${node.id}`}>
                  <CardHeader>
                    <img src={node._embedded?.url as string | undefined} alt="" />
                  </CardHeader>
                  <CardBody>
                    <div>{node.title}</div>
                    <Time>{node.createdAt}</Time>
                  </CardBody>
                </Link>
              </Card>
            )
          })}
        </Cards>
        <Qiita className="home_qiita" post={data.allQiitaPost} />
        <GitHub className="home_github" viewer={data.github.viewer} />
      </Container>
    </Layout>
  </Home>
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
