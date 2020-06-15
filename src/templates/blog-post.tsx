import React from 'react'
import { graphql } from 'gatsby'
import cheerio from 'cheerio'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Time from '../components/atoms/Time'
import { breakpointUp, breakpointDown } from '../utils/breakpoints'
import { MicrocmsPosts } from '../../types/graphql-types'

type DOMProps = {
  className?: string
} & PresenterProps

type PresenterProps = {
  agenda: {
    text: string | undefined
    id: string
    tagname: string
  }[]
  isAgenda: boolean
  isUpdated: boolean
} & Props

type ContainerProps = {
  presenter: React.FC<PresenterProps>
} & Props

type Props = {
  className?: string
  data: {
    microcmsPosts: MicrocmsPosts
  }
}

const BlogDOM: React.FC<DOMProps> = ({
  data: {
    microcmsPosts: { title, body, createdAt, updatedAt, _embedded, author },
  },
  className,
  agenda,
  isAgenda,
  isUpdated,
}) => (
  <Layout>
    <SEO title={title as string} />
    <div className={className}>
      <div className="blog_wrapper">
        <div className="blog_hero">
          <img src={_embedded?.url as string | undefined} alt="" />
        </div>
        <article className="blog_article">
          <h1 className="blog_title">{title}</h1>
          <div className="blog_time">
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
          <div className="blog_articlecontent">
            {isAgenda && (
              <nav className="blog_agenda agenda">
                <h2>目次</h2>
                <ul>
                  {agenda.map((item) => (
                    <li className={`agenda_${item.tagname}`} key={item.id}>
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div
              className="blog_articlebody"
              dangerouslySetInnerHTML={{
                __html: `${body}`,
              }}
            />
          </div>
        </article>
        <div className="profile">
          <dl>
            <dt>{author?.name}</dt>
            <dd
              dangerouslySetInnerHTML={{
                __html: `${author?.text}`,
              }}
            />
          </dl>
          <img src={author?.image?.url as string | undefined} alt="" />
        </div>
      </div>
    </div>
  </Layout>
)

const PresentationalBlog = styled(BlogDOM)`
  .blog_wrapper {
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
  }

  .blog_hero {
    img {
      width: 100%;
      height: 500px;
      object-fit: cover;

      ${breakpointDown('md')} {
        height: 250px;
      }
    }
  }

  .blog_title {
    font-size: 36px;
    text-align: center;

    ${breakpointDown('md')} {
      font-size: 20px;
    }
  }

  .blog_article {
    padding: 40px 48px;

    ${breakpointDown('md')} {
      padding: 20px 6.25%;
    }

  }

  .blog_time {
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

  .blog_articlecontent {
    ${breakpointUp('md')} {
      display: flex;

      .agenda {
        order: 1;
      }
    }
  }

  .blog_articlebody {
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
  }

  .agenda {
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

  }

  .agenda_h3 {
    padding-left: 1em;
  }

  .profile {
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
  }
`

const ContainerBlog: React.FC<ContainerProps> = ({
  data,
  presenter,
  ...props
}) => {
  const { body, createdAt, updatedAt } = data.microcmsPosts

  const createAgenda = () => {
    const $ = cheerio.load(body as string)
    const headings = $('h1, h2, h3').toArray()
    const agenda = headings.map((heading) => ({
      text: heading.children[0].data,
      id: heading.attribs.id,
      tagname: heading.name,
    }))
    return agenda
  }
  const agenda = createAgenda()
  const isAgenda = agenda.length > 0
  const isUpdated = (() => {
    return +new Date(updatedAt) - +new Date(createdAt) >= 0 ? true : false
  })()

  return presenter({
    data,
    agenda,
    isAgenda,
    isUpdated,
    ...props,
  })
}

const Blog: React.FC<Props> = ({ data }) => (
  <ContainerBlog
    presenter={(presenterProps) => (
      <PresentationalBlog className="blog" {...presenterProps} />
    )}
    data={data}
  />
)

export default Blog

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
