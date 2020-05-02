import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import Header from './header'
import Footer from './footer'

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
    --color-white: #fff;
    --color-black: #000;
    --color-gray-100: #f8f9fa;
    --color-gray-200: #e9ecef;
    --color-gray-300: #dee2e6;
    --color-gray-400: #ced4da;
    --color-gray-500: #adb5bd;
    --color-gray-600: #6c757d;
    --color-gray-700: #495057;
    --color-gray-800: #343a40;
    --color-gray-900: #212529;
    --color-red: #d32f2f;
    --color-aqua: #90caf9;
    --color-pink: #ff4081;
    --color-orange: #ff9800;
    --color-qiita: #55c500;
    --base-font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "BIZ UDPGothic", Meiryo, sans-serif;
    --base-line-height: 1.6875;
    --base-letter-spacing: 0.05em;
    --base-duration: 0.2s;
    --base-timing-function: ease;
    --base-border-color: var(--color-gray-600);
    --base-border-radius: 4px;
    --base-link-color: var(--color-aqua);
    --base-selection-background-color: var(--color-pink);
    --base-selection-color: var(--color-white);
    --base-button-background-color: var(--color-black);
    --base-button-hover-background-color: var(--color-aqua);
    --primary-color: var(--color-orange);
    --primary-border-color: var(--color-orange);
    --error-color: var(--color-red);
    --error-border-color: var(--color-red);
    --header-background-color: var(--color-black);
    --header-color: var(--color-white);
    --footer-background-color: var(--color-black);
    --footer-color: var(--color-white);
    --theme-light-background-color: var(--color-white);
    --theme-light-color: var(--color-gray-800);
    --theme-dark-background-color: var(--color-gray-800);
    --theme-dark-color: var(--color-white);

    @media (prefers-color-scheme: light) {
      --base-background-color: var(--theme-light-background-color);
      --base-color: var(--theme-light-color);
    }

    @media (prefers-color-scheme: dark) {
      --base-background-color: var(--theme-dark-background-color);
      --base-color: var(--theme-dark-color);
    }
  }

  body {
    background-color: var(--base-background-color);
    color: var(--base-color);
    font-family: var(--base-font-family);
    line-height: var(--base-line-height);
    word-wrap: break-word;
    -webkit-text-size-adjust: 100%;
    letter-spacing: var(--base-letter-spacing);

    @media screen and (max-width: 767.8px) {
      font-size: 14px;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::selection {
    background: var(--base-selection-background-color);
    color: var(--base-selection-color);
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

const Layout = ({ children }) => {
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
