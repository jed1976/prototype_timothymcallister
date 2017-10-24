import { Caption, Heading, Heading2 } from '../components/typography'

import List from '../components/list'
import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles/contactCard.module.scss'

const ContactCard = props => {
  return (
    <article className={`${styles.card} ${props.className}`}>
      {props.name ? <Heading content={props.name} /> : ''}
      {props.role ? <Caption className={styles.caption} content={props.role} /> : ''}
      {props.organization ? <Heading2 className={styles.heading2} content={props.organization} /> : ''}
      {props.unit ? <Heading2 className={styles.heading2} content={props.unit} /> : ''}

      <address className={styles.address}>
        <div>{props.address1}</div>
        {props.address2 ? <div>{props.address2}</div> : ''}
        <div>{props.city}, {props.state} {props.zipCode}</div>
      </address>

      <List items={[ { url: props.emailAddress, mailto: true, title: props.emailAddress } ]} />
    </article>
  )
}

ContactCard.propTypes = {
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
