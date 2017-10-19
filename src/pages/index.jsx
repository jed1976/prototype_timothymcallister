import { Container, Page, Section, Wrapper } from '../components/layout'

import Helmet from 'react-helmet'
import Hero from '../components/hero'
import List from '../components/list'
import Logo from '../components/logo'
import React from 'react'
import styles from '../styles/index.module.scss'

export default class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const routeAction = window.localStorage.getItem('routeAction')

    setTimeout(() => {
      if (routeAction === 'PUSH') {
        this.textContainer.scrollIntoView()
      } else {
        window.scrollTo(0, 0)
      }
    }, 50)
  }

  render() {
    const pageData = this.props.data.allContentfulPage.edges[0].node
    const menuItems = this.props.data.allContentfulPage.edges
      .filter(({ node}) => node.order > 0)
      .map(({ node }) => ({ url: node.slug, title: node.title }))

    return (
      <Page hideLogo>
        <Helmet>
          <title>{pageData.title}</title>
        </Helmet>

        <Wrapper className={styles.section}>
          <Hero className={styles.image} image={pageData.image.responsiveSizes} />

          <Section className={styles.nav} ref={(textContainer) => this.textContainer = textContainer} theme="dark">
            <Container className={styles.content}>
              <Logo size="large"></Logo>

              <nav className={styles.menu}>
                <List className={styles.menuList} items={menuItems} />
              </nav>

              <footer className={styles.socialFooter}>
                <a href={this.props.data.site.siteMetadata.facebook}>
                  <svg className={styles.socialIcon} viewBox="0 0 16 37">
                    <path d="M16,6 L13,6 C10.855469,6 10,6.503906 10,8 L10,11 L16,11 L15,17 L10,17 L10,37 L3,37 L3,17 L0,17 L0,11 L3,11 L3,8 C3,3.324219 4.582031,0 10,0 C12.902344,0 16,1 16,1 L16,6 Z"></path>
                  </svg>
                </a>

                <a href={this.props.data.site.siteMetadata.twitter}>
                  <svg className={styles.socialIcon} viewBox="0 0 50 42">
                    <path d="M51.0625,5.4375 C49.214844,6.257813 47.234375,6.808594 45.152344,7.058594 C47.277344,5.785156 48.910156,3.769531 49.675781,1.371094 C47.691406,2.546875 45.484375,3.402344 43.144531,3.863281 C41.269531,1.863281 38.597656,0.617188 35.640625,0.617188 C29.960938,0.617188 25.355469,5.21875 25.355469,10.898438 C25.355469,11.703125 25.449219,12.488281 25.625,13.242188 C17.078125,12.8125 9.503906,8.71875 4.429688,2.496094 C3.542969,4.019531 3.039063,5.785156 3.039063,7.667969 C3.039063,11.234375 4.851563,14.382813 7.613281,16.230469 C5.925781,16.175781 4.339844,15.710938 2.953125,14.941406 C2.953125,14.984375 2.953125,15.027344 2.953125,15.070313 C2.953125,20.054688 6.5,24.207031 11.199219,25.15625 C10.339844,25.390625 9.429688,25.515625 8.492188,25.515625 C7.828125,25.515625 7.183594,25.453125 6.554688,25.328125 C7.867188,29.410156 11.664063,32.390625 16.160156,32.472656 C12.644531,35.230469 8.210938,36.871094 3.390625,36.871094 C2.558594,36.871094 1.742188,36.824219 0.9414062,36.726563 C5.488281,39.648438 10.894531,41.347656 16.703125,41.347656 C35.617188,41.347656 45.960938,25.679688 45.960938,12.09375 C45.960938,11.648438 45.949219,11.199219 45.933594,10.761719 C47.941406,9.3125 49.683594,7.5 51.0625,5.4375 Z"></path>
                  </svg>
                </a>
              </footer>
            </Container>
          </Section>
        </Wrapper>
      </Page>
    )
  }
}

export const query = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        facebook
        title
        twitter
      }
    },

    allContentfulPage(
      sort: {
        fields: [order]
      }
    ) {
      edges {
        node {
          id
          image {
            responsiveSizes(maxWidth: 2048, quality: 75) {
              aspectRatio
              base64
              src
              srcSet
              sizes
            }
          }
          order
          slug
          title
        }
      }
    },
  }
`
