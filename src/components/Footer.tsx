import React from 'react'
import styled from 'styled-components'

type DOMProps = {
  className?: string
}

const FooterDOM: React.FC<DOMProps> = ({ className }) => (
  <footer className={className}>
    <p className="copyright">
      <small>&copy; 2020 IT Nite.</small>
    </p>
  </footer>
)

const PresentationalFooter = styled(FooterDOM)`
  &.footer {
    padding: 10px 0;
    background-color: var(--footer-background-color);
    color: var(--footer-color);
  }

  > .copyright {
    font-size: 14px;
    text-align: center;
  }
`

const ContainerFooter = ({ presenter, ...props }: { presenter: React.FC }) => presenter({ ...props })

const Footer: React.FC = (props) => (
  <ContainerFooter
    presenter={(presenterProps) => (
      <PresentationalFooter className="footer" {...presenterProps} />
    )}
    {...props}
  />
)

export default Footer
