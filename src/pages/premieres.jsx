import { Container, Page, Section, Wrapper } from '../components/layout'

import Helmet from 'react-helmet'
import Hero from '../components/hero'
import InfoCard from '../components/info-card'
import Link from 'gatsby-link'
import React from 'react'
import { Subtitle } from '../components/typography'

export default (props) => {
  const pageData = props.data.contentfulPage

  const years = props.data.allContentfulPremiere.edges
    .map(({ node }) => new Date(node.date).getUTCFullYear())
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
    .reverse()

  const premieres = {}

  years.map(year => {
    premieres[year] = props.data.allContentfulPremiere.edges
      .filter(({ node }) => new Date(node.date).getUTCFullYear() === year)
  })

  return (
    <Page>
      <Helmet>
        <title>{pageData.title} - {props.data.site.siteMetadata.title}</title>
        <meta name="description" content={pageData.description.description} />
        <link rel="canonical" href={`${props.data.site.siteMetadata.siteUrl}${pageData.slug}`} />
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <Wrapper padding>
        {years.map((year, index) => {
          const theme = index % 2 === 0 ? `light` : `dark`

          return (
        <Section key={year} padding theme={theme} title={year}>
          <Container>
          {premieres[year].map(({ node }) => {
            return (
            <InfoCard
              footerItems={[ { title: node.category }]}
              key={node.id}
              spacing="large"
              subtitle={node.composer}
              title={node.title}  />
            )
          })}
          </Container>
        </Section>
          )
        })}
      </Wrapper>
    </Page>
  )
}

export const query = graphql`
  query PremieresQuery {
    site {
      siteMetadata {
        siteUrl
        title
      }
    },

    allContentfulPremiere(sort: { fields: [date, title], order: DESC }) {
      edges {
        node {
          id
          title
          date
          composer
          category
        }
      }
    },

    contentfulPage(
      slug: {
        eq: "/premieres"
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
