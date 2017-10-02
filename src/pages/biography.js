import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Quote from '../components/quote'
import marked from 'marked'
import styles from './biography.module.scss'

export default (props) => {
  const node = props.data.allContentfulBiography.edges[0].node
  const paragraphs = node.biography.biography.split('\n').filter(paragraph => paragraph !== '')
  const renderedBiography = paragraphs.map((paragraph, index) => {
    if (index === 0) {
      const dropCap = `<span class=${styles.dropCap}><em>${paragraph.substr(0, 1)}</em></span>`
      paragraph = paragraph.replace(/^\w/, dropCap)
    }

    return (
      <div className={styles.paragraphWrapper} dangerouslySetInnerHTML={{ __html: marked(paragraph) }} key={index} />
    )
  })

  const quote1 = <Quote
    author="Jean-Marie Londeix"
    quote="I have great admiration for your great talent...I have been very impressed by your masterful technique, by the simplicity of your playing, by your musical intelligence, by the perfect presentation..."
    source="Legendary Saxophonist, Conservatoire National de Bourdeaux"></Quote>

  const quote2 = <Quote
    author="Donald Sinta"
    quote="breathtaking and spectacular&#8230;a revolution displayed in the hands of an artist"
    source="Earl V. Moore Distinguished Professor Emeritus of Saxophone, The University of Michigan"></Quote>

  renderedBiography.splice(2, 0, quote1)
  renderedBiography.splice(renderedBiography.length - 2, 0, quote2)

  return (
    <Container backgroundColor="#111" foregroundColor="#ccc" logoColor="#fff">
      <Helmet>
      </Helmet>

      <div className={styles.image}></div>

      <article className={styles.contentWrapper}>
        <div className={styles.content}>
          <h1 className={styles.title}>Biography</h1>

          <div className={styles.copy}>
            {renderedBiography}
          </div>

          <a className={styles.link} href="">Short Biography</a>
          <a className={styles.link} href="">Long Biography</a>
        </div>
      </article>
    </Container>
  )
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
