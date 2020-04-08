import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createGlobalStyle } from "styled-components"

import Header from "./header"

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

  [type="text"],
  [type="number"],
  [type="search"],
  textarea {
    border: 0;
    -webkit-appearance: none;
  }

  input {
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
  :root {
    --color-white: #fff;
    --color-black: #000;
    --color-black-light: #353535;
    --base-background-color: var(--color-black-light);
    --base-font-color: var(--color-white);
    --base-font-family: "Hiragino Kaku Gothic ProN", "Segoe UI", "BIZ UDPGothic", Meiryo, sans-serif;
    --base-line-height: 1.6875;
  }

  body {
    background-color: var(--base-background-color);
    color: var(--base-font-color);
    font-family: var(--base-font-family);
    line-height: var(--base-line-height);
    word-wrap: break-word;
    -webkit-text-size-adjust: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
      animation: unset !important;
    }
  }
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
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
        }}
      >
        <main>{children}</main>
        <footer>
          &copy; {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
