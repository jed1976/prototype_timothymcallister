import React from 'react'
import ContactCard from '../components/contact-card'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Link from 'gatsby-link'
import styles from '../styles/contact.module.scss'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node
  const contactInfo = props.data.allContentfulContactInfo.edges

  return (
    <Container>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <div className={styles.contentWrapper}>
        <ol className={styles.list}>
        {contactInfo.map(({ node }) =>
        <li className={styles.item} key={node.id}>
          <h1 className={styles.stickyHeading}>{node.title}</h1>

          <ContactCard
            className={styles.content}
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
        </li>
        )}
        </ol>
      </div>
    </Container>
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
