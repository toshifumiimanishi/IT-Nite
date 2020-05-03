import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import ToggleButton from './atoms/ToggleButton'
import GitHubIcon from './atoms/GitHubIcon'

const HeaderDOM = ({ className, siteTitle, theme, onClickToggleButton }) => (
  <header className={className}>
    <div className="header_container">
      <h1 className="header_title">
        <Link to="/">{siteTitle}</Link>
      </h1>
      <ul className="header_list">
        <li>
          <Link to="/contact/">Contact</Link>
        </li>
      </ul>
      <ul className="header_widget">
        <li className="header_widgetitem">
          <ToggleButton
            className="header_togglebutton"
            theme={theme}
            onClickToggleButton={onClickToggleButton}
          />
        </li>
        <li className="header_widgetitem">
          <a
            href="https://github.com/toshifumiimanishi/IT-Nite"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="header_icon" />
          </a>
        </li>
      </ul>
    </div>
  </header>
)

const PresentationalHeader = styled(HeaderDOM)`
  &.header {
    position: relative;
    background-color: var(--header-background-color);
    color: var(--header-color);
  }

  .header_container {
    display: flex;
    align-items: baseline;
    padding: 10px 24px;
  }

  .header_title {
    font-size: 20px;
  }

  .header_list {
    margin-left: 20px;

    a {
      opacity: 0.6;
      transition: all var(--base-duration) var(--base-timing-function);

      &:hover {
        opacity: 1;
      }
    }
  }

  .header_widget {
    display: flex;
    margin-left: auto;
  }

  .header_widgetitem {
    + .header_widgetitem {
      margin-left: 16px;
    }
  }

  .header_togglebutton {
    width: 24px;
    height: 24px;
  }

  .header_icon {
    width: 24px;
    height: 24px;
  }

  a,
  button {
    .header_icon {
      opacity: 0.6;
      transition: all var(--base-duration) var(--base-timing-function);
    }

    &:hover .header_icon {
      opacity: 1;
    }
  }
`

const ContainerHeader = ({ presenter, ...props }) => {
  const systemSettingTheme = (() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark'
    } else {
      return null
    }
  })()

  const [theme, setTheme] = useState(systemSettingTheme)

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme === 'light') {
      activateLightMode()
    } else if (theme === 'dark') {
      activateDarkMode()
    }
  }, [])

  const activateLightMode = () => {
    const rootElement = document.documentElement

    rootElement.style.setProperty(
      '--base-background-color',
      'var(--theme-light-background-color)'
    )
    rootElement.style.setProperty('--base-color', 'var(--theme-light-color)')
    setTheme('light')
  }

  const activateDarkMode = () => {
    const rootElement = document.documentElement

    rootElement.style.setProperty(
      '--base-background-color',
      'var(--theme-dark-background-color)'
    )
    rootElement.style.setProperty('--base-color', 'var(--theme-dark-color)')
    setTheme('dark')
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      activateDarkMode()
      localStorage.setItem('theme', 'dark')
    } else if (theme === 'dark') {
      activateLightMode()
      localStorage.setItem('theme', 'light')
    }
  }

  const onClickToggleButton = useCallback(toggleTheme, [theme])

  return presenter({ theme, onClickToggleButton, ...props })
}

const Header = (props) => (
  <ContainerHeader
    presenter={(presenterProps) => (
      <PresentationalHeader className="header" {...presenterProps} />
    )}
    {...props}
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
