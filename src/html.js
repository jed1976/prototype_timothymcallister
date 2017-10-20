import React from 'react'
import appleTouchIcon from './images/apple-touch-icon.png'
import favicon from './images/favicon.ico'
import favicon16 from './images/favicon-16x16.png'
import favicon32 from './images/favicon-32x32.png'
import safariPinnedTab from './images/safari-pinned-tab.svg'

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }
    return (
      <html>
        <head>
          {/* Meta */}
          <meta charSet="utf-8" />
          <meta name="referrer" content="origin" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="apple-mobile-web-app-title" content="Timothy McAllister" />
          <meta name="application-name" content="Timothy McAllister" />

          {/* Links */}
          <link rel="shortcut icon" href={favicon} />
          <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
          <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
          <link rel="mask-icon" href={safariPinnedTab} color="#ff6347" />

          {this.props.headComponents}
          {css}
        </head>
        <body>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
