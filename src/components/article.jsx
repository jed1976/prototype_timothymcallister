import { Caption, Heading, Paragraph } from '../components/typography'

import { Container } from '../components/layout'
import Mailto from 'react-protected-mailto'
import PropTypes from 'prop-types'
import React from 'react'
import dateformat from 'dateformat'
import styles from '../styles/article.module.scss'

const Article = props => {
  return (
    <article className={`${styles.article} ${props.className}`}>
      <Container>
        <Heading content={props.title} />
        <Caption content={dateformat(props.date, 'mmmm d, yyyy')} />

        {props.content.split('\n\n').map(paragraphs =>
          <Paragraph content={paragraphs} />
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
