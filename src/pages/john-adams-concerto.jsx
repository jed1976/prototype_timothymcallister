import React from 'react'
import ContactCard from '../components/contact-card'
import Container from '../components/container'
import dateformat from 'dateformat'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import LazyLoad from 'react-lazyload'
import Link from 'gatsby-link'
import marked from 'marked'
import Quote from '../components/quote'
import Recording from '../components/recording'
import applauseStyles from '../styles/applause.module.scss'
import styles from '../styles/johnAdamsConcerto.module.scss'
import typographicBase from 'typographic-base'

export default (props) => {
  const pageData = props.data.allContentfulPage.edges[0].node
  const bookingContact = props.data.contentfulContactInfo
  const recording = props.data.contentfulRecording
  const interviewLinks = props.data.allContentfulInterviewLink.edges
  const quotes = props.data.allContentfulQuote.edges

  let intro = pageData.description.description
  intro = typographicBase(intro, { locale: 'en-us' })
  const dropCap = `<span class=${styles.dropCap}><em>${intro.substr(0, 1)}</em></span>`
  intro = intro.replace(/^\w/, dropCap)

  return (
    <Container>
      <Helmet>
        <title>{pageData.title}</title>
      </Helmet>

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <div className={styles.contentWrapper}>
        <header className={styles.intro}>
          <div
            className={styles.paragraphWrapper}
            dangerouslySetInnerHTML={{ __html: marked(intro) }} />
        </header>

        <section className={styles.lightSection}>
          <h2 className={styles.stickyHeading}>Booking</h2>

          <div className={styles.cardContent}>
            <ContactCard
              className={styles.contactCard}
              name={bookingContact.name}
              role={bookingContact.role}
              organization={bookingContact.organization}
              unit={bookingContact.unit}
              address1={bookingContact.address1}
              address2={bookingContact.address2}
              city={bookingContact.city}
              state={bookingContact.state}
              zipCode={bookingContact.zipCode}
              emailAddress={bookingContact.emailAddress}
            />
          </div>
        </section>

        <section className={styles.videoSection}>
          <div className={styles.videoWrapper}>
            <LazyLoad height='100vh' offset={250}>
              <iframe allowfullscreen className={styles.video} src="https://www.youtube-nocookie.com/embed/ChiynCzpuYQ?hd=1&amp;rel=0&amp;showinfo=0"></iframe>
            </LazyLoad>
          </div>
        </section>

        <LazyLoad height='100vh' offset={250}>
          <Recording
            date={recording.date}
            description={recording.description.description}
            id={recording.id}
            imageSrc={recording.image.responsiveResolution}
            media={recording.media.file.url}
            recordingUrl={recording.recordingUrl}
            title={recording.title}
          />
        </LazyLoad>

        <section className={styles.lightSection}>
          <h3 className={styles.stickyHeading}>Features</h3>

          <div className={styles.content}>
            <ol className={styles.list}>
              {interviewLinks.map(({ node }) =>
              <li className={styles.item} key={node.id}>
                <h1 className={styles.heading}>{typographicBase(node.title, { locale: 'en-us'})}</h1>

                <h2 className={styles.caption}>{dateformat(node.date, 'mmmm d, yyyy')}</h2>

                <footer className={styles.detailFooter}>
                  <a className={styles.link} href={node.link}>{node.source}</a>
                </footer>
              </li>
              )}
            </ol>
          </div>
        </section>

        <section className={applauseStyles.contentWrapper}>
          <div className={applauseStyles.content}>
            <ol className={styles.list}>
            {quotes.map(({ node }, index) =>
            <LazyLoad height='100vh' key={node.id} offset={250} once>
              <li className={applauseStyles.quote}>
                <Quote
                  author={node.author}
                  quote={node.quote.quote}
                  source={node.source}>
                </Quote>
              </li>
            </LazyLoad>
            )}
            </ol>
          </div>
        </section>
      </div>
    </Container>
  )
}

export const query = graphql`
  query JohnAdamsConcertoQuery {
    allContentfulPage(
      filter: {
        slug: {
          eq: "/john-adams-concerto"
        }
      }
    ) {
      edges {
        node {
          id
          title
          description {
            id
            description
          }
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

    contentfulContactInfo(tags: { eq: "adams" }) {
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
    },

    contentfulRecording(id: {eq: "c5oRGkOLaSsSMUcimIs6Y2"}) {
      id
      title
      date
      image {
        id
        responsiveResolution {
          aspectRatio
          base64
          src
          srcSet
        }
      }
      media {
        file {
          url
          fileName
          contentType
        }
      }
      recordingUrl
      description {
        id
        description
      }
    },

    allContentfulInterviewLink {
      edges {
        node {
          id
          title
          date
          source
          link
        }
      }
    },

    allContentfulQuote(filter: {tags: {eq: "adams"}}, sort: {fields: [date], order: DESC}) {
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
