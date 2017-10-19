import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'
import { Title } from '../components/typography'
import styles from '../styles/hero.module.scss'

const Hero = props => {
  return (
    <header className={`${styles.image} ${props.className}`}>
    {props.image
      ? <Img
        outerWrapperClassName={styles.imageWrapper}
        resolutions={props.image}
        style={{ height: '100%', width: '100%' }}
        />
      : ''
    }

    {props.title
      ? <div className={styles.titleWrapper}>
          <Title className={styles.title} content={props.title} />
        </div>
      : ''
    }
    </header>
  )
}

Hero.PropTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}

export default Hero
