import React from 'react'
import Container from '../components/container'
import dateformat from 'dateformat'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import marked from 'marked'
import styles from '../styles/news.module.scss'
import typographicBase from 'typographic-base'


export default (props) => {
  const node = props.data.contentfulNews

  return (
    <Container>
      <Helmet>
        <title>{node.title}</title>
      </Helmet>

      <section className={styles.contentWrapper} style={{ zIndex: 0 }}>
        <div className={styles.content}>
          <h1 className={styles.heading}>{typographicBase(node.title, { locale: 'en-us'})}</h1>

          <h2 className={styles.caption}>{dateformat(node.date, 'mmmm d, yyyy')}</h2>

          <div className={styles.paragraphWrapper} dangerouslySetInnerHTML={{ __html: marked(typographicBase(node.content.content, { locale: 'en-us'})) }} />
        </div>
      </section>
    </Container>
  )
}

export const query = graphql`
  query NewsItemQuery($slug: String!) {
    contentfulNews(fields: { slug: { eq: $slug } }) {
      id
      title
      date
      content {
        id
        content
      }
      fields {
        slug
      }
    }
  }
`
