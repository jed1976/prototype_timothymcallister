import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styles from './logo.module.scss'

const Logo = props => {
  return (
    <header className={styles.header} data-size={props.size} style={{ color: props.color }}>
      <h1 className={styles.logo} title="Main Menu">
        <Link className={styles.link} to="/">
          <span className={styles.title} data-size={props.size}>Timothy M
            <span className={styles.lowerCase}>c</span>Allister
          </span>
          <span className={styles.subtitle} data-size={props.size}>Saxophonist</span>
        </Link>
      </h1>
    </header>
  )
}

Logo.PropTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default Logo
