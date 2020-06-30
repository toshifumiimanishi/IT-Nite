import React from 'react'
import styled from 'styled-components'
import Time from '../components/atoms/Time'
import { QiitaPostConnection } from '../../types/graphql-types'
import { brandColors } from '../constants/colors'

type Props = {
  post: QiitaPostConnection
  className?: string
}

const Heading = styled.h2`
  margin-bottom: 24px;
  color: ${brandColors.qiita};
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
    color: ${brandColors.qiita};
  }
`

const Qiita: React.FC<Props> = ({ post, className }) => (
  <section className={className}>
    <Heading>Qiita</Heading>
    <List>
      {post.edges.map(({ node }) => {
        return (
          <li key={node.id}>
            <a
              href={node.url as string | undefined}
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
                  <Time>{node.created_at}</Time>
                </dd>
              </Media>
            </a>
          </li>
        )
      })}
    </List>
  </section>
)

export default Qiita
