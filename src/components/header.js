import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

const HeaderDOM = ({className, siteTitle, theme, onClickToggleButton}) => (
  <header className={className}>
    <div className="header_container">
      <h1 className="header_title"><Link to="/">{siteTitle}</Link></h1>
      <ul className="header_list">
        <li><Link to="/contact/">Contact</Link></li>
      </ul>
      <ul className="header_widget">
        <li className="header_widgetitem">
          <button type="button" onClick={onClickToggleButton}>
            <svg
              className="header_icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
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
        </li>
        <li className="header_widgetitem">
          <a
            href="https://github.com/toshifumiimanishi/IT-Nite"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="header_icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <title>GitHub</title>
              <path d="M16 0.395c-8.836 0-16 7.163-16 16 0 7.069 4.585 13.067 10.942 15.182 0.8 0.148 1.094-0.347 1.094-0.77 0-0.381-0.015-1.642-0.022-2.979-4.452 0.968-5.391-1.888-5.391-1.888-0.728-1.849-1.776-2.341-1.776-2.341-1.452-0.993 0.11-0.973 0.11-0.973 1.606 0.113 2.452 1.649 2.452 1.649 1.427 2.446 3.743 1.739 4.656 1.33 0.143-1.034 0.558-1.74 1.016-2.14-3.554-0.404-7.29-1.777-7.29-7.907 0-1.747 0.625-3.174 1.649-4.295-0.166-0.403-0.714-2.030 0.155-4.234 0 0 1.344-0.43 4.401 1.64 1.276-0.355 2.645-0.532 4.005-0.539 1.359 0.006 2.729 0.184 4.008 0.539 3.054-2.070 4.395-1.64 4.395-1.64 0.871 2.204 0.323 3.831 0.157 4.234 1.026 1.12 1.647 2.548 1.647 4.295 0 6.145-3.743 7.498-7.306 7.895 0.574 0.497 1.085 1.47 1.085 2.963 0 2.141-0.019 3.864-0.019 4.391 0 0.426 0.288 0.925 1.099 0.768 6.354-2.118 10.933-8.113 10.933-15.18 0-8.837-7.164-16-16-16z"></path>
            </svg>
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

  .header_icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
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

  return presenter({theme, onClickToggleButton, ...props})
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
