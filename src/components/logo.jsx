import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styles from '../styles/logo.module.scss'

const Logo = props => {
  return (
    <header className={styles.header} data-size={props.size}>
      <Link className={styles.link} to="/">
        <h2 className={styles.title}>Timothy M
          <span className={styles.lowerCase}>c</span>Allister
        </h2>
        <h6 className={styles.subtitle}>Saxophonist</h6>
      </Link>
    </header>
  )
}

Logo.PropTypes = {
  size: PropTypes.string,
}

export default Logo
