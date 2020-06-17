import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Qiita from '../components/Qiita'
import GitHub from '../components/GitHub'
import Card from '../components/molecules/Card'
import { breakpointDown } from '../utils/breakpoints'
import { Theme } from '../../types'
import { Query } from '../../types/graphql-types'
import ThemeContext from '../contexts/ThemeContext'

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
  const systemSettingTheme = (() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark'
    } else {
      return null
    }
  })()

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme === 'light') {
      activateLightMode()
    } else if (theme === 'dark') {
      activateDarkMode()
    }
  }, [])

  const [theme, setTheme] = useState<Theme['theme']>(systemSettingTheme)

  const activateLightMode = () => {
    const rootElement = document.documentElement

    rootElement.style.setProperty(
      '--base-background-color',
      'var(--theme-light-background-color)'
    )
    rootElement.style.setProperty('--base-color', 'var(--theme-light-color)')
    setTheme('light')
  }

  const activateDarkMode = () => {
    const rootElement = document.documentElement

    rootElement.style.setProperty(
      '--base-background-color',
      'var(--theme-dark-background-color)'
    )
    rootElement.style.setProperty('--base-color', 'var(--theme-dark-color)')
    setTheme('dark')
  }

  return (
    <ThemeContext.Provider
      value={{ theme, activateLightMode, activateDarkMode }}
    >
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
    </ThemeContext.Provider>
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
