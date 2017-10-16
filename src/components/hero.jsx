import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styles from '../styles/hero.module.scss'

const Hero = props => {
  return (
    <header className={`${styles.image} ${props.className}`}>
      <Img        
        outerWrapperClassName={styles.imageWrapper}
        resolutions={props.image}
        style={{ height: '100%', width: '100%' }}
      />

      {props.title ? <div className={styles.titleWrapper}><h1 className={styles.title}>{props.title}</h1></div> : '' }
    </header>
  )
}

Hero.PropTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}

export default Hero
