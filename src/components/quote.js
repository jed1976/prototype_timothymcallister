import React from 'react'
import PropTypes from 'prop-types'
import styles from './quote.module.scss'

const Quote = props => {
  return (
    <blockquote className={styles.blockquote}>
      <p className={styles.quote}>{props.quote}</p>
      <p className={styles.author}>{props.author}</p>
      {props.source ? <p className={styles.source}>{props.source}</p> : '' }
    </blockquote>
  )
}

Quote.PropTypes = {
  author: PropTypes.string,
  source: PropTypes.string,
  quote: PropTypes.string,
}

export default Quote
