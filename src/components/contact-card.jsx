import React from 'react'
import Mailto from 'react-protected-mailto'
import PropTypes from 'prop-types'
import styles from '../styles/contactCard.module.scss'
import typographicBase from 'typographic-base'

const ContactCard = props => {
  return (
    <article className={`${styles.card} ${props.className}`}>
      {props.name ? <h2 className={styles.heading}>{props.name}</h2> : ''}
      {props.role ? <h3 className={styles.caption}>{props.role}</h3> : ''}
      {props.organization ? <h4 className={styles.heading2}>{props.organization}</h4> : ''}
      {props.unit ? <h4 className={styles.heading2}>{props.unit}</h4> : ''}

      <address className={styles.address}>
        <div>{props.address1}</div>
        {props.address2 ? <div>{props.address2}</div> : ''}
        <div>{props.city}, {props.state} {props.zipCode}</div>
      </address>

      <footer className={styles.detailFooter}>
        <Mailto className={styles.link} email={props.emailAddress} />
      </footer>
    </article>
  )
}

ContactCard.PropTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  organization: PropTypes.string,
  unit: PropTypes.string,
  address1: PropTypes.string,
  address2: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.string,
  emailAddress: PropTypes.string,
}

export default ContactCard
