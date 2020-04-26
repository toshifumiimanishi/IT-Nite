import React from 'react'
import styled from 'styled-components'

const TextAreaDOM = ({
  className,
  id,
  name,
  rows = 5,
  placeholder,
}) => (
  <textarea className={ className } id={ id } name={ name } rows={ rows } placeholder={placeholder} />
)

const PresentationTextArea = styled(TextAreaDOM)`
  border: 1px solid var(--base-border-color);
  border-radius: var(--base-border-radius);
  padding: 8px;
  width: 100%;
  background-color: transparent;

  &::placeholder {
    color: transparent;
  }
`

const ContainerTextArea = ({ presenter, ...props }) => (
  presenter({ ...props })
)

const TextArea = (props) => (
  <ContainerTextArea
  presenter={ presenterProps => <PresentationTextArea { ...presenterProps } /> }
  { ...props }
  />
)

export default TextArea
