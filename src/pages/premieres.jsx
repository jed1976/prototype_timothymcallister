import { Container, Page, Section, Wrapper } from '../components/layout'

import Helmet from 'react-helmet'
import Hero from '../components/hero'
import InfoCard from '../components/info-card'
import Link from 'gatsby-link'
import React from 'react'
import { Subtitle } from '../components/typography'
import styles from '../styles/premieres.module.scss'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node

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
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <Wrapper padding>
        {years.map((year, index) => {
          const theme = index % 2 === 0 ? `light` : `dark`

          return (
        <Section key={year} padding theme={theme}>
          <Subtitle content={year} />

          {premieres[year].map(({ node }) => {
            return (
            <Container key={node.id}>
              <InfoCard title={node.title} spacing="large" subtitle={node.composer} footerItems={[ { title: node.category }]} />
            </Container>
            )
          })}
        </Section>
          )
        })}
      </Wrapper>
    </Page>
  )
}

export const query = graphql`
  query PremieresQuery {
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

    allContentfulPage(
      filter: {
        slug: {
          eq: "/premieres"
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
