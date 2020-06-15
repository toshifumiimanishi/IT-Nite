import React from 'react'
import { graphql } from 'gatsby'
import cheerio from 'cheerio'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Time from '../components/atoms/Time'
import { breakpointUp, breakpointDown } from '../utils/breakpoints'
import { MicrocmsPosts } from '../../types/graphql-types'

type Props = {
  data: {
    microcmsPosts: MicrocmsPosts
  }
}

export default ({ data }: Props) => {
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

      ${breakpointDown('md')} {
        height: 250px;
      }
    }
  `

  const Title = styled.h1`
    font-size: 36px;
    text-align: center;

    ${breakpointDown('md')} {
      font-size: 20px;
    }
  `

  const Article = styled.article`
    padding: 40px 48px;

    ${breakpointDown('md')} {
      padding: 20px 6.25%;
    }

    .time {
      margin: 12px 0;
      font-size: 14px;
      text-align: center;

      ${breakpointDown('md')} {
        font-size: 10px;
      }

      > time {
        margin-right: 0.5em;
      }
    }
  `

  const ArticleContent = styled.div`
    ${breakpointUp('md')} {
      display: flex;

      .outline {
        order: 1;
      }
    }
  `

  const ArticleBody = styled.div`
    h2 {
      margin: 1em 0;
      font-size: 24px;

      ${breakpointDown('md')} {
        font-size: 18px;
      }
    }

    h3 {
      margin: 1em 0;
      font-size: 20px;

      ${breakpointDown('md')} {
        font-size: 16px;
      }
    }

    ul {
      margin: 1em 0;
      padding-left: 40px;

      ${breakpointDown('md')} {
        padding-left: 20px;
      }
    }

    li {
      list-style: inside;
    }

    img {
      margin: 1em 0;
    }
  `

  const Outline = styled.nav`
    ${breakpointDown('md')} {
      margin-bottom: 40px;
      border-bottom: 1px solid var(--base-border-color);
      padding-bottom: 40px;
    }

    ${breakpointUp('md')} {
      position: sticky;
      top: 24px;
      margin-left: 48px;
      max-width: 320px;
      max-height: 200px;
    }

    > h2 {
      margin-bottom: 24px;
      font-size: 14px;

      ${breakpointDown('md')} {
        margin-bottom: 12px;
      }
    }

    li {
      margin-bottom: 12px;
      list-style: none;
      font-size: 14px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    a {
      color: inherit;
    }

    .outline_h3 {
      padding-left: 1em;
    }
  `

  const Profile = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 40px auto 0 48px;
    max-width: 640px;

    ${breakpointDown('md')} {
      margin: 20px auto 0;
      padding: 0 6.25%;
    }

    dt {
      margin-bottom: 12px;
      font-size: 20px;

      ${breakpointDown('md')} {
        margin-bottom: 6px;
        font-size: 16px;
      }
    }

    dd {
      font-size: 14px;

      ${breakpointDown('md')} {
        font-size: 12px;
      }
    }

    img {
      order: -1;
      margin-right: 40px;
      padding-top: 6px;
      width: 100px;
      object-fit: contain;

      ${breakpointDown('md')} {
        margin-right: 20px;
        width: 80px;
      }
    }
  `

  const createOutline = () => {
    const $ = cheerio.load(body as string)
    const headings = $('h1, h2, h3').toArray()
    const outline = headings.map((heading) => ({
      text: heading.children[0].data,
      id: heading.attribs.id,
      tagname: heading.name,
    }))
    return outline
  }

  const isUpdated = (() => {
    return +new Date(updatedAt) - +new Date(createdAt)
  })()

  const outline = createOutline()

  return (
    <Layout>
      <SEO title={title as string} />
      <Wrapper>
        <Hero>
          <img src={_embedded?.url as string | undefined} alt="" />
        </Hero>
        <Article>
          <Title>{title}</Title>
          <div className="time">
            {isUpdated ? (
              <>
                <Time>{updatedAt}</Time>
                <span>更新</span>
              </>
            ) : (
              <>
                <Time>{createdAt}</Time>
                <span>公開</span>
              </>
            )}
          </div>
          <ArticleContent>
            {outline.length > 0 && (
              <Outline className="outline">
                <h2>目次</h2>
                <ul>
                  {outline.map((item) => (
                    <li className={`outline_${item.tagname}`} key={item.id}>
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ul>
              </Outline>
            )}
            <ArticleBody
              dangerouslySetInnerHTML={{
                __html: `${body}`,
              }}
            />
          </ArticleContent>
        </Article>
        <Profile>
          <dl>
            <dt>{author?.name}</dt>
            <dd
              dangerouslySetInnerHTML={{
                __html: `${author?.text}`,
              }}
            />
          </dl>
          <img src={author?.image?.url as string | undefined} alt="" />
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
