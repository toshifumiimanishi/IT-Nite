import React from 'react'
import styled from 'styled-components'

type DOMProps = {
  className?: string
} & JSX.IntrinsicElements['input']

const TextFieldDOM: React.FC<DOMProps> = ({ className, id, type = 'text', name, placeholder }) => (
  <input
    className={className}
    id={id}
    type={type}
    name={name}
    placeholder={placeholder}
  />
)

const PresentationalTextField = styled(TextFieldDOM)`
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

  &:invalid {
    border-color: var(--error-border-color);
  }
`

const ContainerTextField = ({ presenter, ...props }: { presenter: React.FC }) => presenter({ ...props })

const TextField: React.FC = (props) => (
  <ContainerTextField
    presenter={(presenterProps) => (
      <PresentationalTextField {...presenterProps} />
    )}
    {...props}
  />
)

export default TextField
