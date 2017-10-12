import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styles from '../styles/logo.module.scss'

const Logo = props => {
  return (
    <header className={styles.header} data-size={props.size}>
      <h1 className={styles.logo} title="Main Menu">
        <Link className={styles.link} to="/">
          <span className={styles.title}>Timothy M
            <span className={styles.lowerCase}>c</span>Allister
          </span>
          <span className={styles.subtitle}>Saxophonist</span>
        </Link>
      </h1>
    </header>
  )
}

Logo.PropTypes = {
  size: PropTypes.string,
}

export default Logo
