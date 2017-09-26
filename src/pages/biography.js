import React from 'react'
import Link from 'gatsby-link'
import marked from 'marked'
import styles from './biography.module.scss'

export default class Biography extends React.Component {
  render() {
    const node = this.props.data.allContentfulBiography.edges[0].node
    const paragraphs = node.biography.biography.split('\n').filter(paragraph => paragraph !== '')
    const renderedBiography = paragraphs.map((paragraph, index) =>
      <div className={styles.paragraph} dangerouslySetInnerHTML={{ __html: marked(paragraph) }} key={index} />)

    return (
      <section>
        <header className={styles.header}>
          <h1 className={styles.title}>Biography</h1>
        </header>

        <div className={styles.wrapper}>
          {renderedBiography}
        </div>
      </section>
    )
  }
}

export const query = graphql`
  query Biography {
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
