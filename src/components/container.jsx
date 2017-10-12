import React from 'react'
import Logo from '../components/logo'
import PropTypes from 'prop-types'
import styles from '../styles/container.module.scss'

const Container = props => {
  return (
  <section className={styles.container}>
    {!props.hideLogo ? <Logo size={props.logoSize}></Logo> : '' }
    {props.children}
  </section>
  )
}

Container.PropTypes = {
  logoIsVisible: PropTypes.bool,
}

export default Container
