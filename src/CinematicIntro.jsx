import { useEffect, useState } from 'react'
import './CinematicIntro.css'

const stars = Array.from({ length: 32 }, (_, i) => ({
  left: `${(i * 37 + 9) % 100}%`, top: `${(i * 23 + 7) % 87}%`,
  animationDelay: `${-(i % 9)}s`, opacity: .18 + (i % 4) * .13,
}))

export default function CinematicIntro({ onEnter }) {
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(document.hidden)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const updateVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  return (
    <main className={`cinematic-intro${paused || hidden ? ' is-paused' : ''}${loaded ? ' is-ready' : ''}${failed ? ' image-failed' : ''}`} aria-labelledby="intro-title">
      <div className="intro-scene" aria-hidden="true">
        <img className="intro-sky" src={`${import.meta.env.BASE_URL}aurora-sky.png`} alt="" fetchPriority="high" />
        <div className="intro-aurora intro-aurora-green" />
        <div className="intro-aurora intro-aurora-violet" />
        <div className="intro-stars">{stars.map((style, i) => <span key={i} style={style} />)}</div>
        <div className="intro-flight">
          <div className="intro-elephant">
            <img className="elephant-body" src={`${import.meta.env.BASE_URL}elephant-layer.png`} alt="" fetchPriority="high" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
            <img className="elephant-wing elephant-wing-left" src={`${import.meta.env.BASE_URL}elephant-layer.png`} alt="" />
            <img className="elephant-wing elephant-wing-right" src={`${import.meta.env.BASE_URL}elephant-layer.png`} alt="" />
          </div>
        </div>
        <div className="intro-clouds" />
        <div className="intro-shade" />
      </div>
      <header className="intro-header">
        <span className="intro-brand"><span className="intro-monogram">RP</span> Radhe Patel</span>
        <button className="intro-quiet" onClick={onEnter}>Skip intro <span aria-hidden="true">↗</span></button>
      </header>
      <div className="intro-title-card">
        <p className="intro-welcome">Welcome to</p>
        <h1 id="intro-title">Radhe’s <span>domain.</span></h1>
      </div>
      <footer className="intro-footer">
        <button className="intro-quiet intro-motion" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Resume motion' : 'Pause motion'}</button>
        <button className="intro-enter" onClick={onEnter}>Enter portfolio <span aria-hidden="true">→</span></button>
        <span className="intro-signature" lang="gu">રાધે પટેલ</span>
      </footer>
    </main>
  )
}
