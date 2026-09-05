import { useEffect, useState, useRef } from 'react'
import './CinematicIntro.css'

const stars = Array.from({ length: 42 }, (_, i) => ({
  left: `${(i * 37 + 9) % 100}%`,
  top: `${(i * 23 + 7) % 88}%`,
  animationDelay: `${-(i % 7) * 0.8}s`,
  animationDuration: `${2.5 + (i % 5) * 0.7}s`,
  opacity: 0.2 + (i % 4) * 0.2,
  size: i % 4 === 0 ? 3 : i % 7 === 0 ? 4 : 2,
}))

const shootingStars = [
  { id: 1, top: '16%', left: '78%', delay: '0.8s', duration: '1.8s' },
  { id: 2, top: '32%', left: '92%', delay: '3.6s', duration: '2.0s' },
  { id: 3, top: '10%', left: '55%', delay: '7.2s', duration: '2.2s' },
]

const stardust = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 31 + 14) % 94}%`,
  top: `${(i * 29 + 18) % 86}%`,
  animationDelay: `${-(i * 1.3)}s`,
  animationDuration: `${6 + (i % 4) * 2}s`,
  size: 1.5 + (i % 3) * 0.8,
}))

export default function CinematicIntro({ onEnter, isPlaying = false, onToggleMusic }) {
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(typeof document !== 'undefined' ? document.hidden : false)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  // Visibility listener
  useEffect(() => {
    const updateVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  // Fast load fallback so animations start without lag
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 250)
    return () => clearTimeout(timer)
  }, [])

  // Keyboard navigation: Enter or Space to enter portfolio
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onEnter?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onEnter])

  // Mouse Parallax & Dynamic Light Coordinates
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = ((e.clientX / innerWidth) - 0.5) * 2
      const y = ((e.clientY / innerHeight) - 0.5) * 2
      setMousePos({ x, y })

      if (containerRef.current) {
        containerRef.current.style.setProperty('--cursor-x', `${e.clientX}px`)
        containerRef.current.style.setProperty('--cursor-y', `${e.clientY}px`)
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main
      ref={containerRef}
      className={`cinematic-intro${paused || hidden ? ' is-paused' : ''}${loaded ? ' is-ready' : ''}${failed ? ' image-failed' : ''}`}
      aria-labelledby="intro-title"
    >
      {/* Dynamic Cursor Spotlight */}
      <div className="intro-cursor-glow" aria-hidden="true" />

      {/* Cinematic Visual Scene */}
      <div
        className="intro-scene"
        aria-hidden="true"
        style={{
          transform: `translate3d(${mousePos.x * 6}px, ${mousePos.y * 6}px, 0)`
        }}
      >
        <img
          className="intro-sky"
          src={`${import.meta.env.BASE_URL}aurora-sky.png`}
          alt=""
          fetchPriority="high"
        />

        {/* Aurora Shimmer Waves */}
        <div className="intro-aurora intro-aurora-green" />
        <div className="intro-aurora intro-aurora-violet" />
        <div className="intro-aurora intro-aurora-cyan" />
        <div className="intro-aurora-pulse" />

        {/* Twinkling Starfield */}
        <div className="intro-stars">
          {stars.map((s, i) => (
            <span
              key={i}
              style={{
                left: s.left,
                top: s.top,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: s.animationDelay,
                animationDuration: s.animationDuration,
                opacity: s.opacity,
              }}
            />
          ))}
        </div>

        {/* Celestial Shooting Stars */}
        <div className="intro-shooting-stars">
          {shootingStars.map((meteor) => (
            <div
              key={meteor.id}
              className="intro-meteor"
              style={{
                top: meteor.top,
                left: meteor.left,
                animationDelay: meteor.delay,
                animationDuration: meteor.duration,
              }}
            />
          ))}
        </div>

        {/* Ambient Floating Stardust */}
        <div className="intro-stardust">
          {stardust.map((dust, i) => (
            <span
              key={i}
              className="stardust-particle"
              style={{
                left: dust.left,
                top: dust.top,
                width: `${dust.size}px`,
                height: `${dust.size}px`,
                animationDelay: dust.animationDelay,
                animationDuration: dust.animationDuration,
              }}
            />
          ))}
        </div>

        {/* Majestic Winged Elephant Flight */}
        <div
          className="intro-flight"
          style={{
            transform: `translateX(-50%) translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 0)`
          }}
        >
          <div className="intro-elephant-halo" />
          <div className="intro-elephant">
            <img
              className="elephant-body"
              src={`${import.meta.env.BASE_URL}elephant-layer.png`}
              alt=""
              fetchPriority="high"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
            <img
              className="elephant-wing elephant-wing-left"
              src={`${import.meta.env.BASE_URL}elephant-layer.png`}
              alt=""
            />
            <img
              className="elephant-wing elephant-wing-right"
              src={`${import.meta.env.BASE_URL}elephant-layer.png`}
              alt=""
            />
          </div>
        </div>

        <div className="intro-clouds" />
        <div className="intro-shade" />
      </div>

      {/* Top Header Bar */}
      <header className="intro-header">
        <div className="intro-brand">
          <span className="intro-monogram">RP</span>
          <div className="intro-brand-meta">
            <span className="brand-name">Radhe Patel</span>
            <span className="brand-status">
              <span className="status-dot" />
              <span>Interactive Space</span>
            </span>
          </div>
        </div>

        <div className="intro-header-actions">
          {onToggleMusic && (
            <button
              type="button"
              className={`intro-quiet intro-audio-pill ${isPlaying ? 'is-playing' : ''}`}
              onClick={onToggleMusic}
              aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
              title={isPlaying ? 'Pause "Gehra Hua"' : 'Play "Gehra Hua"'}
            >
              <span className="audio-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="audio-label">{isPlaying ? 'Sound On' : 'Sound Off'}</span>
            </button>
          )}

          <button
            type="button"
            className="intro-quiet intro-skip"
            onClick={onEnter}
            aria-label="Skip introduction and go directly to desktop"
          >
            <span>Skip intro</span>
            <span className="skip-arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </header>

      {/* Accelerated & Enhanced Title Card: "Welcome to my domain." */}
      <div
        className="intro-title-card"
        style={{
          transform: `translate(-50%, -50%) translate3d(${mousePos.x * -10}px, ${mousePos.y * -8}px, 0) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg)`
        }}
      >
        <div className="intro-badge">
          <span className="badge-sparkle" aria-hidden="true">✦</span>
          <span>PORTFOLIO OS</span>
          <span className="badge-sparkle" aria-hidden="true">✦</span>
        </div>

        <p className="intro-welcome">Welcome to</p>

        <h1 id="intro-title">
          my <span className="domain-glow">domain.</span>
        </h1>

        <p className="intro-tagline">
          Tax Associate &amp; Process Builder <span className="tag-dot">•</span> CPA Candidate 2027
        </p>

        <div className="intro-action-wrap">
          <button
            type="button"
            className="intro-enter"
            onClick={onEnter}
            aria-label="Enter portfolio"
          >
            <span className="enter-ambient-ring" aria-hidden="true" />
            <span className="enter-label">Enter portfolio</span>
            <span className="enter-arrow" aria-hidden="true">→</span>
            <kbd className="enter-shortcut" aria-hidden="true" title="Shortcut: Press Enter">↵</kbd>
          </button>
        </div>
      </div>

      {/* Bottom Footer Controls */}
      <footer className="intro-footer">
        <button
          type="button"
          className="intro-quiet intro-motion"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
        >
          <span className="motion-dot" />
          <span>{paused ? 'Resume motion' : 'Pause motion'}</span>
        </button>

        <div className="intro-footer-center hide-on-mobile">
          <span className="footer-tip">Press <kbd>Enter ↵</kbd> or click to explore</span>
        </div>

        <span className="intro-signature" lang="gu" title="Radhe Patel in Gujarati">
          રાધે પટેલ
        </span>
      </footer>
    </main>
  )
}
