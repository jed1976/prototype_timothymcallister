import React from 'react'
import Container from '../components/container'
import dateformat from 'dateformat'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import LazyLoad from 'react-lazyload'
import Link from 'gatsby-link'
import marked from 'marked'
import styles from '../styles/news.module.scss'
import typographicBase from 'typographic-base'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node

  const years = props.data.allContentfulNews.edges
    .map(({ node }) => new Date(node.date).getUTCFullYear())
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
    .reverse()

  const news = {}

  years.map(year => {
    news[year] = props.data.allContentfulNews.edges
      .filter(({ node }) => new Date(node.date).getUTCFullYear() === year)
  })

  return (
    <Container>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      {years.map(year => {
        return (
      <section className={styles.contentWrapper} key={year}>
        <h1 className={styles.stickyHeading}>{year}</h1>

        <ol className={styles.list}>
        {news[year].map(({ node }) =>
        <LazyLoad height='100vh' key={node.id} offset={250} once>
          <li className={styles.content} key={node.id}>
            <h1 className={styles.heading}>{typographicBase(node.title, { locale: 'en-us'})}</h1>

            <h2 className={styles.caption}>{dateformat(node.date, 'mmmm d, yyyy')}</h2>

            <div className={styles.paragraphWrapper} dangerouslySetInnerHTML={{ __html: marked(typographicBase(node.content.content, { locale: 'en-us'})) }} />
          </li>
        </LazyLoad>
        )}
        </ol>
      </section>
        )
      })}
    </Container>
  )
}

export const query = graphql`
  query NewsQuery {
    allContentfulPage(
      filter: {
        slug: {
          eq: "/news"
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

    allContentfulNews(
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
          content {
            id
            content
          }
        }
      }
    }
  }
`
