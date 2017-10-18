import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import styles from '../styles/quote.module.scss'
import typographicBase from 'typographic-base'

const Quote = props => {
  return (
    <blockquote className={styles.blockquote}>
      <div className={styles.quote} dangerouslySetInnerHTML={{ __html: marked(typographicBase(props.quote, { locale: 'en-us'})) }} />      
      <p className={styles.author}>{typographicBase(props.author, { locale: 'en-us' })}</p>
      {props.source ? <p className={styles.source}>{typographicBase(props.source, { locale: 'en-us' })}</p> : '' }
    </blockquote>
  )
}

Quote.PropTypes = {
  author: PropTypes.string,
  source: PropTypes.string,
  quote: PropTypes.string,
}

export default Quote
