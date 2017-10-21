import { Page, Section, Wrapper } from '../components/layout'

import Helmet from 'react-helmet'
import Hero from '../components/hero'
import LazyLoad from 'react-lazyload'
import Link from 'gatsby-link'
import { Quote } from '../components/typography'
import React from 'react'

export default (props) => {
  const pageData = props.data.contentfulPage
  const quotes = props.data.allContentfulQuote.edges

  return (
    <Page>
      <Helmet>
        <title>{pageData.title} - {props.data.site.siteMetadata.title}</title>
        <meta name="description" content={pageData.description.description} />
        <link rel="canonical" href={`${props.data.site.siteMetadata.siteUrl}${pageData.slug}`} />
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <Wrapper>
        <Section centerContent padding theme="light">
        {quotes.map(({ node }, index) =>
          <Quote
            author={node.author}
            key={index}
            quote={node.quote.quote}
            spacing="large"
            source={node.source} />
        )}
        </Section>
      </Wrapper>
    </Page>
  )
}

export const query = graphql`
  query ApplauseQuery {
    site {
      siteMetadata {
        siteUrl
        title
      }
    },

    contentfulPage(
      slug: {
        eq: "/applause"
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

    allContentfulQuote(
      filter: {
      	tags: {
          eq: null
        }
    	},
      sort: {
        fields: [date],
        order: DESC
      }
    ) {
      edges {
        node {
          id
          quote {
            id
            quote
          }
          author
          source
          tags
        }
      }
    }
  }
`
