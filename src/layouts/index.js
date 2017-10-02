import React from 'react'
import Link from 'gatsby-link'
import styles from './index.module.scss'

export default ({ children, data }) =>
  <main>
    {children()}
  </main>
