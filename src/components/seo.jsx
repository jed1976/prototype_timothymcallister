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

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={`@${config.twitter_username}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />

      {/* Open Graph */}
      <meta property="og:site_name" content={config.title} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={props.description} />
      {props.image ? <meta property="og:image" content={props.image} /> : '' }
    </Helmet>
  )
}

SEO.PropTypes = {
  description: PropTypes.string,
  image: PropTypes.image,
  slug: PropTypes.string,
  title: PropTypes.string,
}

export default SEO
