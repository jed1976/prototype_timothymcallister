import React from 'react'
import Container from '../components/container'
import Link from 'gatsby-link'
import styles from './premieres.module.scss'

export default class Premieres extends React.Component {


  render() {
    const years = this.props.data.allContentfulPremiere.edges
      .map(({ node }) => new Date(node.date).getUTCFullYear())
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort()
      .reverse()

    const premieres = {}

    years.map(year => {
      premieres[year] = this.props.data.allContentfulPremiere.edges
        .filter(({ node }) => new Date(node.date).getUTCFullYear() === year)
    })

    return (
      <Container backgroundColor="#ccc">
        <ol className={styles.list}>
        {years.map(year =>
          <li key={year}>
            <h2>{year}</h2>
            {premieres[year].map(premiere =>
              <article key={premiere.node.id}>
                <h3>{premiere.node.title}</h3>
              </article>
            )}
          </li>
        )}
        </ol>
      </Container>
    )
  }
}

export const query = graphql`
  query Premieres {
    allContentfulPremiere(sort: { fields: [date, title], order: DESC }) {
      edges {
        node {
          id
          title
          date
          composer
          category
        }
      }
    }
  }
`
