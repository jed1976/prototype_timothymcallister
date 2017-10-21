import { Caption, Heading, Paragraph } from '../components/typography'

import { Container } from '../components/layout'
import Mailto from 'react-protected-mailto'
import PropTypes from 'prop-types'
import React from 'react'
import config from '../../data/site'
import dateformat from 'dateformat'
import styles from '../styles/article.module.scss'

const Article = props => {
  return (
    <article className={`${styles.article} ${props.className}`}>
      <Container>
        <Heading content={props.title} />
        <Caption content={dateformat(props.date, config.dateFormat)} />

        {props.content.split('\n\n').map((paragraphs, index) =>
          <Paragraph content={paragraphs} key={index} />
        )}
      </Container>
    </article>
  )
}

Article.PropTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
}

Article.defaultProps = {
  title: 'Title',
  date: 'Date',
  content: 'Content',
}

export default Article
