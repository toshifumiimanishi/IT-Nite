import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data }) => {
  const { title, body, createdAt, _embedded } = data.microcmsPosts

  const Title = styled.h1`
    font-size: 36px;
    text-align: center;
  `

  const Article = styled.article`
    padding: 20px 0;

    a {
      color: var(--link-color);

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

  const Time = styled.div`
    margin: 12px 0;
    font-size: 12px;
    text-align: center;
  `

  const toLocaleDate = date => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <Layout>
      <SEO title={title} />
      <div>
        <img src={_embedded.url} alt="" />
      </div>
      <Article>
        <Title>{title}</Title>
        <Time>
          <time dateTime={createdAt}>{toLocaleDate(createdAt)} 公開</time>
        </Time>
        <div
          dangerouslySetInnerHTML={{
            __html: `${body}`,
          }}
        />
      </Article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    microcmsPosts(id: { eq: $slug }) {
      title
      body
      createdAt
      _embedded {
        url
      }
    }
  }
`
