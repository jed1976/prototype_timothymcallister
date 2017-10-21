import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'
import config from '../../data/site'

const SEO = props => {
  const title = props.slug === '/'
    ? config.title
    : `${props.title} - ${config.title}`

  const url = `${config.siteUrl}${props.slug}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={props.description} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}

SEO.PropTypes = {
  description: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
}

export default SEO
