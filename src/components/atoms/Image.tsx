import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Query } from '../../../types/graphql-types';

 type Props = {
   filename: string
   alt: string
 }

const Image: React.FC<Props> = ({filename, alt}) => {
  const data: Query = useStaticQuery(graphql`
  query {
    allFile( filter: { internal: { mediaType: { regex: "/image/" } } } ) {
      nodes {
        relativePath
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  }
  `)

  const image = data.allFile.nodes.find(({relativePath}) => {
    return relativePath.includes(filename)
  })
  const fluid = image?.childImageSharp?.fluid

  return (
    <Img
      fluid={fluid}
      alt={alt}
    />
  )
}

export default Image
