import React from 'react'
import styled from 'styled-components'

const ButtonDOM = ({ className, type = 'button', children }) => (
  <button className={className} type={type}>
    {children}
  </button>
)

const PresentationalButton = styled(ButtonDOM)`
  border-radius: var(--base-border-radius);
  background-color: var(--base-button-background-color);
  font-weight: bold;
  transition: background-color var(--base-duration) var(--base-timing-function);

  @media screen and (min-width: 768px) {
    &:hover {
      background-color: var(--base-button-hover-background-color);
    }
  }
`

const ContainerButton = ({ presenter, ...props }) => presenter({ ...props })

const Button = ({ ...props }) => (
  <ContainerButton
    presenter={(presenterProps) => <PresentationalButton {...presenterProps} />}
    {...props}
  />
)

export default Button
