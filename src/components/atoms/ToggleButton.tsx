import React from 'react'
import styled from 'styled-components'

type DOMProps = {
  className?: string
  theme: string | null
  onClickToggleButton: () => void
}

type ContainerProps = {
  theme: string | null
  onClickToggleButton: () => void
}

type Props = {
  className?: string
  theme: string | null
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
        <>
          <title>Activate dark mode</title>
          <path d="M9 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93q-1.594 0-3-0.422 3.094-0.938 5.039-3.586t1.945-5.977-1.945-5.977-5.039-3.586q1.406-0.422 3-0.422z"></path>
        </>
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

const ContainerToggleButton = ({
  presenter,
  theme,
  onClickToggleButton,
  ...props
}: {
  presenter: React.FC<ContainerProps>
  theme: string | null
  onClickToggleButton: () => void
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
