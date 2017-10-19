import { Container, Page, Section, Wrapper } from '../components/layout'

import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Img from 'gatsby-image'
import List from '../components/list'
import React from 'react'
import styles from '../styles/photosInfo.module.scss'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node
  const photos = props.data.allContentfulImages.edges
  const biography = props.data.allContentfulBiography.edges[0].node
  const biographyDocuments = [
    {
      download: true,
      url: biography.shortBiography.file.url,
      title: 'Short Biography'
    },

    {
      download: true,
      url: biography.longBiography.file.url,
      title: 'Full Biography'
    }
  ]
  let theme

  return (
    <Page>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <Wrapper>
      {photos.map(({ node }, index) => {
        theme = index % 2 === 0 ? `dark` : `light`

        return (
        <Section centerContent key={index} padding sticky theme={theme}>
          <Container className={styles.imageLayout}>
            <Img sizes={node.image.responsiveResolution} />

            <List items={[ {
              download: true,
              url: node.image.responsiveResolution.src,
              title: 'Download' }
            ]} />
          </Container>
        </Section>
        )
      })}

        <Section centerContent padding sticky theme={theme === 'dark' ? 'light' : 'dark'}>
          <Container className={styles.imageLayout}>
            <List items={biographyDocuments} />
          </Container>
        </Section>
      </Wrapper>
    </Page>
  )
}

export const query = graphql`
  query PhotosInfoQuery {
    allContentfulPage(
      filter: {
        slug: {
          eq: "/photos-info"
        }
      }
    ) {
      edges {
        node {
          id
          title
          image {
            responsiveSizes(maxWidth: 2048, quality: 75) {
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    },

    allContentfulImages {
      edges {
        node {
          id
          image {
            id
            responsiveResolution(width: 2048, quality: 75) {
              base64
              aspectRatio
              width
              height
              src
              srcSet
            }
          }
        }
      }
    },

    allContentfulBiography {
      edges {
        node {
          id
          color
          biography {
            id
            biography
          }
          longBiography {
            id
            file {
              url
              fileName
              contentType
            }
          }
          shortBiography {
            id
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
    }
  }
`
