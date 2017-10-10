import React from 'react'
import Logo from '../components/logo'
import PropTypes from 'prop-types'
import styles from '../styles/container.module.scss'

const Container = props => {
  return (
  <section className={styles.container} style={{ backgroundColor: props.backgroundColor }}>
    {!props.hideLogo ? <Logo color={props.logoColor} size={props.logoSize}></Logo> : '' }

    <div style={{ color: props.foregroundColor }}>
      {props.children}
    </div>
  </section>
  )
}

Container.PropTypes = {
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
  logoColor: PropTypes.string,
  logoIsVisible: PropTypes.bool,
}

export default Container
