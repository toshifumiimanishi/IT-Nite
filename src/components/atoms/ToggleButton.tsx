import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { Theme } from '../../../types'

type DOMProps = {} & Props

type PresenterProps = {} & Props

type ContainerProps = {
  presenter: React.FC<PresenterProps>
} & Props

type Props = {
  className?: string
  theme: Theme['theme']
  onClickToggleButton: () => void
}

const ToggleButtonDOM: React.FC<DOMProps> = ({
  className,
  onClickToggleButton,
  theme,
}) => (
  <button className={className} type="button" onClick={onClickToggleButton}>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      {theme === 'dark' ? (
        <>
          <title>Activate light mode</title>
          <path d="M3.563 18.563l1.781-1.828 1.406 1.406-1.781 1.828zM11.016 22.453v-2.953h1.969v2.953h-1.969zM12 5.484q2.484 0 4.242 1.758t1.758 4.242-1.758 4.242-4.242 1.758-4.242-1.758-1.758-4.242 1.758-4.242 4.242-1.758zM20.016 10.5h3v2.016h-3v-2.016zM17.25 18.141l1.406-1.359 1.781 1.781-1.406 1.406zM20.438 4.453l-1.781 1.781-1.406-1.406 1.781-1.781zM12.984 0.563v2.953h-1.969v-2.953h1.969zM3.984 10.5v2.016h-3v-2.016h3zM6.75 4.828l-1.406 1.406-1.781-1.781 1.406-1.406z"></path>
        </>
      ) : (
        <FontAwesomeIcon icon={faMoon} title="Activate dark mode" />
      )}
    </svg>
  </button>
)

const PresentationalToggleButton = styled(ToggleButtonDOM)`
  > svg {
    fill: currentColor;
    opacity: 0.6;
    transition: all var(--base-duration) var(--base-timing-function);

    &:hover {
      opacity: 1;
    }
  }
`

const ContainerToggleButton: React.FC<ContainerProps> = ({
  presenter,
  theme,
  onClickToggleButton,
  ...props
}) => presenter({ theme, onClickToggleButton, ...props })

const ToggleButton: React.FC<Props> = ({
  theme,
  onClickToggleButton,
  ...props
}) => (
  <ContainerToggleButton
    presenter={(presenterProps) => (
      <PresentationalToggleButton {...presenterProps} />
    )}
    theme={theme}
    onClickToggleButton={onClickToggleButton}
    {...props}
  />
)

export default ToggleButton
