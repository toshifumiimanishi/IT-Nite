import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data }) => {
  const {
    title,
    body,
    createdAt,
    updatedAt,
    _embedded,
    author,
  } = data.microcmsPosts

  const Wrapper = styled.div`
    a {
      color: var(--base-link-color);

      &[target='_blank'] {
        &::after {
          content: '\\e900';
          margin-left: 5px;
          font-family: 'icomoon' !important;
          font-size: 0.8em;
          font-style: normal;
          font-weight: normal;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
        }
      }

      &:hover {
        text-decoration: underline;
      }
    }
  `

  const Hero = styled.div`
    img {
      width: 100%;
      height: 500px;
      object-fit: cover;
    }
  `

  const Title = styled.h1`
    font-size: 36px;
    text-align: center;
  `

  const Article = styled.article`
    padding: 40px 100px;

    h2 {
      margin: 1em 0;
      font-size: 24px;
    }

    h3 {
      margin: 1em 0;
      font-size: 20px;
    }

    ul {
      margin: 1em 0;
      padding-left: 40px;
    }

    li {
      list-style: inside;
    }

    img {
      margin: 1em 0;
    }
  `

  const Time = styled.div`
    margin: 12px 0;
    font-size: 14px;
    text-align: center;
  `

  const Profile = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 40px auto 0;
    width: 640px;

    dt {
      margin-bottom: 12px;
      font-size: 20px;
    }

    dd {
      font-size: 14px;
    }

    img {
      order: -1;
      margin-right: 40px;
      padding-top: 6px;
      width: 100px;
      object-fit: contain;
    }
  `

  const toLocaleDate = date => {
    return new Date(date).toLocaleDateString()
  }

  const isUpdated = (() => {
    return new Date(updatedAt) - new Date(createdAt)
  })()

  return (
    <Layout>
      <SEO title={title} />
      <Wrapper>
        <Hero>
          <img src={_embedded.url} alt="" />
        </Hero>
        <Article>
          <Title>{title}</Title>
          <Time>
            {isUpdated ? (
              <time dateTime={updatedAt}>{toLocaleDate(updatedAt)} 更新</time>
            ) : (
              <time dateTime={createdAt}>{toLocaleDate(createdAt)} 公開</time>
            )}
          </Time>
          <div
            dangerouslySetInnerHTML={{
              __html: `${body}`,
            }}
          />
        </Article>
        <Profile>
          <dl>
            <dt>{author.name}</dt>
            <dd
              dangerouslySetInnerHTML={{
                __html: `${author.text}`,
              }}
            />
          </dl>
          <img src={author.image.url} alt="" />
        </Profile>
      </Wrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    microcmsPosts(id: { eq: $slug }) {
      title
      body
      createdAt
      updatedAt
      _embedded {
        url
      }
      author {
        name
        text
        image {
          url
        }
      }
    }
  }
`
