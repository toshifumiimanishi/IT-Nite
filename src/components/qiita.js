import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Heading = styled.h2`
  margin-bottom: 24px;
  color: var(--color-qiita);
  font-size: 24px;
`

const List = styled.ul`
  li + li {
    margin-top: 16px;
    border-top: 1px solid var(--base-border-color);
    padding-top: 16px;
  }
`

const Media = styled.dl`
  dt {
    font-weight: bold;
    transition: all var(--base-duration) var(--base-timing-function);

    a:hover & {
      color: var(--base-link-color);
    }
  }

  dd {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }

  strong {
    color: var(--color-qiita);
  }
`

const toLocaleDate = date => {
  return new Date(date).toLocaleDateString()
}

const Qiita = ({ post }) => (
  <>
    <Heading>Qiita</Heading>
    <List>
      {post.edges.map(({ node }) => {
        return (
          <li key={node.id}>
            <a
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Qiitaサイトへ"
            >
              <Media>
                <dt>{node.title}</dt>
                <dd>
                  <span>
                    <strong>LGTM</strong> {node.likes_count}
                  </span>
                  <time dateTime={node.created_at}>
                    {toLocaleDate(node.created_at)}
                  </time>
                </dd>
              </Media>
            </a>
          </li>
        )
      })}
    </List>
  </>
)

Qiita.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Qiita
