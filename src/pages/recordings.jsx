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
    const pageData = this.props.data.allContentfulPage.edges[0].node

    return (
      <Page>
        <Helmet>
          <title>{pageData.title}</title>
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

    allContentfulPage(
      filter: {
        slug: {
          eq: "/recordings"
        },
      },
    ) {
      edges {
        node {
          id
          title
          image {
            responsiveSizes(maxWidth: 2048, quality: 75) {
              aspectRatio
              base64
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`
