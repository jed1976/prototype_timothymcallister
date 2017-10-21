import Logo from '../components/logo'
import PropTypes from 'prop-types'
import React from 'react'
import { Subtitle } from '../components/typography'
import styles from '../styles/layout.module.scss'

// Page -> Wrapper -> Section -> Container

// Page
const Page = props => {
  return (
  <main className={styles.page}>
    {props.hideLogo ? '' : <Logo size={props.logoSize} theme={props.theme}></Logo> }
    {props.children}
  </main>
  )
}

Page.PropTypes = {
  hideLogo: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light']),
}

Page.defaultProps = {
  hideLogo: false,
  theme: 'dark'
}

// Wrapper
class Wrapper extends React.Component {

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
class Section extends React.Component {

  scrollIntoView() {
    this.section.scrollIntoView()
  }

  render() {
    return (
    <div
      className={`${styles.section} ${this.props.className}`}
      data-center={this.props.centerContent}
      data-padding={this.props.padding}
      data-sticky={this.props.sticky}
      data-theme={this.props.theme}
      ref={section => this.section = section}
    >
      {this.props.title !== ''
        ? <Subtitle content={this.props.title} />
        : ''
      }

      {this.props.children}
    </div>
    )
  }
}

Section.PropTypes = {
  centerContent: PropTypes.bool,
  padding: PropTypes.bool,
  sticky: PropTypes.bool,
  theme: PropTypes.oneOf(['light', 'dark']),
  title: PropTypes.string,
}

Section.defaultProps = {
  centerContent: false,
  padding: false,
  sticky: false,
  theme: 'light',
  title: ''
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
