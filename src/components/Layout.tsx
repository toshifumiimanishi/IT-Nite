import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import { breakpointDown } from '../utils/breakpoints'
import { colors } from '../constants/colors'
import { typography } from '../constants/typography'
import { transitions } from '../constants/transitions'
import { components } from '../constants/components'
import { theme } from '../constants/theme'

const ResetStyle = createGlobalStyle`
  body,
  html {
    height: 100%;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    font-size: inherit;
    line-height: inherit;
  }

  pre,
  textarea {
    overflow: auto;
  }

  [hidden],
  audio:not([controls]),
  template {
    display: none;
  }

  details,
  main,
  summary {
    display: block;
  }

  input[type="number"] {
    width: auto;
  }

  input[type="search"] {
    -webkit-appearance: none;
  }

  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  progress {
    display: inline-block;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  textarea {
    resize: vertical;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  img {
    max-width: 100%;
    height: auto;
    border: 0;
  }

  button,
  input,
  select,
  textarea {
    min-height: 1.5em;
    color: inherit;
    font-weight: inherit;
    font-family: inherit;
    font-style: inherit;
  }

  button {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  html input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    cursor: pointer;
    -webkit-appearance: button;
  }

  button[disabled],
  html input[disabled] {
    cursor: default;
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  button {
    border: 0;
    background: transparent;
  }

  [type="number"],
  [type="search"],
  textarea {
    -webkit-appearance: none;
  }

  input {
    border: 0;
    line-height: normal;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
  }

  ol,
  ul {
    list-style: none;
  }

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  fieldset {
    border: 0;
  }
`

const BaseStyle = createGlobalStyle`
  @font-face {
    font-family: "icomoon";
    src:  url("../../assets/fonts/icomoon.eot?yzl28n");
    src:  url("../../assets/fonts/icomoon.eot?yzl28n#iefix") format("embedded-opentype"),
      url("../../assets/fonts/icomoon.ttf?yzl28n") format("truetype"),
      url("../../assets/fonts/icomoon.woff?yzl28n") format("woff"),
      url("../../assets/fonts/icomoon.svg?yzl28n#icomoon") format("svg");
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  :root {
    --base-duration: ${transitions.duration};
    --base-timing-function: ${transitions.timingFunctions};
    --base-border-color: ${colors.gray[600]};
    --base-border-radius: ${components.border.radius};
    --base-link-color: ${colors.blue[200]};
    --base-button-background-color: ${colors.black};
    --base-button-hover-background-color: ${colors.blue[200]};
    --primary-color: ${colors.orange[500]};
    --primary-border-color: ${colors.orange[500]};
    --error-color: ${colors.red[700]};
    --error-border-color: ${colors.red[700]};
    --theme-light-background-color: ${colors.white};
    --theme-light-color: ${colors.gray[800]};
    --theme-dark-background-color: ${colors.gray[800]};
    --theme-dark-color: ${colors.white};

    @media (prefers-color-scheme: light) {
      --base-background-color: ${theme.light.backgroundColor};
      --base-color: ${theme.light.color};
    }

    @media (prefers-color-scheme: dark) {
      --base-background-color: ${theme.dark.backgroundColor};
      --base-color: ${theme.dark.color};
    }
  }

  body {
    background-color: var(--base-background-color);
    color: var(--base-color);
    font-family: ${typography.fontFamily};
    line-height: ${typography.lineHeight};
    word-wrap: break-word;
    -webkit-text-size-adjust: 100%;
    letter-spacing: ${typography.letterSpacing};

    ${breakpointDown('md')} {
      font-size: 14px;
    }
  }

  a {
    color: inherit;
    text-decoration: ${components.link.decoration};
  }

  ::selection {
    background-color: ${components.selection.backgroundColor};
    color: ${components.selection.color};
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
      animation: unset !important;
    }
  }
`

const Main = styled.main`
  margin: auto;
  padding-bottom: 100px;
  max-width: 1040px;
`

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <ResetStyle />
      <BaseStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout
