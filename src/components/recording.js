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
    this.media.paused ? this.media.play() : this.media.pause()

    if (this.props.onMediaToggle) {
      this.props.onMediaToggle(this.media)
    }
  }

  render() {
    const description = this.props.description.split('\n').filter(item => item !== '')
    const renderedDescription = description.map((paragraph, index) =>
      <div className={styles.paragraph} dangerouslySetInnerHTML={{ __html: marked(paragraph) }} key={index} />)
    const date = dateformat(this.props.date, 'mmmm d, yyyy')

    return (
      <li className={styles.recording}>
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              onClick={this.toggleMedia}
              onTouchStart={() => { }}
              src={this.props.imageSrc}
              srcSet={this.props.imageSrcSet}
              title="Play sample"
            />
          </div>

          <div className={styles.textWrapper}>
            <div className={styles.progressTrack}>
              <span
                className={styles.progress}
                ref={progress => this.progress = progress}
                style={{ backgroundColor: this.props.color, width: this.state.progress }}
              ></span>
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

            <a className={styles.link} href={this.props.recordingUrl}>More Information</a>
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
