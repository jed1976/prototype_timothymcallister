import { Caption, Heading } from '../components/typography'

import List from '../components/list'
import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles/infoCard.module.scss'

const InfoCard = props => {
  return (
    <article className={`${styles.infoCard} ${props.className}`} data-spacing={props.spacing}>
      <Heading content={props.title} />
      <Caption content={props.subtitle} />
      <List items={props.footerItems} />
    </article>
  )
}

InfoCard.PropTypes = {
  footerItems: PropTypes.arrayOf(PropTypes.object),
  spacing: PropTypes.oneOf(['small', 'medium', 'large']),
  subtitle: PropTypes.string,
  title: PropTypes.string,
}

InfoCard.defaultProps = {
  footerItems: [],
  spacing: 'medium',
  subtitle: 'Subtitle',
  title: 'Title',
}

export default InfoCard
