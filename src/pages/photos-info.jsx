import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Img from 'gatsby-image'
import LazyLoad from 'react-lazyload'
import Link from 'gatsby-link'
import styles from '../styles/photos.module.scss'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node
  const photos = props.data.allContentfulImages.edges
  const biography = props.data.allContentfulBiography.edges[0].node

  return (
    <Container>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <ol className={styles.list}>
            {photos.map(({ node }) =>
            <li className={styles.item} key={node.id}>
              <div className={styles.itemWrapper}>
                <Img sizes={node.image.responsiveResolution} />                

                <footer className={styles.detailFooter}>
                  <a className={styles.link} download href={node.image.responsiveResolution.src}>Download</a>
                </footer>
              </div>
            </li>
            )}
            <li className={styles.item} key={new Date().toISOString()}>
              <div className={styles.itemWrapper}>
                <footer className={styles.detailFooter}>
                  <a className={styles.link} href={biography.shortBiography.file.url}>Short Biography</a>
                  <a className={styles.link} href={biography.longBiography.file.url}>Long Biography</a>
                </footer>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </Container>
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
