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
              src={this.props.imageSrc}
              srcSet={this.props.imageSrcSet}
            />
          </div>

          <div className={styles.textWrapper}>
            <div className={styles.progressTrack} onClick={this.toggleMedia} onTouchStart={() => { }} title="Play sample">
              <span
                className={styles.progress}
                ref={progress => this.progress = progress}
                style={{ backgroundColor: this.props.color, width: this.state.progress }}
              >
                {this.props.media !== '' ? (
                  <span className={styles.headphones}>
                    <svg style={{ fill: 'currentColor' }} viewBox="0 0 24 18">
                      <path d="M12,0 C7.88625024,0 4.43625024,2.895 3.57,6.75 C3.65812512,6.74062512 3.75,6.72 3.84,6.72 C4.08562512,6.72 4.32187488,6.77062512 4.545,6.84 C5.35875024,3.47437488 8.38687488,0.96 12,0.96 C15.6131251,0.96 18.6412502,3.47437488 19.455,6.84 C19.6781251,6.77062512 19.9143749,6.72 20.16,6.72 C20.25,6.72 20.3418749,6.74062512 20.43,6.75 C19.5637502,2.895 16.1118749,0 12,0 Z M3.84,7.68 C3.04687488,7.68 2.4,8.32687488 2.4,9.12 L2.4,16.32 C2.4,17.1131251 3.04687488,17.76 3.84,17.76 C4.63312512,17.76 5.28,17.1131251 5.28,16.32 L5.28,9.12 C5.28,8.32687488 4.63312512,7.68 3.84,7.68 Z M20.16,7.68 C19.3668749,7.68 18.72,8.32687488 18.72,9.12 L18.72,16.32 C18.72,17.1131251 19.3668749,17.76 20.16,17.76 C20.9531251,17.76 21.6,17.1131251 21.6,16.32 L21.6,9.12 C21.6,8.32687488 20.9531251,7.68 20.16,7.68 Z M1.44,9.18 C0.57375024,9.87562512 0,11.1806251 0,12.72 C0,14.2593749 0.57375024,15.5643749 1.44,16.26 L1.44,9.18 Z M22.56,9.18 L22.56,16.26 C23.4262502,15.5643749 24,14.2593749 24,12.72 C24,11.1806251 23.4262502,9.87562512 22.56,9.18 Z" />
                    </svg>
                  </span>
                ) : ''}
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
