import { Caption, Heading, Paragraph, Subtitle } from '../components/typography'
import { Container, Page, Section, Wrapper } from '../components/layout'

import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Link from 'gatsby-link'
import { Quote } from '../components/typography'
import React from 'react'

export default (props) => {
  const pageData = props.data.contentfulPage
  const quote = props.data.contentfulQuote

  return (
    <Page theme="light">
      <Helmet>
        <title>{pageData.title} - {props.data.site.siteMetadata.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <Wrapper>
        <Section centerContent padding theme="light">
          <Quote author={quote.author} quote={quote.quote.quote} source={quote.source} />
        </Section>
      </Wrapper>
    </Page>
  )
}

export const query = graphql`
  query PageNotFoundQuery {
    site {
      siteMetadata {
        siteUrl
        title
      }
    },

    contentfulPage(
      slug: {
        eq: "/404"
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

    contentfulQuote(tags: { eq:"404"}) {
      quote {
        id
        quote
      }
      author
      source
    }
  }
`
