import React from 'react'
import Container from '../components/container'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Link from 'gatsby-link'
import Mailto from 'react-protected-mailto'
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

          <article className={styles.content}>
            {node.name ? <h2 className={styles.heading}>{node.name}</h2> : ''}
            {node.role ? <h3 className={styles.caption}>{node.role}</h3> : ''}
            {node.organization ? <h4 className={styles.heading2}>{node.organization}</h4> : ''}
            {node.unit ? <h4 className={styles.heading2}>{node.unit}</h4> : ''}

            <address className={styles.address}>
              <div>{node.address1}</div>
              {node.address2 ? <div>{node.address2}</div> : ''}
              <div>{node.city}, {node.state} {node.zipCode}</div>
            </address>

            <footer className={styles.detailFooter}>
              <Mailto className={styles.link} email={node.emailAddress} />
            </footer>
          </article>
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
