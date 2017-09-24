import React from 'react'
import Link from 'gatsby-link'
import Recording from '../components/recording'
import styles from './recordings.module.scss'
import photo from '../images/tim-8.jpg'

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
    const backgroundColor = this.props.data.allContentfulRecording.edges.map(({ node }) => node.color).join(',')
    const listBackground = {
      backgroundImage: `linear-gradient(white, ${backgroundColor}, white)`
    }

    return (
      <section>
        <header className={styles.header}>
          <h1 className={styles.title}>Recordings</h1>
        </header>

        <div className={styles.listBackground} style={listBackground}>
          <ol className={styles.recordingsList}>
            {this.props.data.allContentfulRecording.edges.map(({ node }) =>
              <Recording
                color={node.color}
                date={node.date}
                description={node.description ? node.description.description : ""}
                key={node.id}
                id={node.id}
                imageSrc={node.image.responsiveResolution.src}
                imageSrcSet={node.image.responsiveResolution.srcSet}
                media={node.media ? node.media.file.url : ""}
                onMediaToggle={this.onMediaToggle}
                recordingUrl={node.recordingUrl}
                title={node.title}
              />
            )}
          </ol>
        </div>
      </section>
    )
  }
}

export const query = graphql`
  query Recordings {
    allContentfulRecording(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          title
          date
          color
          image {
            id
            responsiveResolution(width: 600) {
              base64
              aspectRatio
              width
              height
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
    }
  }
`
