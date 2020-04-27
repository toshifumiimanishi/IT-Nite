import React from 'react'
import styled from 'styled-components'

const TextBoxDOM = ({ className, id, type = 'text', name, placeholder }) => (
  <input
    className={className}
    id={id}
    type={type}
    name={name}
    placeholder={placeholder}
  />
)

const PresentationalTextBox = styled(TextBoxDOM)`
  border: 0;
  border-bottom: 1px solid var(--base-border-color);
  padding: 8px;
  width: 100%;
  background-color: transparent;

  &::placeholder {
    color: transparent;
  }

  &:focus {
    border-color: var(--primary-border-color);
  }
`

const ContainerTextBox = ({ presenter, ...props }) => presenter({ ...props })

const TextBox = (props) => (
  <ContainerTextBox
    presenter={(presenterProps) => (
      <PresentationalTextBox {...presenterProps} />
    )}
    {...props}
  />
)

export default TextBox
