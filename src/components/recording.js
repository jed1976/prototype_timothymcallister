import React from 'react'
import PropTypes from 'prop-types'
import dateformat from 'dateformat'
import marked from 'marked'
import styles from './recording.module.scss'


class Recording extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: 0,
      progress: 0
    }
    this.toggleMedia = this.toggleMedia.bind(this)
  }

  componentDidMount() {
    this.media.style.display = 'none'

    this.media.onended = () => {
      this.setState({ currentTime: 0, progress: 0 })
      this.setSavedState()
    }

    this.media.ontimeupdate = () => {
      this.setState({
        currentTime: this.media.currentTime,
        progress: `${Math.ceil((this.media.currentTime / this.media.duration) * 100)}%`
      })
      this.setSavedState()
    }

    this.media.onloadstart = () => {
      const savedState = this.getSavedState()

      if (savedState) {
        this.setState(savedState)
      }
    }

    this.media.onloadeddata = () => {
      this.media.currentTime = this.state.currentTime
    }
  }

  getSavedState() {
    return JSON.parse(window.localStorage.getItem(`recording-${this.props.id}`))
  }

  setSavedState() {
    window.localStorage.setItem(`recording-${this.props.id}`, JSON.stringify(this.state))
  }

  toggleMedia() {
    if (this.media.paused) {
      this.media.play()
    } else {
      this.media.pause()
    }

    if (this.props.onMediaToggle) {
      this.props.onMediaToggle(this.media)
    }
  }

  render() {
    const description = this.props.description.split('\n').filter(item => item !== '')
    const renderedDescription = description.map((paragraph, index) =>
      <div className={styles.paragraph} dangerouslySetInnerHTML={{ __html: marked(paragraph) }} key={index} />)
    const date = dateformat(this.props.date, 'mmmm d, yyyy')
    const mediaButtonText = this.props.media ? 'Play Sample' : ''

    return (
      <li className={styles.recording}>
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper} onClick={this.toggleMedia} onTouchStart={() => { }}>
            <img
              className={styles.image}
              src={this.props.imageSrc}
              srcSet={this.props.imageSrcSet}
              title={mediaButtonText}
            />
          </div>

          <div className={styles.textWrapper}>
            <div className={styles.progressTrack}>
              <span
                className={styles.progress}
                ref={progress => this.progress = progress}
                style={{ backgroundColor: this.props.color, width: this.state.progress }}
              >
              </span>
            </div>

            <h1 className={styles.title} style={{ color: this.props.color }}>{this.props.title}</h1>

            <time className={styles.date}>{date}</time>

            {renderedDescription}

            <audio
              className={styles.media}
              controls
              preload="none"
              ref={media => this.media = media}
              src={this.props.media}
            ></audio>

            {this.props.recordingUrl
              ?
              <footer className={styles.footer}>
                <a className={styles.link} href={this.props.recordingUrl}>More Information</a>
              </footer>
              : ''
            }
          </div>
        </div>
      </li>
    )
  }
}

Recording.propTypes = {
  color: PropTypes.string,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
  imageSrcSet: PropTypes.string,
  media: PropTypes.string,
  onMediaToggle: PropTypes.func,
  recordingUrl: PropTypes.string,
  title: PropTypes.string,
}

export default Recording
