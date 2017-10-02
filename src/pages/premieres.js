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

    console.log(premieres['2014'])

    return (
      <Container backgroundColor="#ccc">
        <header className={styles.header}>
          <h1 className={styles.title}>Premieres</h1>
        </header>

        {years.map(year =>
          <div key={year}>
            <h2>{year}</h2>
            {premieres[year].map(premiere =>
              <article key={premiere.node.id}>
                <h3>{premiere.node.title}</h3>
              </article>
            )}
          </div>
        )}
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
