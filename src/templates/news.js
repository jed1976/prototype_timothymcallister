import { Caption, Heading, Paragraph } from '../components/typography'
import { Container, Page, Section, Wrapper } from '../components/layout'

import Article from '../components/article'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import React from 'react'

export default (props) => {
  const node = props.data.contentfulNews

  return (
    <Page>
      <Helmet>
        <title>{node.title}</title>
      </Helmet>

      <Wrapper style={{ zIndex: 0 }}>
        <Section centerContent padding theme="light">
          <Article content={node.content.content} date={node.date} title={node.title} />
        </Section>
        )
        })}
      </Wrapper>
    </Page>
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
