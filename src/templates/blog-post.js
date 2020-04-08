import React from "react";
import { graphql } from "gatsby"

export default (props) => {
  const {
    title,
    body
  } = props.data.microcmsPosts

  return (
    <>
      <h1>{ title }</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: `${body}`,
        }}
      />
    </>
  )
}

export const pageQuery = graphql`
  query ($slug: String!) {
    microcmsPosts(id: { eq: $slug }) {
      title
      body
    }
  }
`
