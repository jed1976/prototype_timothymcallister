import PropTypes from 'prop-types'
import React from 'react'
import marked from 'marked'
import styles from '../styles/typography.module.scss'
import typographicBase from 'typographic-base'

// Section Heading
const SectionHeading = props => {
  const CustomTag = `h${props.level}`

  return <CustomTag className={`${styles[props.class]} ${props.className}`} dangerouslySetInnerHTML={{ __html: typographicBase(props.content.toString(), { locale: 'en-us'}) }} />
}

SectionHeading.PropTypes = {
  class: PropTypes.string,
  level: PropTypes.number,
  content: PropTypes.string,
}

SectionHeading.defaultProps = {
  class: 'title',
  level: 1,
  content: 'Content',
}


const Title = props => {
  return <SectionHeading {...props} class="title" level="1" content={props.content} />
}

const Subtitle = props => {
  return <SectionHeading {...props} class="subtitle" level="2" content={props.content} />
}

const Heading = props => {
  return <SectionHeading {...props} class="heading" level="3" content={props.content} />
}

const Heading2 = props => {
  return <SectionHeading {...props} class="heading2" level="4" content={props.content} />
}

const Caption = props => {
  return <SectionHeading {...props} class="caption" level="5" content={props.content} />
}


// Paragraph
const renderer = new marked.Renderer()
renderer.paragraph = (text) => {
  return text
}

const Paragraph = props => {
  let content = marked(typographicBase(props.content, { locale: 'en-us'}), { renderer: renderer })

  if (props.dropCap) {
    const dropCap = `<span class=${styles.dropCap}><em>${content.substr(0, 1)}</em></span>`
    content = content.replace(/^\w/, dropCap)
  }

  return <p className={`${styles.paragraph} ${props.className}`} dangerouslySetInnerHTML={{ __html: content.toString() }} data-callout={props.callout} />
}

Paragraph.PropTypes = {
  callout: PropTypes.bool,
  content: PropTypes.string,
  dropCap: PropTypes.bool,
}

Paragraph.defaultProps = {
  callout: false,
  content: 'Paragraph',
  dropCap: false,
}


// Quote
const Quote = props => {
  return (
    <blockquote className={`${styles.blockquote} ${props.className}`} data-spacing={props.spacing}>
      <Paragraph className={styles.quote} content={props.quote} />
      <h5 className={styles.author}>{typographicBase(props.author, { locale: 'en-us' })}</h5>
      {props.source ? <h6 className={styles.source}>{typographicBase(props.source, { locale: 'en-us' })}</h6> : '' }
    </blockquote>
  )
}

Quote.PropTypes = {
  author: PropTypes.string,
  quote: PropTypes.string,
  source: PropTypes.string,
  spacing: PropTypes.oneOf(['small', 'medium', 'large']),
}

Quote.defaultProps = {
  author: 'Author',
  quote: 'Quote',  
  spacing: 'medium'
}


export { Title, Subtitle, Heading, Heading2, Caption, Paragraph, Quote }
