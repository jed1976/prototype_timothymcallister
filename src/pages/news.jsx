import { Caption, Heading, Paragraph, Subtitle } from '../components/typography'
import { Container, Page, Section, Wrapper } from '../components/layout'

import Article from '../components/article'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import LazyLoad from 'react-lazyload'
import Link from 'gatsby-link'
import React from 'react'

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
    <Page>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <Wrapper>
        {years.map((year, index) => {
          const theme = index % 2 === 0 ? `light` : `dark`

          return (
        <Section padding key={year} theme={theme} title={year}>
          {news[year].map(({ node }) =>
          <Article
            content={node.content.content}
            date={node.date}
            key={node.id}
            title={node.title} />
          )}
        </Section>
        )
        })}
      </Wrapper>
    </Page>
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
          fields {
            slug
          }
        }
      }
    }
  }
`
