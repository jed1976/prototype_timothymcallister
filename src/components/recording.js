import React from 'react'
import PropTypes from 'prop-types'
import dateformat from 'dateformat'
import marked from 'marked'
import styles from './recording.module.scss'


export default class Recording extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: 0,
      mediaState: 'paused',
      progress: 0
    }
    this.mediaState = this.mediaState.bind(this)
    this.onEnded = this.onEnded.bind(this)
    this.onLoadedData = this.onLoadedData.bind(this)
    this.onLoadStart = this.onLoadStart.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onTimeUpdate = this.onTimeUpdate.bind(this)
    this.onUnload = this.onUnload.bind(this)
    this.toggleMedia = this.toggleMedia.bind(this)
  }

  componentDidMount() {
    this.media.style.display = 'none'
    window.addEventListener('beforeunload', this.onUnload)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload)
  }

  componentDidUpdate() {
    this.setSavedState()
  }

  getSavedState() {
    return JSON.parse(window.localStorage.getItem(`recording-${this.props.id}`))
  }

  mediaState() {
    return this.media.paused
  }

  onEnded() {
    this.setState({
      currentTime: 0,
      mediaState: 'paused',
      progress: 0
    })
  }

  onLoadedData() {
    this.media.currentTime = this.state.currentTime
  }

  onLoadStart() {
    const savedState = this.getSavedState()

    if (savedState) {
      this.setState(savedState)
    }
  }

  onPause() {
    this.setState({ mediaState: 'paused' })
  }

  onPlay() {
    this.setState({ mediaState: 'playing' })
  }

  onTimeUpdate() {
    this.setState({
      currentTime: this.media.currentTime,
      progress: `${Math.ceil((this.media.currentTime / this.media.duration) * 100)}%`
    })
  }

  onUnload() {
    this.media.pause()
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
    const date = dateformat(this.props.date, 'mmmm d, yyyy')
    const mediaButtonText = this.props.media ? 'Play Sample' : ''

    return (
      <li className={styles.item} key={this.props.id}>
        <div className={styles.imageLayout}>
          <a className={styles.imageWrapper} href={this.props.recordingUrl} title="Visit producer site">
            <div className={styles.image} style={{ backgroundImage: `url(${this.props.imageSrc})` }}></div>
          </a>
        </div>

        <article className={styles.contentWrapper}>
          <div className={styles.content}>
            <h1 className={styles.title}>{this.props.title}</h1>

            {this.props.media ?
            <div className={styles.mediaPlayer}>
              <button
                className={styles.mediaButton}
                data-state={this.state.mediaState}
                onClick={this.toggleMedia}
                onTouchStart={() => {}}
              >
                <div className={styles.mediaButtonsIcons}>
                  <svg className={styles.icon} data-icon="play" viewBox="0 0 12 14">
                    <polygon points="0 0 0 14 12 7"></polygon>
                  </svg>
                  <svg className={styles.icon} data-icon="pause" viewBox="0 0 14 14">
                    <path d="M0,0 L0,14 L5,14 L5,0 L0,0 Z M9,0 L9,14 L14,14 L14,0 L9,0 Z"></path>
                  </svg>
                </div>
              </button>

              <div className={styles.progressTrack}>
                <span
                  className={styles.progress}
                  ref={progress => this.progress = progress}
                  style={{ width: this.state.progress || 0 }}
                >
                </span>
              </div>
            </div>
              : ''
            }

            <audio
              className={styles.media}
              controls
              onEnded={this.onEnded}
              onLoadStart={this.onLoadStart}
              onLoadedData={this.onLoadedData}
              onPause={this.onPause}
              onPlay={this.onPlay}
              onTimeUpdate={this.onTimeUpdate}
              preload="none"
              ref={media => this.media = media}
              src={this.props.media}
            ></audio>

            <div
              className={styles.paragraphWrapper}
              dangerouslySetInnerHTML={{ __html: marked(this.props.description) }} />

            <time className={styles.date}>{date}</time>
          </div>
        </article>
      </li>
    )
  }
}

Recording.propTypes = {
  description: PropTypes.string,
  imageSrc: PropTypes.string,
  imageSrcSet: PropTypes.string,
  media: PropTypes.string,
  onMediaToggle: PropTypes.func,
  recordingUrl: PropTypes.string,
  title: PropTypes.string,
}
