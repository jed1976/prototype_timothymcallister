import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/quote.module.scss'
import typographicBase from 'typographic-base'

const Quote = props => {
  return (
    <blockquote className={styles.blockquote}>
      <p className={styles.quote}>{typographicBase(props.quote, { locale: 'en-us' })}</p>
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
