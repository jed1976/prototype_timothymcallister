import { Caption, Heading, Paragraph, Subtitle } from '../components/typography'
import { Container, Page, Section, Wrapper } from '../components/layout'

import ContactCard from '../components/contact-card'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import InfoCard from '../components/info-card'
import LazyLoad from 'react-lazyload'
import { Quote } from '../components/typography'
import React from 'react'
import Recording from '../components/recording'
import SEO from '../components/seo'
import config from '../../data/site'
import dateformat from 'dateformat'
import styles from '../styles/johnAdamsConcerto.module.scss'

export default (props) => {
  const bookingContact = props.data.contentfulContactInfo
  const interviewLinks = props.data.allContentfulInterviewLink.edges
  const pageData = props.data.contentfulPage
  const quotes = props.data.allContentfulQuote.edges
  const recording = props.data.contentfulRecording

  return (
    <Page>
      <SEO
        description={pageData.description.description}
        image={pageData.image.responsiveSizes.src}
        slug={pageData.slug}
        title={pageData.title} />

      <Hero image={pageData.image.responsiveSizes} title={pageData.title} />

      <Wrapper>
        <Section centerContent padding theme="dark">
          <Container width="regular">
            <Paragraph callout content={pageData.description.description} dropCap />
          </Container>
        </Section>

        <Section padding theme="light" title="Booking">
          <Container>
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
          </Container>
        </Section>

        <Section centerContent padding theme="dark">
          <Container className={styles.videoWrapper} width="full">
            <LazyLoad height='100vh' offset={250}>
              <iframe allowFullScreen className={styles.video} src="https://www.youtube-nocookie.com/embed/ChiynCzpuYQ?hd=1&amp;rel=0&amp;showinfo=0"></iframe>
            </LazyLoad>
          </Container>
        </Section>

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

        <Section padding theme="light" title="Features">
          <Container>
          {interviewLinks.map(({ node }) =>
          <InfoCard
            footerItems={[ { url: node.link, title: node.source }]}
            key={node.id}
            title={node.title}
            spacing="large"
            subtitle={dateformat(node.date, config.dateFormat)} />
          )}
          </Container>
        </Section>

        <Section padding theme="dark" title="Reviews">
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
  query JohnAdamsConcertoQuery {
    contentfulPage(
      slug: {
        eq: "/john-adams-concerto"
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
