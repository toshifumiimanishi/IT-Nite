import React from 'react'
import styled from 'styled-components'
import { breakpointUp } from '../../utils/breakpoints'

type DOMProps = {
  className?: string
} & Props

type Props = JSX.IntrinsicElements['button']

const ButtonDOM: React.FC<DOMProps> = ({
  className,
  type = 'button',
  children,
}) => (
  <button className={className} type={type}>
    {children}
  </button>
)

const PresentationalButton = styled(ButtonDOM)`
  border-radius: var(--base-border-radius);
  background-color: var(--base-button-background-color);
  font-weight: bold;
  transition: background-color var(--base-duration) var(--base-timing-function);

  ${breakpointUp('md')} {
    &:hover {
      background-color: var(--base-button-hover-background-color);
    }
  }
`

const ContainerButton = ({ presenter, ...props }: { presenter: React.FC }) =>
  presenter({ ...props })

const Button: React.FC<Props> = ({ ...props }) => (
  <ContainerButton
    presenter={(presenterProps) => <PresentationalButton {...presenterProps} />}
    {...props}
  />
)

export default Button
