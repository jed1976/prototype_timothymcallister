import { Page, Wrapper } from '../components/layout'

import Helmet from 'react-helmet'
import Hero from '../components/hero'
import React from 'react'
import Recording from '../components/recording'

export default class Recordings extends React.Component {

  constructor(props) {
    super(props)
    this.media = null
    this.onMediaToggle = this.onMediaToggle.bind(this)
  }

  onMediaToggle(newMedia) {
    if (this.media && this.media !== newMedia) {
      this.media.pause()
    }
    this.media = newMedia
  }

  render() {
    const pageData = this.props.data.contentfulPage

    return (
      <Page>
        <Helmet>
          <title>{pageData.title} - {this.props.data.site.siteMetadata.title}</title>
          <meta name="description" content={pageData.description.description} />
          <link rel="canonical" href={`${this.props.data.site.siteMetadata.siteUrl}${pageData.slug}`} />
        </Helmet>

        <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

        <Wrapper>
          {this.props.data.allContentfulRecording.edges.map(({ node }) =>
          <Recording
            date={node.date}
            description={node.description ? node.description.description : ""}
            id={node.id}
            imageSrc={node.image.responsiveResolution}
            key={node.id}
            media={node.media ? node.media.file.url : ""}
            onMediaToggle={this.onMediaToggle}
            recordingUrl={node.recordingUrl}
            title={node.title}
          />
          )}
        </Wrapper>
      </Page>
    )
  }
}

export const query = graphql`
  query Recordings {
    site {
      siteMetadata {
        siteUrl
        title
      }
    },

    allContentfulRecording(
      sort: {
        fields: [date],
        order: DESC
      }
    ) {
      edges {
        node {
          id
          title
          date
          image {
            id
            responsiveResolution {
              aspectRatio
              base64
              src
              srcSet
            }
          }
          media {
            file {
              url
              fileName
              contentType
            }
          }
          recordingUrl
          description {
            id
            description
          }
        }
      }
    },

    contentfulPage(
      slug: {
        eq: "/recordings"
      }
    ) {
      id
      slug
      description {
        id
        description
      }
      title
      image {
        responsiveSizes(maxWidth: 2048, quality: 75) {
          aspectRatio
          src
          srcSet
          sizes
        }
      }
    },
  }
`
