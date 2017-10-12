import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/hero.module.scss'

const Hero = props => {
  return (
  <header className={styles.image} style={{ backgroundImage: `url(${props.image})` }}>
    <h1 className={styles.title}>{props.title}</h1>
  </header>
  )
}

Hero.PropTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}

export default Hero
