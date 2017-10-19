import { Caption, Heading } from '../components/typography'

import Mailto from 'react-protected-mailto'
import PropTypes from 'prop-types'
import React from 'react'
import styles from '../styles/list.module.scss'

const List = props => {
  return (
    <ul className={`${styles.list} ${props.className}`}>
      {props.items.map((item, index) => {
        let content = item.title

        if (item.url) {
          content = <a className={styles.link} download={item.download} href={item.url}>{item.title}</a>

          if (item.mailto)
            content = <Mailto className={styles.link} email={item.url} />
        }

        return (
        <li className={styles.item} key={index}>{content}</li>
        )
      }
      )}
    </ul>
  )
}

List.PropTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}

List.defaultProps = {
  items: [],
}

export default List
