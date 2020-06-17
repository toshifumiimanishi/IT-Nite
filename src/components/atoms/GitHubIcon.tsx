import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

type DOMProps = {
  className?: string
}

type Props = {
  className: string
}

const GitHubIconDOM: React.FC<DOMProps> = ({ className }) => (
  <FontAwesomeIcon className={className} icon={faGithub} />
)

const PresentationalGitHubIcon = styled(GitHubIconDOM)`
  fill: currentColor;
`

const ContainerGitHubIcon = ({
  presenter,
  ...props
}: {
  presenter: React.FC
}) => presenter({ ...props })

const GitHubIcon: React.FC<Props> = (props) => (
  <ContainerGitHubIcon
    presenter={(presenterProps) => (
      <PresentationalGitHubIcon {...presenterProps} />
    )}
    {...props}
  />
)

export default GitHubIcon
