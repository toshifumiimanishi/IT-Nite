import React from 'react'
import styled from 'styled-components'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

type DOMProps = FontAwesomeIconProps

type PresenterProps = {
  icon: FontAwesomeIconProps['icon']
}

type ContainerProps = {
  presenter: React.FC<PresenterProps>
  icon: string
}

type Props = {
  icon: string
  className?: string
  title?: string
}

const IconDOM: React.FC<DOMProps> = ({
  icon,
  ...props
}) => (
  <FontAwesomeIcon icon={icon} {...props} />
)

const PresentationalIcon = styled(IconDOM)``

const ContainerIcon: React.FC<ContainerProps> = ({
  presenter,
  icon: name,
  ...props
}) => {
  const iconMap = {
    faMoon,
    faGithub,
  }
  const icon = iconMap[name as keyof typeof iconMap]
  config.autoAddCss = false // Font Awesome のランタイムでの CSS 追加を無効にする
  return presenter({ icon, ...props})
}

const Icon: React.FC<Props> = ({
  icon,
  ...props
}) => (
  <ContainerIcon
    presenter={( presenterProps) => (
      <PresentationalIcon
        {...presenterProps}
      />
    )}
    icon={icon}
    {...props}
  />
)

export default Icon
