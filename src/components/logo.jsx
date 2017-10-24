import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles/logo.module.scss'

const Logo = props => {
  return (
    <nav className={styles.logo} data-size={props.size} data-theme={props.theme}>
      <Link className={styles.link} to="/">
        <h2 className={styles.title}>Timothy M
          <span className={styles.lowerCase}>c</span>Allister
        </h2>
        <h6 className={styles.subtitle}>Saxophonist</h6>
      </Link>
    </nav>
  )
}

Logo.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  theme: PropTypes.oneOf(['dark', 'light']),
}

Logo.defaultProps = {
  size: 'small',
  theme: 'dark'
}

export default Logo
