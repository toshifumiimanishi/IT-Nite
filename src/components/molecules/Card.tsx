import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { rgba, cssVar } from 'polished'
import { Link } from 'gatsby'
import Time from '../atoms/Time'
import { breakpointUp } from '../../utils/breakpoints'
import { Theme } from '../../../types'
import { MicrocmsPosts } from '../../../types/graphql-types'
import ThemeContext from '../../contexts/ThemeContext'

type DOMProps = {} & Props

type PresenterProps = {
  theme: Theme['theme']
} & Props

type ContainerProps = {
  presenter: React.FC<PresenterProps>
} & Props

type Props = {
  data: MicrocmsPosts
  className?: string
  tagname?: React.ElementType
}

const CardDOM: React.FC<DOMProps> = ({
  data,
  tagname: TagName = 'li',
  className,
}) => (
  <TagName className={className}>
    <Link to={`${data.id}`}>
      <div className="card_header">
        <img src={data._embedded?.url as string | undefined} alt="" />
      </div>
      <div className="card_body">
        <div>{data.title}</div>
        <Time>{data.createdAt}</Time>
      </div>
    </Link>
  </TagName>
)

const PresentationalCard = styled(CardDOM)`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--base-border-radius);
  overflow: hidden;
  transition: all var(--base-duration) var(--base-timing-function);

  ${(props) =>
    props.theme === 'light' &&
    css`
      box-shadow: var(--base-card-box-shadow);
    `}

  ${(props) =>
    props.theme === 'dark' &&
    css`
      background-color: ${rgba(cssVar('--color-white'), 0.05)};
    `}

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

  .card_header {
    flex-shrink: 0;

    > img {
      border-radius: var(--base-border-radius) var(--base-border-radius) 0 0;
      object-fit: cover;
      width: 100%;
      height: 160px;
    }
  }

  .card_body {
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
  }
`

const ContainerCard: React.FC<ContainerProps> = ({
  presenter,
  data,
  tagname,
  ...props
}) => {
  const { theme } = useContext(ThemeContext)

  return presenter({
    data,
    tagname,
    theme,
    ...props,
  })
}

const Card: React.FC<Props> = ({ data, tagname, ...props }) => (
  <ContainerCard
    presenter={(presenterProps) => (
      <PresentationalCard className="card" {...presenterProps} />
    )}
    data={data}
    tagname={tagname}
    {...props}
  />
)

export default Card
