import { Container, Page, Section, Wrapper } from '../components/layout'

import ContactCard from '../components/contact-card'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import React from 'react'
import { Subtitle } from '../components/typography'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node
  const contactInfo = props.data.allContentfulContactInfo.edges

  return (
    <Page>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <Wrapper>
        {contactInfo.map(({ node }, index) => {
          const theme = index % 2 === 0 ? `light` : `dark`

          return (
        <Section key={index} padding theme={theme} title={node.title}>
          <Container>
            <ContactCard
              name={node.name}
              role={node.role}
              organization={node.organization}
              unit={node.unit}
              address1={node.address1}
              address2={node.address2}
              city={node.city}
              state={node.state}
              zipCode={node.zipCode}
              emailAddress={node.emailAddress}
            />
          </Container>
        </Section>
        )
      })}
      </Wrapper>
    </Page>
  )
}

export const query = graphql`
  query ContactQuery {
    allContentfulPage(
      filter: {
        slug: {
          eq: "/contact"
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

    allContentfulContactInfo(
      filter: {
        tags: {
          eq: null
        }
      },
      sort: {
        fields: [title]
      }
    ) {
      edges {
        node {
          id
          title
          name
          role
          organization
          unit
          address1
          address2
          city
          state
          zipCode
          emailAddress
        }
      }
    }
  }
`
