import React from 'react'
import styled from 'styled-components'

type DOMProps = {
  className?: string
} & Props

type Props = JSX.IntrinsicElements['textarea']

const TextAreaDOM: React.FC<DOMProps> = ({
  className,
  id,
  name,
  rows = 5,
  placeholder,
}) => (
  <textarea
    className={className}
    id={id}
    name={name}
    rows={rows}
    placeholder={placeholder}
  />
)

const PresentationalTextArea = styled(TextAreaDOM)`
  border: 1px solid var(--base-border-color);
  border-radius: var(--base-border-radius);
  padding: 8px;
  width: 100%;
  background-color: transparent;

  &::placeholder {
    color: transparent;
  }
`

const ContainerTextArea = ({ presenter, ...props }: { presenter: React.FC }) =>
  presenter({ ...props })

const TextArea: React.FC<Props> = (props) => (
  <ContainerTextArea
    presenter={(presenterProps) => (
      <PresentationalTextArea {...presenterProps} />
    )}
    {...props}
  />
)

export default TextArea
