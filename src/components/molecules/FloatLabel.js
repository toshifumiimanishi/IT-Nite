import React from 'react'
import styled from 'styled-components'

const FloatLabelDOM = ({
  className,
  htmlFor,
  children,
  labelName,
}) => (
  <p className={ className }>
    { children }
    <label htmlFor={ htmlFor }>{ labelName }</label>
  </p>
)

const PresentationalFloatLabel = styled(FloatLabelDOM)`
  > label {
    display: block;
    transition-property: transform, color;
    transition-duration: var(--base-duration);
    transition-timing-function: var(--base-timing-function);
    transform: translateY(32px);
    transform-origin: 0 100%;
  }

  > input,
  > textarea {
    order: 2;
  }

  &:focus-within label {
    color: var(--primary-color);
    transform: translateY(0) scale(0.8);
  }

  > textarea ~ label {
    padding-left: 8px;
  }

  input:not(:placeholder-shown) ~ label,
  textarea:not(:placeholder-shown) ~ label {
    transform: translateY(0) scale(0.8);
  }
`

const ContainerFloatLabel = ({ presenter, ...props }) => (
  presenter({ ...props })
)

const FloatLabel = (props) => (
  <ContainerFloatLabel
    presenter={ presenterProps => <PresentationalFloatLabel { ...presenterProps } /> }
    { ...props }
  />
)

export default FloatLabel
