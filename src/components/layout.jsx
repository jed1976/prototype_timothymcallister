import Logo from '../components/logo'
import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles/layout.module.scss'

// Page -> Wrapper -> Section -> Container

// Page
const Page = props => {
  return (
  <main className={styles.page}>
    {props.hideLogo ? '' : <Logo size={props.logoSize}></Logo> }
    {props.children}
  </main>
  )
}

Page.PropTypes = {
  hideLogo: PropTypes.bool,
}

Page.defaultProps = {
  hideLogo: false
}

// Wrapper
class Wrapper extends React.Component {

  constructor(props) {
    super(props)
  }

  scrollIntoView() {
    this.wrapper.scrollIntoView()
  }

  render() {
    return (
      <div className={`${styles.wrapper} ${this.props.className}`} ref={wrapper => this.wrapper = wrapper}>
        {this.props.children}
      </div>
    )
  }
}


// Section
const Section = props => {
  return (
  <div
    className={`${styles.section} ${props.className}`}
    data-center={props.centerContent}
    data-padding={props.padding}
    data-sticky={props.sticky}
    data-theme={props.theme}>
    {props.children}
  </div>
  )
}

Section.PropTypes = {
  centerContent: PropTypes.bool,
  padding: PropTypes.bool,
  sticky: PropTypes.bool,
  theme: PropTypes.oneOf(['light', 'dark']),
}

Section.defaultProps = {
  centerContent: false,
  padding: false,
  sticky: false,
  theme: 'light'
}


// Container
const Container = props => {
  return (
  <div
    className={`${styles.container} ${props.className}`}
    data-theme={props.theme}
    data-width={props.width}
  >
    {props.children}
  </div>
  )
}

Container.PropTypes = {
  width: PropTypes.oneOf(['full', 'narrow', 'regular', 'wide']),
}

Container.defaultProps = {
  width: 'narrow'
}


export { Page, Wrapper, Section, Container }
