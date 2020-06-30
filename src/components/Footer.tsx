import { Link } from 'gatsby'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { breakpointDown } from '../utils/breakpoints'

type DOMProps = {
  className?: string
}

type presenterProps = {}

type ContainerProps = {
  presenter: React.FC<presenterProps>
}

type Props = {
  className?: string
}

const FooterDOM: React.FC<DOMProps> = ({ className }) => (
  <footer className={className}>
    <div className="footer_container">
      <h2 className="footer_h">IT Nite について</h2>
      <p className="footer_txt">
        IT Nite（以下「当ポートフォリオ」）は HTML や CSS、JavaScript
        を中心としたフロントエンドの技術を紹介するメディア兼ポートフォリオです。
        原則、当ポートフォリオが公開している記事は個人の備忘録であり、当ポートフォリオが掲載している内容をご参考にしていただいた上で、万が一障害が生じた場合でも一切の責任を負わないものとします。
        当ポートフォリオや管理人へのお問い合わせをはじめ、記事内容の指摘や訂正などがございましたら、
        <Link className="footer_link" to="/contact/">
          お問い合わせページ
        </Link>
        よりご連絡ください。
      </p>
      <p className="copyright">
        <small>&copy; 2020 IT Nite.</small>
      </p>
    </div>
  </footer>
)

const PresentationalFooter = styled(FooterDOM)`
  &.footer {
    background-color: ${(props) =>
      props.theme.components.footer.backgroundColor};
    color: ${(props) => props.theme.components.footer.color};
  }

  .footer_container {
    margin: auto;
    padding: 24px 40px;
    max-width: 1040px;

    ${breakpointDown('md')} {
      padding: 20px 6.25%;
    }
  }

  .footer_h {
    margin-bottom: 12px;
    font-size: 20px;
  }

  .footer_txt {
    font-size: 12px;
  }

  .footer_link {
    color: ${(props) => props.theme.components.link.color};

    &:hover {
      text-decoration: underline;
    }
  }

  .copyright {
    margin-top: 20px;
    font-size: 12px;
    text-align: center;
  }
`

const ContainerFooter: React.FC<ContainerProps> = ({ presenter, ...props }) => {
  return presenter({ ...props })
}

const Footer: React.FC<Props> = (props) => (
  <ContainerFooter
    presenter={(presenterProps) => (
      <PresentationalFooter className="footer" {...presenterProps} />
    )}
    {...props}
  />
)

export default Footer
