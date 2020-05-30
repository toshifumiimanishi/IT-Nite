import React from 'react'
import styled from 'styled-components'
import toLocaleDateJA from '../utils/toLocaleDateJA'
import { GitHub_User } from '../../types/graphql-types'

type DOMProps = {
} & Props

type PresenterProps = {
} & Props

type ContainerProps = {
  presenter: React.FC<PresenterProps>
} & Props

type Props = {
  className?: string
  viewer: GitHub_User
}

const GitHubDOM: React.FC<DOMProps> = ({
  className,
  viewer,
}) => (
  <section className={className}>
    <div className="github_container">
      <h2 className="github_h">GitHub</h2>
      <div className="github_activities">
        <div className="github_star github_activity">
          <svg className="github_icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="star">
            <title>Star</title>
            <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
          </svg>
          スター<br />
          <strong>{viewer.contributionsCollection.user.starredRepositories.totalCount}</strong>
        </div>
        <div className="github_contribution github_activity">
          <i className="github_icon"><img src="/assets/images/icon_contribution.png" alt="" /></i>コントリビューション<br />
          <strong>{viewer.contributionsCollection.user.contributionsCollection.totalCommitContributions}</strong>
        </div>
      </div>
      <ul className="github_repositories">
        {
          viewer.contributionsCollection.commitContributionsByRepository.map((node) => {
            return (
              <li className="github_repository" key={node?.repository.id}>
                <a
                  href={node?.repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <dl>
                    <dt className="github_repositoryname">{node?.repository.name}</dt>
                    <div className="github_status">
                      <dd className="github_star">
                        <svg className="github_icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="star">
                          <title>Star</title>
                          <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
                        </svg>
                        {node.repository.stargazers.totalCount}
                      </dd>
                      <dd className="github_fork">
                        <svg className="github_icon" viewBox="0 0 16 16" version="1.1" role="img" aria-label="fork">
                          <title>Fork</title>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.25001C5 3.44892 4.92099 3.63969 4.78033 3.78034C4.63968 3.92099 4.44892 4.00001 4.25 4.00001C4.05109 4.00001 3.86033 3.92099 3.71967 3.78034C3.57902 3.63969 3.5 3.44892 3.5 3.25001C3.5 3.05109 3.57902 2.86033 3.71967 2.71968C3.86033 2.57902 4.05109 2.50001 4.25 2.50001C4.44892 2.50001 4.63968 2.57902 4.78033 2.71968C4.92099 2.86033 5 3.05109 5 3.25001ZM5 5.37201C5.50042 5.19509 5.92217 4.84696 6.19073 4.38915C6.45929 3.93134 6.55735 3.39333 6.4676 2.87021C6.37785 2.34709 6.10605 1.87253 5.70025 1.53043C5.29445 1.18832 4.78077 1.00069 4.25 1.00069C3.71924 1.00069 3.20556 1.18832 2.79976 1.53043C2.39396 1.87253 2.12216 2.34709 2.03241 2.87021C1.94265 3.39333 2.04072 3.93134 2.30928 4.38915C2.57784 4.84696 2.99959 5.19509 3.5 5.37201V6.25001C3.5 6.84674 3.73706 7.41904 4.15901 7.841C4.58097 8.26295 5.15327 8.50001 5.75 8.50001H7.25V10.628C6.74932 10.8049 6.3273 11.1532 6.05855 11.6112C5.78981 12.0692 5.69164 12.6075 5.78139 13.1309C5.87115 13.6543 6.14306 14.1291 6.54905 14.4714C6.95504 14.8136 7.46897 15.0014 8 15.0014C8.53104 15.0014 9.04497 14.8136 9.45096 14.4714C9.85695 14.1291 10.1289 13.6543 10.2186 13.1309C10.3084 12.6075 10.2102 12.0692 9.94146 11.6112C9.67271 11.1532 9.25069 10.8049 8.75 10.628V8.50001H10.25C10.8467 8.50001 11.419 8.26295 11.841 7.841C12.263 7.41904 12.5 6.84674 12.5 6.25001V5.37201C13.0004 5.19509 13.4222 4.84696 13.6907 4.38915C13.9593 3.93134 14.0574 3.39333 13.9676 2.87021C13.8778 2.34709 13.6061 1.87253 13.2002 1.53043C12.7944 1.18832 12.2808 1.00069 11.75 1.00069C11.2192 1.00069 10.7056 1.18832 10.2998 1.53043C9.89396 1.87253 9.62216 2.34709 9.53241 2.87021C9.44265 3.39333 9.54072 3.93134 9.80928 4.38915C10.0778 4.84696 10.4996 5.19509 11 5.37201V6.25001C11 6.44892 10.921 6.63969 10.7803 6.78034C10.6397 6.92099 10.4489 7.00001 10.25 7.00001H5.75C5.55109 7.00001 5.36033 6.92099 5.21967 6.78034C5.07902 6.63969 5 6.44892 5 6.25001V5.37201ZM8.75 12.75C8.75 12.9489 8.67099 13.1397 8.53033 13.2803C8.38968 13.421 8.19892 13.5 8 13.5C7.80109 13.5 7.61033 13.421 7.46967 13.2803C7.32902 13.1397 7.25 12.9489 7.25 12.75C7.25 12.5511 7.32902 12.3603 7.46967 12.2197C7.61033 12.079 7.80109 12 8 12C8.19892 12 8.38968 12.079 8.53033 12.2197C8.67099 12.3603 8.75 12.5511 8.75 12.75ZM11.75 4.00001C11.9489 4.00001 12.1397 3.92099 12.2803 3.78034C12.421 3.63969 12.5 3.44892 12.5 3.25001C12.5 3.05109 12.421 2.86033 12.2803 2.71968C12.1397 2.57902 11.9489 2.50001 11.75 2.50001C11.5511 2.50001 11.3603 2.57902 11.2197 2.71968C11.079 2.86033 11 3.05109 11 3.25001C11 3.44892 11.079 3.63969 11.2197 3.78034C11.3603 3.92099 11.5511 4.00001 11.75 4.00001Z"></path>
                        </svg>
                        {node.repository.forkCount}
                      </dd>
                    </div>
                    <dd className="github_updatedat">
                      <time dateTime={node.repository.updatedAt}>{toLocaleDateJA(node.repository.updatedAt)}</time>
                    </dd>
                  </dl>
                </a>
              </li>
            )
          })
        }
      </ul>
    </div>
  </section>
)

const PresentationalGitHub = styled(GitHubDOM)`
  .github_h {
    margin-bottom: 24px;
    font-size: 24px;
  }

  .github_activities {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;

    > * + * {
      margin-left: 16px;
    }
  }

  .github_activity {
    text-align: center;

    strong {
      font-size: 24px;
    }
  }

  .github_repositories {
    display: grid;
    grid-gap: 30px;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(auto-fill, minmax(280px, auto));
  }

  .github_repository {
    border: 1px solid var(--base-border-color);
    border-radius: var(--base-border-radius);
    padding: 16px;
    transition: all var(--base-duration) var(--base-timing-function);

    &:focus-within {
      color: var(--base-link-color);
      box-shadow: 0 0 0 2px;
    }

    @media screen and (min-width: 768px) {
      &:hover {
        color: var(--base-link-color);
        box-shadow: 0 0 0 2px;
      }
    }
  }

  .github_repositoryname {
    margin-bottom: 12px;
    font-size: 14px;
  }

  .github_status {
    display: flex;
    font-size: 12px;

    > * + * {
      margin-left: 8px;
    }
  }

  .github_contribution {
    font-size: 12px;

    i {
      display: inline-block;
      margin-right: 4px;
    }
  }

  .github_star {
    font-size: 12px;

    svg {
      margin-right: 4px;
    }
  }

  .github_fork {
    svg {
      margin-right: 4px;
    }
  }

  .github_updatedat {
    text-align: right;
    font-size: 12px;
  }

  .github_icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    transform: translateY(-2px);
  }
`

const ContainerGitHub: React.FC<ContainerProps> = ({
  presenter,
  viewer,
  ...props
}) => (
  presenter({ viewer, ...props })
)

const GitHub: React.FC<Props> = ({ viewer, ...props }) => (
  <ContainerGitHub
    presenter={(presenterProps) => (
      <PresentationalGitHub className="github" {...presenterProps} />
    )}
    viewer={viewer}
    {...props}
  />
)

export default GitHub
