import React from 'react'
import Link from 'gatsby-link'
import styles from '../styles/layout.module.scss'

export default ({ children }) =>
  <main>
    {children()}
  </main>
