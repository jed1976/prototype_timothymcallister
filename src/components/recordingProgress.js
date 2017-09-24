import React from 'react'
import PropTypes from 'prop-types'
import styles from './recording-progress.module.scss'

export default class RecordingProgress extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: 0 }
  }

  value() {
    return `${Math.ceil(this.state.value * 100)}%`
  }

  render() {
    return (
      <div className={styles.progressTrack}>
        <span
          className={styles.progress}
          ref={progressValue => this.progressValue = progressValue}
          style={{ backgroundColor: this.props.color, width: this.value() }}
        ></span>
      </div>
    )
  }
}
