import { useState, useEffect, useRef } from 'react'
import './App.css'
import CinematicIntro from './CinematicIntro.jsx'

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

// ==========================================
// DATA: PROJECTS & SPOTIFY
// ==========================================
const projects = [
  {
    id: 'excel-automation',
    title: 'Excel Tax Workflow & Workpaper Automation',
    type: 'Active Practice & Tooling',
    date: '2025 – Present',
    description:
      'Designing structured Excel templates, review checklists, and dynamic reconciliation models that reduce reviewer turnaround time, streamline lead sheet preparation, and eliminate cross-schedule discrepancies.',
    tags: ['Excel', 'Workpapers', 'Process Automation', 'Reconciliation'],
    color: 'emerald',
    icon: '📊',
    highlights: [
      'Standardized lead schedule templates for flow-through entities',
      'Formula diagnostic checks to spot input errors before partner review',
      'Automated summary roll-ups linking 1040/1065 support schedules'
    ]
  },
  {
    id: 'sureprep-taxcaddy',
    title: 'SurePrep & TaxCaddy Workflow Optimization',
    type: 'Process Engineering',
    date: '2025',
    description:
      'Refining digital document intake and 1040/1041 binder bookmarking procedures to accelerate source-document verification, OCR verification, and 1040 workpaper routing.',
    tags: ['SurePrep', 'TaxCaddy', 'CCH Axcess', 'Process Building'],
    color: 'blue',
    icon: '⚡',
    highlights: [
      'Digital client binder organization and standardization',
      'Reduced initial scan-and-populate error rates across tax seasons',
      'Seamless hand-off documentation between interns and senior reviewers'
    ]
  },
  {
    id: 'k1-allocation-tools',
    title: 'Flow-Through Entity & K-1 Schedule Analysis',
    type: 'Tax Compliance & Analysis',
    date: '2024 – 2025',
    description:
      'Hands-on experience processing and verifying Form 1065 and 1120S return packages, including complex Schedule K-1, K-2, and K-3 line item breakdowns and partner basis calculations.',
    tags: ['Forms 1065 / 1120S', 'K-1 / K-2 / K-3', 'Basis Tracking', 'Tax Compliance'],
    color: 'purple',
    icon: '📑',
    highlights: [
      'Reconciliation of partner capital accounts with Tax Basis accounting',
      'Special allocation checks and pass-through deduction tracking',
      'Cross-referencing state tax withholdings with composite return rules'
    ]
  },
  {
    id: 'towson-accounting',
    title: 'Towson University Accounting & Tax Research',
    type: 'Academic Excellence',
    date: '2023 – 2027',
    description:
      'B.S. in Accounting at Towson University maintaining a 3.66 GPA and Dean’s List honors. Advanced coursework in Federal Taxation, Auditing, Financial Reporting, and Cost Accounting on the 150-credit CPA track.',
    tags: ['Towson Univ', 'GPA 3.66', 'Dean\'s List', 'CPA Track 2027'],
    color: 'amber',
    icon: '🎓',
    highlights: [
      'Dean\'s List recognition for academic excellence (Spring 2026)',
      'Microsoft Office Specialist: Excel Associate Certification',
      'IRC § research cases and GAAP compliance problem sets'
    ]
  }
]

const spotifyTracks = [
  {
    id: '5MCbGWnNLLjoHpbDO3BOgi',
    title: 'Gehra Hua',
    artist: 'Shashwat Sachdev, Arijit Singh',
    album: 'Full Song (Dhurandhar)'
  },
  {
    id: '4cOdK2wGLETKBW3PvgPWqT',
    title: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    album: 'Classic Vibes'
  },
  {
    id: '3n3Ppam7vgaVa1iaRUc9Lp',
    title: 'Mr. Brightside',
    artist: 'The Killers',
    album: 'High Energy Focus'
  }
]

export default function App() {
  // Remember entry for this session.
  const [hasEntered, setHasEntered] = useState(() => {
    try { return sessionStorage.getItem('radhe-intro-seen') === 'true' } catch { return false }
  })


  // Desktop Wallpapers & Themes
  const [wallpaper, setWallpaper] = useState('sonoma')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [volume, setVolume] = useState(85)
  const [brightness, setBrightness] = useState(100)

  // Music state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackId, setCurrentTrackId] = useState('5MCbGWnNLLjoHpbDO3BOgi')
  const [trackProgress, setTrackProgress] = useState({ current: 0, duration: 362 })

  // Audio element reference for Full Song "Gehra Hua"
  const audioRef = useRef(null)

  // Top Menubar & Control Center
  const [activeMenu, setActiveMenu] = useState(null)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const [isAboutMacOpen, setIsAboutMacOpen] = useState(false)

  // Live Clock
  const [currentTime, setCurrentTime] = useState('')

  // Window Management System
  const [, setHighestZ] = useState(10)
  const [activeWindowId, setActiveWindowId] = useState('about')

  const [windows, setWindows] = useState({
    about: {
      id: 'about',
      title: 'About Radhe — Safari',
      appName: 'Safari',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 80,
      y: 50,
      width: 780,
      height: 540
    },
    resume: {
      id: 'resume',
      title: 'Patel_Radhe_Resume.pdf — Preview',
      appName: 'Preview',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 9,
      x: 120,
      y: 40,
      width: 820,
      height: 580
    },
    finder: {
      id: 'finder',
      title: 'Projects & Experience — Finder',
      appName: 'Finder',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 8,
      x: 160,
      y: 60,
      width: 790,
      height: 520
    },
    spotify: {
      id: 'spotify',
      title: 'Spotify — Music Player',
      appName: 'Spotify',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 7,
      x: 220,
      y: 70,
      width: 470,
      height: 530
    },
    terminal: {
      id: 'terminal',
      title: 'radhe@macbook-pro: ~ (zsh)',
      appName: 'Terminal',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 6,
      x: 180,
      y: 90,
      width: 650,
      height: 420
    }
  })

  // Desktop Stickie & Turntable Widget visibility
  const [isStickieOpen, setIsStickieOpen] = useState(true)
  const [isTurntableOpen, setIsTurntableOpen] = useState(false)

  // Window dragging
  const [dragState, setDragState] = useState(null)
  const [iconOffsets, setIconOffsets] = useState({})
  const iconDragRef = useRef(null)
  const desktopRef = useRef(null)

  const handleIconPointerDown = (event, id) => {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    const offset = iconOffsets[id] || { x: 0, y: 0 }
    iconDragRef.current = { id, startX: event.clientX, startY: event.clientY, originX: offset.x, originY: offset.y, moved: false }
  }

  const handleIconPointerMove = (event) => {
    const drag = iconDragRef.current
    if (!drag) return
    const x = drag.originX + event.clientX - drag.startX
    const y = drag.originY + event.clientY - drag.startY
    if (Math.abs(event.clientX - drag.startX) > 4 || Math.abs(event.clientY - drag.startY) > 4) drag.moved = true
    setIconOffsets((current) => ({ ...current, [drag.id]: { x, y } }))
  }

  const handleIconPointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const handleIconClick = (open) => {
    if (iconDragRef.current?.moved) {
      iconDragRef.current = null
      return
    }
    iconDragRef.current = null
    open()
  }

  const iconDragProps = (id, open) => ({
    style: { transform: `translate3d(${iconOffsets[id]?.x || 0}px, ${iconOffsets[id]?.y || 0}px, 0)` },
    onPointerDown: (event) => handleIconPointerDown(event, id),
    onPointerMove: handleIconPointerMove,
    onPointerUp: handleIconPointerUp,
    onPointerCancel: handleIconPointerUp,
    onClick: () => handleIconClick(open)
  })

  // Clock ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const dayName = days[now.getDay()]
      const monthName = months[now.getMonth()]
      const dayNum = now.getDate()
      let hours = now.getHours()
      const minutes = now.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12
      const formattedMins = minutes < 10 ? `0${minutes}` : minutes

      setCurrentTime(`${dayName} ${monthName} ${dayNum}  ${hours}:${formattedMins} ${ampm}`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Sync Audio Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  // Global click listener to close menus
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (!e.target.closest('.menubar') && !e.target.closest('.control-center-panel')) {
        setActiveMenu(null)
        setIsControlCenterOpen(false)
      }
    }
    window.addEventListener('mousedown', handleGlobalClick)
    return () => window.removeEventListener('mousedown', handleGlobalClick)
  }, [])

  const handleEnterDomain = () => {
    try { sessionStorage.setItem('radhe-intro-seen', 'true') } catch { /* Storage may be unavailable. */ }
    setHasEntered(true)
  }

  // Toggle Music Playback
  const togglePlayMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(console.warn)
      }
    }
  }

  // Seek music
  const seekMusic = (pct) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = pct * audioRef.current.duration
    }
  }

  // Focus Window
  const focusWindow = (id) => {
    setActiveWindowId(id)
    setHighestZ((prev) => {
      const newZ = prev + 1
      setWindows((curr) => ({
        ...curr,
        [id]: {
          ...curr[id],
          zIndex: newZ,
          isMinimized: false
        }
      }))
      return newZ
    })
  }

  // Open / Restore window
  const openWindow = (id) => {
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        isOpen: true,
        isMinimized: false
      }
    }))
    focusWindow(id)
  }

  // Close window
  const closeWindow = (id) => {
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        isOpen: false
      }
    }))
    if (activeWindowId === id) {
      const remainingOpen = Object.values(windows).filter((w) => w.id !== id && w.isOpen && !w.isMinimized)
      if (remainingOpen.length > 0) {
        remainingOpen.sort((a, b) => b.zIndex - a.zIndex)
        setActiveWindowId(remainingOpen[0].id)
      } else {
        setActiveWindowId('finder')
      }
    }
  }

  // Minimize window
  const minimizeWindow = (id) => {
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        isMinimized: true
      }
    }))
    if (activeWindowId === id) {
      const remainingOpen = Object.values(windows).filter((w) => w.id !== id && w.isOpen && !w.isMinimized)
      if (remainingOpen.length > 0) {
        remainingOpen.sort((a, b) => b.zIndex - a.zIndex)
        setActiveWindowId(remainingOpen[0].id)
      } else {
        setActiveWindowId('finder')
      }
    }
  }

  // Maximize / Restore window
  const toggleMaximize = (id) => {
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        isMaximized: !curr[id].isMaximized
      }
    }))
    focusWindow(id)
  }

  // Dragging handlers
  const handleMouseDownHeader = (e, id) => {
    if (e.button !== 0) return
    if (e.target.closest('.traffic-light') || e.target.closest('button') || e.target.closest('input')) return

    focusWindow(id)
    const win = windows[id]
    if (win.isMaximized) return

    setDragState({
      id,
      startX: e.clientX,
      startY: e.clientY,
      initX: win.x,
      initY: win.y
    })
  }

  const handleMouseMove = (e) => {
    if (!dragState) return
    const deltaX = e.clientX - dragState.startX
    const deltaY = e.clientY - dragState.startY

    const boundsWidth = desktopRef.current ? desktopRef.current.clientWidth : window.innerWidth
    const boundsHeight = desktopRef.current ? desktopRef.current.clientHeight : window.innerHeight

    const win = windows[dragState.id]
    const newX = Math.max(10, Math.min(boundsWidth - win.width / 3, dragState.initX + deltaX))
    const newY = Math.max(34, Math.min(boundsHeight - 80, dragState.initY + deltaY))

    setWindows((curr) => ({
      ...curr,
      [dragState.id]: {
        ...curr[dragState.id],
        x: newX,
        y: newY
      }
    }))
  }

  const handleMouseUp = () => {
    if (dragState) {
      setDragState(null)
    }
  }

  const currentApp = windows[activeWindowId]?.appName || 'Finder'

  return (
    <>
      {/* HTML5 Audio Element for Full Song "Gehra Hua" */}
      <audio
        ref={audioRef}
        preload="none"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setTrackProgress({
              current: audioRef.current.currentTime,
              duration: audioRef.current.duration || 362
            })
          }
        }}
      >
        <source src="./gehra_hua.mp3" type="audio/mpeg" />
        <source src="./gehra_hua.m4a" type="audio/mp4" />
        <source src="./gehra_hua.webm" type="audio/webm" />
      </audio>

      {/* VIEW 1: CINEMATIC ELEPHANT INTRO */}
      {!hasEntered ? (
        <CinematicIntro
          onEnter={handleEnterDomain}
          isPlaying={isPlaying}
          onToggleMusic={togglePlayMusic}
        />
      ) : (
        /* VIEW 2: FULL MACOS DESKTOP HUB */
        <div
          className={`macos-desktop-root wallpaper-${wallpaper} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
          ref={desktopRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ filter: `brightness(${brightness}%)` }}
        >
          {/* 1. TOP MENUBAR */}
          <header className="menubar" role="banner">
            <div className="menubar-left">
              <div className="menu-item-wrapper">
                <button
                  className={`apple-logo-btn ${activeMenu === 'apple' ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}
                  aria-label="Apple Menu"
                >
                  <AppleIcon />
                </button>
                {activeMenu === 'apple' && (
                  <div className="menubar-dropdown">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAboutMacOpen(true)
                        setActiveMenu(null)
                      }}
                    >
                      About This Mac
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      type="button"
                      onClick={() => {
                        setIsControlCenterOpen(true)
                        setActiveMenu(null)
                      }}
                    >
                      System Settings...
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        openWindow('about')
                        setActiveMenu(null)
                      }}
                    >
                      Radhe Patel Profile
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      type="button"
                      onClick={() => {
                        openWindow('resume')
                        setActiveMenu(null)
                      }}
                    >
                      View Resume (PDF)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        openWindow('spotify')
                        setActiveMenu(null)
                      }}
                    >
                      Spotify Player
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      type="button"
                      onClick={() => {
                        if (audioRef.current) audioRef.current.pause()
                        setHasEntered(false)
                        setActiveMenu(null)
                      }}
                    >
                      Replay cinematic intro
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        window.location.reload()
                      }}
                    >
                      Restart RadheOS...
                    </button>
                  </div>
                )}
              </div>

              <div className="active-app-title">
                <strong>{currentApp}</strong>
              </div>

              {/* Menubar Categories */}
              <div className="menu-item-wrapper">
                <button
                  className={`menubar-item-btn ${activeMenu === 'file' ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === 'file' ? null : 'file')}
                >
                  File
                </button>
                {activeMenu === 'file' && (
                  <div className="menubar-dropdown">
                    <button
                      type="button"
                      onClick={() => {
                        openWindow('finder')
                        setActiveMenu(null)
                      }}
                    >
                      New Finder Window <span>⌘N</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        openWindow('resume')
                        setActiveMenu(null)
                      }}
                    >
                      Open Resume PDF <span>⌘O</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        openWindow('terminal')
                        setActiveMenu(null)
                      }}
                    >
                      Open Terminal <span>⌘T</span>
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      type="button"
                      onClick={() => {
                        if (activeWindowId) closeWindow(activeWindowId)
                        setActiveMenu(null)
                      }}
                    >
                      Close Window <span>⌘W</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="menu-item-wrapper">
                <button
                  className={`menubar-item-btn ${activeMenu === 'view' ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === 'view' ? null : 'view')}
                >
                  View
                </button>
                {activeMenu === 'view' && (
                  <div className="menubar-dropdown">
                    <button
                      type="button"
                      onClick={() => {
                        setWallpaper('sonoma')
                        setActiveMenu(null)
                      }}
                    >
                      Wallpaper: Sonoma Sunset {wallpaper === 'sonoma' ? '✓' : ''}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setWallpaper('sequoia')
                        setActiveMenu(null)
                      }}
                    >
                      Wallpaper: Sequoia Dawn {wallpaper === 'sequoia' ? '✓' : ''}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setWallpaper('monterey')
                        setActiveMenu(null)
                      }}
                    >
                      Wallpaper: Monterey Midnight {wallpaper === 'monterey' ? '✓' : ''}
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      type="button"
                      onClick={() => {
                        setIsTurntableOpen(!isTurntableOpen)
                        setActiveMenu(null)
                      }}
                    >
                      {isTurntableOpen ? 'Hide Turntable Widget' : 'Show Turntable Widget'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDarkMode(!isDarkMode)
                        setActiveMenu(null)
                      }}
                    >
                      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Menubar Right Tray */}
            <div className="menubar-right">
              <button
                className={`tray-item spotify-indicator ${isPlaying ? 'playing' : ''}`}
                type="button"
                onClick={togglePlayMusic}
                title={isPlaying ? 'Gehra Hua Playing — Click to Pause' : 'Gehra Hua Paused — Click to Play'}
              >
                <SpotifySmallIcon />
                <span className="tray-text hide-on-mobile">{isPlaying ? '♫ Gehra Hua' : 'Paused'}</span>
                <div className={`equalizer-bars ${isPlaying ? 'animated' : 'paused'}`}>
                  <span />
                  <span />
                  <span />
                </div>
              </button>

              <div className="tray-item" title="Wi-Fi: Connected">
                <WifiIcon />
              </div>

              <div className="tray-item battery-item" title="Battery: 100% Charged">
                <span className="battery-pct">100%</span>
                <BatteryIcon />
              </div>

              <button
                className={`tray-item control-center-btn ${isControlCenterOpen ? 'active' : ''}`}
                type="button"
                onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
                title="Control Center"
              >
                <ControlCenterIcon />
              </button>

              <div className="tray-item clock-item">
                <span>{currentTime || 'Thu Sep 3 7:25 PM'}</span>
              </div>
            </div>
          </header>

          {/* 2. CONTROL CENTER */}
          {isControlCenterOpen && (
            <div className="control-center-panel" onClick={(e) => e.stopPropagation()}>
              <div className="cc-grid">
                <div className="cc-card cc-toggles">
                  <div className="cc-toggle-row">
                    <div className="cc-icon-badge active">
                      <WifiIcon />
                    </div>
                    <div className="cc-toggle-info">
                      <strong>Wi-Fi</strong>
                      <small>Radhe-5G (Connected)</small>
                    </div>
                  </div>
                  <div className="cc-toggle-row">
                    <div className="cc-icon-badge active">
                      <BluetoothIcon />
                    </div>
                    <div className="cc-toggle-info">
                      <strong>Bluetooth</strong>
                      <small>AirPods Pro</small>
                    </div>
                  </div>
                </div>

                <div className="cc-card cc-mode-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                  <div className={`cc-icon-badge ${isDarkMode ? 'active' : ''}`}>
                    <MoonIcon />
                  </div>
                  <div>
                    <strong>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</strong>
                    <small>Click to toggle</small>
                  </div>
                </div>
              </div>

              <div className="cc-card cc-slider-card">
                <div className="cc-slider-label">
                  <span>Display</span>
                  <span>{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="cc-slider"
                />
              </div>

              <div className="cc-card cc-slider-card">
                <div className="cc-slider-label">
                  <span>Sound &amp; "Gehra Hua" Volume</span>
                  <span>{volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="cc-slider"
                />
              </div>

              <div className="cc-card cc-wallpapers">
                <span className="cc-section-title">Desktop Wallpaper</span>
                <div className="wallpaper-choices">
                  <button
                    type="button"
                    className={`wp-chip sonoma ${wallpaper === 'sonoma' ? 'selected' : ''}`}
                    onClick={() => setWallpaper('sonoma')}
                  >
                    Sonoma
                  </button>
                  <button
                    type="button"
                    className={`wp-chip sequoia ${wallpaper === 'sequoia' ? 'selected' : ''}`}
                    onClick={() => setWallpaper('sequoia')}
                  >
                    Sequoia
                  </button>
                  <button
                    type="button"
                    className={`wp-chip monterey ${wallpaper === 'monterey' ? 'selected' : ''}`}
                    onClick={() => setWallpaper('monterey')}
                  >
                    Midnight
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. ABOUT THIS MAC MODAL */}
          {isAboutMacOpen && (
            <div className="modal-overlay" onClick={() => setIsAboutMacOpen(false)}>
              <div className="about-mac-window" onClick={(e) => e.stopPropagation()}>
                <div className="traffic-lights-bar">
                  <button
                    className="traffic-light close"
                    type="button"
                    onClick={() => setIsAboutMacOpen(false)}
                    aria-label="Close"
                  />
                </div>
                <div className="about-mac-content">
                  <div className="mac-spec-icon">
                    <MacbookProIcon />
                  </div>
                  <h2>MacBook Pro 16"</h2>
                  <p className="mac-version">RadheOS Sonoma 2026</p>
                  <div className="specs-list">
                    <div className="spec-row">
                      <span className="spec-label">Candidate</span>
                      <span className="spec-val">Radhe Mayankkumar Patel</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Education</span>
                      <span className="spec-val">Towson University (GPA 3.66)</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">CPA Track</span>
                      <span className="spec-val">Expected Spring 2027</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Specialization</span>
                      <span className="spec-val">Tax Preparation &amp; Process Automation</span>
                    </div>
                  </div>
                  <div className="mac-action-btns">
                    <button
                      type="button"
                      className="mac-btn primary"
                      onClick={() => {
                        openWindow('resume')
                        setIsAboutMacOpen(false)
                      }}
                    >
                      View Resume
                    </button>
                    <button
                      type="button"
                      className="mac-btn"
                      onClick={() => {
                        openWindow('about')
                        setIsAboutMacOpen(false)
                      }}
                    >
                      Contact Radhe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. DESKTOP WORKSPACE */}
          <main className="desktop-workspace">
            {/* Desktop Icons Grid */}
            <div className="desktop-icons-container">
              <button
                className="desktop-icon"
                type="button"
                {...iconDragProps('resume', () => openWindow('resume'))}
              >
                <div className="icon-graphic pdf-icon">
                  <PdfFileIcon />
                </div>
                <span className="icon-label">Patel_Radhe_Resume.pdf</span>
              </button>

              <button
                className="desktop-icon"
                type="button"
                {...iconDragProps('finder', () => openWindow('finder'))}
              >
                <div className="icon-graphic folder-icon">
                  <FolderIcon />
                </div>
                <span className="icon-label">Excel Projects</span>
              </button>

              <button
                className="desktop-icon"
                type="button"
                {...iconDragProps('about', () => openWindow('about'))}
              >
                <div className="icon-graphic safari-icon">
                  <SafariAppIcon />
                </div>
                <span className="icon-label">About Radhe.app</span>
              </button>

              <button
                className="desktop-icon"
                type="button"
                {...iconDragProps('spotify', () => openWindow('spotify'))}
              >
                <div className="icon-graphic spotify-icon">
                  <SpotifyAppIcon />
                </div>
                <span className="icon-label">Spotify.app</span>
              </button>

              <button
                className="desktop-icon"
                type="button"
                {...iconDragProps('terminal', () => openWindow('terminal'))}
              >
                <div className="icon-graphic terminal-icon">
                  <TerminalAppIcon />
                </div>
                <span className="icon-label">Terminal.app</span>
              </button>
            </div>

            {/* COOL DESKTOP RECORD PLAYER / TURNTABLE WIDGET (PROMINENT ON DESKTOP) */}
            {isTurntableOpen && (
              <DesktopRecordPlayer
                isPlaying={isPlaying}
                onTogglePlay={togglePlayMusic}
                trackProgress={trackProgress}
                onSeek={seekMusic}
                onClose={() => setIsTurntableOpen(false)}
                onOpenSpotifyWindow={() => openWindow('spotify')}
              />
            )}

            {/* Desktop Sticky Note */}
            {isStickieOpen && (
              <div className="desktop-stickie">
                <div className="stickie-header">
                  <span className="stickie-pin">QUICK START</span>
                  <button
                    type="button"
                    className="stickie-close"
                    onClick={() => setIsStickieOpen(false)}
                    aria-label="Close Note"
                  >
                    ×
                  </button>
                </div>
                <div className="stickie-body">
                  <h3>Browse the apps</h3>
                  <p>
                    Open any icon to explore my work, story, music, and résumé.
                  </p>
                  <p className="stickie-sub">
                    Drag the desktop apps wherever you like. Click an icon to open it, or use the dock below.
                  </p>
                  <div className="stickie-tags">
                    <span>Drag</span>
                    <span>Click</span>
                    <span>Explore</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. WINDOWS LAYER */}

            {/* A. PREVIEW APP (RESUME PDF) */}
            {windows.resume.isOpen && !windows.resume.isMinimized && (
              <MacWindow
                win={windows.resume}
                onFocus={() => focusWindow('resume')}
                onClose={() => closeWindow('resume')}
                onMinimize={() => minimizeWindow('resume')}
                onMaximize={() => toggleMaximize('resume')}
                onMouseDownHeader={(e) => handleMouseDownHeader(e, 'resume')}
              >
                <ResumePreviewApp />
              </MacWindow>
            )}

            {/* B. SPOTIFY APP (MUSIC PLAYER) */}
            {windows.spotify.isOpen && !windows.spotify.isMinimized && (
              <MacWindow
                win={windows.spotify}
                onFocus={() => focusWindow('spotify')}
                onClose={() => closeWindow('spotify')}
                onMinimize={() => minimizeWindow('spotify')}
                onMaximize={() => toggleMaximize('spotify')}
                onMouseDownHeader={(e) => handleMouseDownHeader(e, 'spotify')}
              >
                <SpotifyApp
                  currentTrackId={currentTrackId}
                  setCurrentTrackId={setCurrentTrackId}
                  spotifyTracks={spotifyTracks}
                  isPlaying={isPlaying}
                  onTogglePlay={togglePlayMusic}
                  trackProgress={trackProgress}
                  onSeek={seekMusic}
                />
              </MacWindow>
            )}

            {/* C. FINDER APP (PROJECTS & EXPERIENCE) */}
            {windows.finder.isOpen && !windows.finder.isMinimized && (
              <MacWindow
                win={windows.finder}
                onFocus={() => focusWindow('finder')}
                onClose={() => closeWindow('finder')}
                onMinimize={() => minimizeWindow('finder')}
                onMaximize={() => toggleMaximize('finder')}
                onMouseDownHeader={(e) => handleMouseDownHeader(e, 'finder')}
              >
                <FinderProjectsApp projects={projects} onOpenResume={() => openWindow('resume')} />
              </MacWindow>
            )}

            {/* D. SAFARI APP (ABOUT RADHE) */}
            {windows.about.isOpen && !windows.about.isMinimized && (
              <MacWindow
                win={windows.about}
                onFocus={() => focusWindow('about')}
                onClose={() => closeWindow('about')}
                onMinimize={() => minimizeWindow('about')}
                onMaximize={() => toggleMaximize('about')}
                onMouseDownHeader={(e) => handleMouseDownHeader(e, 'about')}
              >
                <SafariAboutApp
                  onOpenResume={() => openWindow('resume')}
                  onOpenProjects={() => openWindow('finder')}
                  onOpenSpotify={() => openWindow('spotify')}
                />
              </MacWindow>
            )}

            {/* E. TERMINAL APP (INTERACTIVE CLI) */}
            {windows.terminal.isOpen && !windows.terminal.isMinimized && (
              <MacWindow
                win={windows.terminal}
                onFocus={() => focusWindow('terminal')}
                onClose={() => closeWindow('terminal')}
                onMinimize={() => minimizeWindow('terminal')}
                onMaximize={() => toggleMaximize('terminal')}
                onMouseDownHeader={(e) => handleMouseDownHeader(e, 'terminal')}
              >
                <TerminalApp
                  onOpenResume={() => openWindow('resume')}
                  onOpenSpotify={() => openWindow('spotify')}
                  onOpenFinder={() => openWindow('finder')}
                  onOpenAbout={() => openWindow('about')}
                />
              </MacWindow>
            )}
          </main>

          {/* 6. MACOS FLOATING DOCK */}
          <nav className="macos-dock" aria-label="Application Dock">
            <div className="dock-container">
              <DockItem
                name="Finder"
                isOpen={windows.finder.isOpen && !windows.finder.isMinimized}
                onClick={() => {
                  if (windows.finder.isOpen && !windows.finder.isMinimized && activeWindowId === 'finder') {
                    minimizeWindow('finder')
                  } else {
                    openWindow('finder')
                  }
                }}
              >
                <FinderDockIcon />
              </DockItem>

              <DockItem
                name="Preview (Resume.pdf)"
                isOpen={windows.resume.isOpen && !windows.resume.isMinimized}
                onClick={() => {
                  if (windows.resume.isOpen && !windows.resume.isMinimized && activeWindowId === 'resume') {
                    minimizeWindow('resume')
                  } else {
                    openWindow('resume')
                  }
                }}
              >
                <PreviewDockIcon />
              </DockItem>

              <DockItem
                name="Safari"
                isOpen={windows.about.isOpen && !windows.about.isMinimized}
                onClick={() => {
                  if (windows.about.isOpen && !windows.about.isMinimized && activeWindowId === 'about') {
                    minimizeWindow('about')
                  } else {
                    openWindow('about')
                  }
                }}
              >
                <SafariDockIcon />
              </DockItem>

              <DockItem
                name="Spotify"
                isOpen={windows.spotify.isOpen && !windows.spotify.isMinimized}
                onClick={() => {
                  if (windows.spotify.isOpen && !windows.spotify.isMinimized && activeWindowId === 'spotify') {
                    minimizeWindow('spotify')
                  } else {
                    openWindow('spotify')
                  }
                }}
              >
                <SpotifyDockIcon />
              </DockItem>

              <DockItem
                name="Terminal"
                isOpen={windows.terminal.isOpen && !windows.terminal.isMinimized}
                onClick={() => {
                  if (windows.terminal.isOpen && !windows.terminal.isMinimized && activeWindowId === 'terminal') {
                    minimizeWindow('terminal')
                  } else {
                    openWindow('terminal')
                  }
                }}
              >
                <TerminalDockIcon />
              </DockItem>

              <DockItem
                name="Mail"
                isOpen={false}
                onClick={() => {
                  window.location.href = 'mailto:patelradhe0168@gmail.com'
                }}
              >
                <MailDockIcon />
              </DockItem>

              <div className="dock-separator" />

              <DockItem
                name="LinkedIn Profile"
                isOpen={false}
                onClick={() => window.open('https://linkedin.com/in/radhepatelrising', '_blank')}
              >
                <LinkedInDockIcon />
              </DockItem>

              <DockItem
                name="GitHub Profile"
                isOpen={false}
                onClick={() => window.open('https://github.com/AgniCompute', '_blank')}
              >
                <GitHubDockIcon />
              </DockItem>

              <DockItem
                name="Trash"
                isOpen={false}
                onClick={() => alert('Trash is empty!')}
              >
                <TrashDockIcon />
              </DockItem>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

// ==========================================
// DESKTOP RECORD PLAYER / TURNTABLE WIDGET
// ==========================================
function DesktopRecordPlayer({ isPlaying, onTogglePlay, trackProgress, onSeek, onClose, onOpenSpotifyWindow }) {
  return (
    <div className="desktop-turntable-widget" role="region" aria-label="Record Player Widget">
      <div className="turntable-header">
        <div className="turntable-badge">
          <span className="vinyl-rpm">33 RPM</span>
          <span className="live-pill">{isPlaying ? '● SPINNING' : '○ IDLE'}</span>
        </div>
        <div className="turntable-header-actions">
          <button
            type="button"
            className="turntable-btn-icon"
            onClick={onOpenSpotifyWindow}
            title="Open Spotify Window"
          >
            ↗
          </button>
          <button
            type="button"
            className="turntable-btn-icon close"
            onClick={onClose}
            aria-label="Hide Widget"
          >
            ×
          </button>
        </div>
      </div>

      <div className="turntable-deck">
        {/* Vinyl Record Player Platter */}
        <div className="turntable-platter-area">
          {/* Spinning Vinyl Disc */}
          <div className={`vinyl-disc ${isPlaying ? 'spinning' : 'paused'}`}>
            <div className="vinyl-groove-ring ring-1" />
            <div className="vinyl-groove-ring ring-2" />
            <div className="vinyl-groove-ring ring-3" />
            <div className="vinyl-reflection" />
            {/* Center Label */}
            <div className="vinyl-center-label">
              <span className="label-artist">ARIJIT SINGH</span>
              <span className="label-title">GEHRA HUA</span>
              <span className="label-sub">DHURANDHAR</span>
              <div className="label-spindle-hole" />
            </div>
          </div>

          {/* Mechanical Tonearm & Stylus Needle */}
          <div className={`tonearm-assembly ${isPlaying ? 'arm-on-record' : 'arm-resting'}`}>
            <div className="tonearm-pivot-base" />
            <div className="tonearm-shaft" />
            <div className="tonearm-cartridge" />
            <div className="tonearm-needle-head" />
          </div>
        </div>

        {/* Track Details & Controls */}
        <div className="turntable-info-area">
          <div className="turntable-meta">
            <span className="turntable-now-label">Full Song Audio</span>
            <h4 className="turntable-title">Gehra Hua</h4>
            <p className="turntable-artist">Shashwat Sachdev, Arijit Singh</p>
          </div>

          {/* Scrubber Progress */}
          <div className="turntable-progress-wrap">
            <span className="time-display">{formatTime(trackProgress.current)}</span>
            <div
              className="turntable-scrubber-track"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
                onSeek(pct)
              }}
            >
              <div
                className="turntable-scrubber-fill"
                style={{ width: `${(trackProgress.current / (trackProgress.duration || 362)) * 100}%` }}
              />
            </div>
            <span className="time-display">{formatTime(trackProgress.duration || 362)}</span>
          </div>

          {/* Interactive Play Controls */}
          <div className="turntable-controls">
            <button
              type="button"
              className={`turntable-play-toggle ${isPlaying ? 'playing' : ''}`}
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Pause Gehra Hua' : 'Play Gehra Hua'}
            >
              {isPlaying ? (
                <>
                  <span className="play-icon">⏸</span>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <span className="play-icon">▶</span>
                  <span>Play</span>
                </>
              )}
            </button>
            <span className="turntable-note">
              {isPlaying ? 'Full Track Playing ♫' : 'Click to start spinning'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// PRE-HUB UI: SUBTLE BLACK FOG TYPEWRITER SCREEN
// ==========================================
// ==========================================
// WINDOW COMPONENT (macOS Chrome)
// ==========================================
function MacWindow({ win, onFocus, onClose, onMinimize, onMaximize, onMouseDownHeader, children }) {
  const isMax = win.isMaximized

  const style = isMax
    ? {
        position: 'absolute',
        top: 32,
        left: 0,
        width: '100%',
        height: 'calc(100% - 100px)',
        zIndex: win.zIndex,
        borderRadius: 0
      }
    : {
        position: 'absolute',
        top: win.y,
        left: win.x,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex
      }

  return (
    <div
      className={`mac-window ${isMax ? 'maximized' : ''}`}
      style={style}
      onMouseDown={onFocus}
      role="dialog"
      aria-label={win.title}
    >
      <div className="mac-window-titlebar" onMouseDown={onMouseDownHeader}>
        <div className="traffic-lights">
          <button
            type="button"
            className="traffic-light close"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Close window"
            title="Close"
          >
            <span className="glyph">×</span>
          </button>
          <button
            type="button"
            className="traffic-light minimize"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            aria-label="Minimize window"
            title="Minimize"
          >
            <span className="glyph">–</span>
          </button>
          <button
            type="button"
            className="traffic-light zoom"
            onClick={(e) => {
              e.stopPropagation()
              onMaximize()
            }}
            aria-label="Zoom window"
            title="Zoom"
          >
            <span className="glyph">+</span>
          </button>
        </div>

        <div className="window-title">
          <span>{win.title}</span>
        </div>

        <div className="window-titlebar-spacer" />
      </div>

      <div className="mac-window-body">{children}</div>
    </div>
  )
}

// ==========================================
// 1. PREVIEW APP (RESUME PDF VIEWER)
// ==========================================
function ResumePreviewApp() {
  const [viewMode, setViewMode] = useState('pdf')
  const [zoom, setZoom] = useState(100)

  return (
    <div className="preview-app-container">
      <div className="preview-toolbar">
        <div className="preview-toolbar-left">
          <div className="mode-pill-toggle">
            <button
              type="button"
              className={viewMode === 'pdf' ? 'active' : ''}
              onClick={() => setViewMode('pdf')}
            >
              Document PDF
            </button>
            <button
              type="button"
              className={viewMode === 'summary' ? 'active' : ''}
              onClick={() => setViewMode('summary')}
            >
              Interactive Overview
            </button>
          </div>
          <span className="preview-page-indicator hide-on-mobile">Page 1 of 1</span>
        </div>

        <div className="preview-toolbar-center hide-on-mobile">
          <button
            type="button"
            className="preview-btn icon-btn"
            onClick={() => setZoom((z) => Math.max(70, z - 10))}
            title="Zoom Out"
          >
            –
          </button>
          <span className="zoom-text">{zoom}%</span>
          <button
            type="button"
            className="preview-btn icon-btn"
            onClick={() => setZoom((z) => Math.min(150, z + 10))}
            title="Zoom In"
          >
            +
          </button>
          <button
            type="button"
            className="preview-btn"
            onClick={() => setZoom(100)}
            title="Reset Zoom"
          >
            Actual Size
          </button>
        </div>

        <div className="preview-toolbar-right">
          <a
            href="./Patel_Radhe_Resume.pdf"
            download="Patel_Radhe_Resume.pdf"
            className="preview-action-btn primary"
            title="Download PDF file"
          >
            <DownloadIcon />
            <span>Download PDF</span>
          </a>
          <a
            href="./Patel_Radhe_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="preview-action-btn secondary"
            title="Open in Full Browser Tab"
          >
            <span>Open in Tab ↗</span>
          </a>
        </div>
      </div>

      <div className="preview-content-area">
        {viewMode === 'pdf' ? (
          <div className="pdf-viewer-wrapper" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
            <iframe
              src="./Patel_Radhe_Resume.pdf#view=FitH&toolbar=0&navpanes=0"
              title="Radhe Patel Resume PDF"
              className="pdf-iframe"
            />
            <div className="pdf-floating-notice">
              <span>Viewing official resume: Patel_Radhe_Resume.pdf</span>
              <a href="./Patel_Radhe_Resume.pdf" download className="download-text-btn">
                Direct Download
              </a>
            </div>
          </div>
        ) : (
          <div className="resume-structured-view">
            <header className="res-header">
              <h1>Radhe Mayankkumar Patel</h1>
              <p className="res-subtitle">Tax Associate &amp; Process Builder | CPA Candidate 2027</p>
              <div className="res-contact-bar">
                <span>Baltimore, MD</span>
                <span>•</span>
                <a href="mailto:patelradhe0168@gmail.com">patelradhe0168@gmail.com</a>
                <span>•</span>
                <a href="https://linkedin.com/in/radhepatelrising" target="_blank" rel="noreferrer">
                  linkedin.com/in/radhepatelrising
                </a>
                <span>•</span>
                <a href="https://github.com/AgniCompute" target="_blank" rel="noreferrer">
                  github.com/AgniCompute
                </a>
              </div>
            </header>

            <section className="res-section">
              <h2>Education</h2>
              <div className="res-item">
                <div className="res-item-row">
                  <strong>Towson University</strong>
                  <span>Expected Spring 2027</span>
                </div>
                <div className="res-item-sub">Bachelor of Science in Accounting (150-credit CPA track)</div>
                <p className="res-note">
                  Cumulative GPA: <strong>3.66 / 4.00</strong> • Dean’s List Spring 2026 • Microsoft Office Specialist: Excel Associate
                </p>
              </div>
            </section>

            <section className="res-section">
              <h2>Professional Experience</h2>
              <div className="res-item">
                <div className="res-item-row">
                  <strong>KBST&amp;M, P.A. — Tax Preparation &amp; Accounting Intern</strong>
                  <span>Feb 2025 – Present</span>
                </div>
                <ul className="res-bullets">
                  <li>
                    Prepare individual (1040), trust (1041), partnership (1065), and corporate (1120/1120S) tax returns.
                  </li>
                  <li>
                    Utilize CCH Axcess, SurePrep, and TaxCaddy for document indexing, lead sheets, and return population.
                  </li>
                  <li>
                    Perform variance analysis and workpaper reconciliation to ensure accuracy prior to manager review.
                  </li>
                </ul>
              </div>

              <div className="res-item">
                <div className="res-item-row">
                  <strong>Varano &amp; Black, CPAs — Tax Intern</strong>
                  <span>Jan 2024 – May 2024</span>
                </div>
                <ul className="res-bullets">
                  <li>
                    Assisted in preparing 100+ federal and multi-state tax returns during peak tax season.
                  </li>
                  <li>
                    Communicated with clients to collect missing documentation, verify K-1 allocations, and log data.
                  </li>
                  <li>
                    Supported general ledger reconciliations and month-end journal entries in QuickBooks.
                  </li>
                </ul>
              </div>
            </section>

            <section className="res-section">
              <h2>Technical &amp; Tax Expertise</h2>
              <div className="res-skills-grid">
                <div>
                  <strong>Tax Returns:</strong>
                  <p>1040, 1041, 1065, 1120, 1120S, 990, K-1/K-2/K-3 Pass-Throughs</p>
                </div>
                <div>
                  <strong>Software &amp; Tools:</strong>
                  <p>CCH Axcess, SurePrep, TaxCaddy, QuickBooks, Microsoft Excel (Advanced), Git</p>
                </div>
                <div>
                  <strong>Languages:</strong>
                  <p>English (Native/Fluent), Gujarati (Bilingual), Hindi (Bilingual)</p>
                </div>
                <div>
                  <strong>Core Competencies:</strong>
                  <p>Workpaper Preparation, Workflow Automation, Tax Research, Review Readiness</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

// ==========================================
// 2. SPOTIFY APP (MUSIC PLAYER)
// ==========================================
function SpotifyApp({ currentTrackId, setCurrentTrackId, spotifyTracks, isPlaying, onTogglePlay, trackProgress, onSeek }) {
  return (
    <div className="spotify-app-container">
      <div className="spotify-top-banner">
        <div className="spotify-brand">
          <SpotifyAppIcon />
          <div>
            <strong>Spotify for macOS</strong>
            <small>Full Audio &amp; Streaming Player</small>
          </div>
        </div>
        <button
          type="button"
          className={`spotify-status-btn ${isPlaying ? 'playing' : ''}`}
          onClick={onTogglePlay}
        >
          <span className="pulse-dot" />
          <span>{isPlaying ? 'Full Audio Playing' : 'Paused — Click to Play'}</span>
        </button>
      </div>

      {/* Real Full-Length Audio Player for Gehra Hua */}
      <div className="gehra-hua-player-card">
        <div className="gh-art-and-info">
          <div className="gh-art">
            <span className="music-note-glyph">♫</span>
          </div>
          <div className="gh-details">
            <span className="gh-badge">Full Song Audio Stream</span>
            <h4>Gehra Hua</h4>
            <p>Shashwat Sachdev, Arijit Singh, Irshad Kamil</p>
          </div>
        </div>

        <div className="gh-scrubber-row">
          <span className="gh-time">{formatTime(trackProgress?.current || 0)}</span>
          <div
            className="gh-scrubber-bar"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
              onSeek(pct)
            }}
          >
            <div
              className="gh-scrubber-fill"
              style={{
                width: `${((trackProgress?.current || 0) / (trackProgress?.duration || 362)) * 100}%`
              }}
            />
          </div>
          <span className="gh-time">{formatTime(trackProgress?.duration || 362)}</span>
        </div>

        <div className="gh-controls-row">
          <button
            type="button"
            className="gh-play-btn"
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸ Pause Gehra Hua' : '▶ Play Gehra Hua'}
          </button>
          <span className="gh-hint">
            {isPlaying ? '● Playing Full Song (Dhurandhar)' : '○ Ready to play'}
          </span>
        </div>
      </div>

      {/* Official Spotify Iframe Player */}
      <div className="spotify-embed-card">
        <iframe
          src={`https://open.spotify.com/embed/track/${currentTrackId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Track Player"
          className="spotify-iframe"
        />
      </div>

      {/* Playlist Selector */}
      <div className="spotify-playlist-section">
        <h3>Radhe's Curated Queue</h3>
        <p className="spotify-desc">Switch tracks or open on Spotify:</p>

        <div className="spotify-track-list">
          {spotifyTracks.map((track) => (
            <button
              key={track.id}
              type="button"
              className={`spotify-track-item ${currentTrackId === track.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentTrackId(track.id)
                if (track.id === '5MCbGWnNLLjoHpbDO3BOgi' && !isPlaying) {
                  onTogglePlay()
                }
              }}
            >
              <div className="track-icon">
                {currentTrackId === track.id && isPlaying ? (
                  <span className="now-playing-icon">▶</span>
                ) : (
                  <span>♫</span>
                )}
              </div>
              <div className="track-meta">
                <strong>{track.title}</strong>
                <span>{track.artist}</span>
              </div>
              <span className="track-album hide-on-mobile">{track.album}</span>
            </button>
          ))}
        </div>

        <div className="spotify-bottom-bar">
          <a
            href={`https://open.spotify.com/track/${currentTrackId}`}
            target="_blank"
            rel="noreferrer"
            className="spotify-open-link"
          >
            Open in Spotify App ↗
          </a>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 3. FINDER APP (PROJECTS & EXPERIENCE)
// ==========================================
function FinderProjectsApp({ projects, onOpenResume }) {
  const [selectedTag, setSelectedTag] = useState('All')
  const [selectedProject, setSelectedProject] = useState(projects[0])

  const allTags = ['All', 'Excel', 'Tax Compliance', 'Process Building', 'Towson Univ']

  const filteredProjects =
    selectedTag === 'All'
      ? projects
      : projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase())))

  return (
    <div className="finder-app-container">
      <aside className="finder-sidebar">
        <div className="finder-sidebar-group">
          <span className="sidebar-group-title">Favorites</span>
          <button
            type="button"
            className={`sidebar-item ${selectedTag === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedTag('All')}
          >
            <span className="sidebar-icon">📁</span>
            <span>All Projects ({projects.length})</span>
          </button>
          <button
            type="button"
            className="sidebar-item"
            onClick={onOpenResume}
          >
            <span className="sidebar-icon">📄</span>
            <span>Resume.pdf</span>
          </button>
        </div>

        <div className="finder-sidebar-group">
          <span className="sidebar-group-title">Tags &amp; Disciplines</span>
          {allTags.slice(1).map((tag) => (
            <button
              key={tag}
              type="button"
              className={`sidebar-item ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              <span className="tag-dot" />
              <span>{tag}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="finder-main-panel">
        <div className="finder-breadcrumb-bar">
          <span className="breadcrumb-segment">Macintosh HD</span>
          <span className="breadcrumb-arrow">›</span>
          <span className="breadcrumb-segment">Users</span>
          <span className="breadcrumb-arrow">›</span>
          <span className="breadcrumb-segment">radhe</span>
          <span className="breadcrumb-arrow">›</span>
          <span className="breadcrumb-segment current">Projects</span>
          <span className="items-count">({filteredProjects.length} items)</span>
        </div>

        <div className="finder-split-view">
          <div className="finder-items-grid">
            {filteredProjects.map((item) => (
              <div
                key={item.id}
                className={`finder-project-card ${selectedProject?.id === item.id ? 'selected' : ''}`}
                onClick={() => setSelectedProject(item)}
              >
                <div className="card-top">
                  <span className="project-emoji">{item.icon}</span>
                  <span className="project-date">{item.date}</span>
                </div>
                <h4>{item.title}</h4>
                <p className="card-excerpt">{item.description.slice(0, 85)}...</p>
                <div className="card-tags">
                  {item.tags.slice(0, 2).map((t) => (
                    <span key={t} className="card-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedProject && (
            <div className="finder-inspector">
              <div className="inspector-icon">{selectedProject.icon}</div>
              <h3>{selectedProject.title}</h3>
              <p className="inspector-meta">{selectedProject.type} • {selectedProject.date}</p>
              <div className="inspector-divider" />
              <p className="inspector-desc">{selectedProject.description}</p>
              <div className="inspector-highlights">
                <strong>Key Deliverables &amp; Impact:</strong>
                <ul>
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
              <div className="inspector-tags">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="tag-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// ==========================================
// 4. SAFARI APP (ABOUT RADHE)
// ==========================================
function SafariAboutApp({ onOpenResume, onOpenProjects, onOpenSpotify }) {
  return (
    <div className="safari-app-container">
      <div className="safari-nav-bar">
        <div className="safari-nav-buttons">
          <button type="button" className="nav-arrow" disabled>
            ‹
          </button>
          <button type="button" className="nav-arrow" disabled>
            ›
          </button>
        </div>

        <div className="safari-address-field">
          <span className="lock-icon">🔒</span>
          <span className="url-text">https://radhepatel.design/about</span>
        </div>

        <div className="safari-actions">
          <button
            type="button"
            className="safari-btn"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'Radhe Patel Portfolio', url: window.location.href })
              } else {
                navigator.clipboard.writeText(window.location.href)
                alert('Portfolio link copied to clipboard!')
              }
            }}
            title="Share"
          >
            ↗
          </button>
        </div>
      </div>

      <div className="safari-page-scroll">
        <div className="safari-content-wrapper">
          <div className="about-hero-section">
            <div className="avatar-ring">
              <div className="avatar-initials">RP</div>
            </div>
            <div className="hero-text">
              <span className="gujarati-signature">રાધે પટેલ · RADHE_OS</span>
              <span className="hero-badge">Tax Associate &amp; Process Builder</span>
              <h1>Radhe Mayankkumar Patel</h1>
              <p className="hero-bio">
                CPA-track accounting senior at <strong>Towson University</strong> (GPA 3.66, Spring 2027) combining
                tax compliance experience across individual, trust, partnership, and corporate returns with a passion
                for software tooling, process automation, and spotless workpaper preparation.
              </p>
              <div className="hero-cta-row">
                <button type="button" className="btn-primary" onClick={onOpenResume}>
                  Open Full Resume (PDF)
                </button>
                <button type="button" className="btn-secondary" onClick={onOpenProjects}>
                  View Excel &amp; Tax Projects
                </button>
                <button type="button" className="btn-secondary" onClick={onOpenSpotify}>
                  Play Focus Beats ♫
                </button>
              </div>
            </div>
          </div>

          <div className="about-cards-grid">
            <div className="about-card">
              <div className="card-badge">01</div>
              <h3>Tax Compliance &amp; Review</h3>
              <p>
                Two tax seasons of hands-on preparation across <strong>Forms 1040, 1041, 1065, 1120, 1120S, and 990</strong>.
                Proficient in <strong>CCH Axcess</strong>, <strong>SurePrep</strong>, and <strong>TaxCaddy</strong>.
              </p>
            </div>

            <div className="about-card">
              <div className="card-badge">02</div>
              <h3>Process &amp; Workflow Automation</h3>
              <p>
                Certified <strong>Microsoft Office Specialist: Excel Associate</strong>. I build automated reconciliation models,
                lead schedules, and diagnostic checklists that cut down reviewer turnaround time.
              </p>
            </div>

            <div className="about-card">
              <div className="card-badge">03</div>
              <h3>Academic Background</h3>
              <p>
                Pursuing a B.S. in Accounting at Towson University on the 150-credit CPA track. Recognized on the
                <strong>Dean’s List Spring 2026</strong> with a <strong>3.66 / 4.00 cumulative GPA</strong>.
              </p>
            </div>

            <div className="about-card">
              <div className="card-badge">04</div>
              <h3>Multilingual Communication</h3>
              <p>
                Bilingual fluency in <strong>English</strong>, <strong>Gujarati</strong>, and <strong>Hindi</strong>.
                Effective cross-functional communicator with clients, tax managers, and technical peers.
              </p>
            </div>
          </div>

          <div className="about-contact-section">
            <div className="contact-info">
              <h3>Let's Connect</h3>
              <p>Looking for tax associate, accounting, or process development opportunities.</p>
            </div>
            <div className="contact-links">
              <a href="mailto:patelradhe0168@gmail.com" className="contact-link mail">
                ✉ patelradhe0168@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/radhepatelrising"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/AgniCompute"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 5. TERMINAL APP (INTERACTIVE CLI)
// ==========================================
function TerminalApp({ onOpenResume, onOpenSpotify, onOpenFinder, onOpenAbout }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Last login: ' + new Date().toLocaleDateString() + ' on ttys001' },
    { type: 'system', text: 'Welcome to RadheOS Interactive Shell. Type "help" to see available commands.' }
  ])
  const [inputVal, setInputVal] = useState('')
  const terminalBottomRef = useRef(null)

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return
    const trimmed = inputVal.trim()
    const cmd = trimmed.toLowerCase()

    const newHistory = [...history, { type: 'prompt', text: `radhe@macbook-pro ~ % ${trimmed}` }]

    if (!cmd) {
      setHistory(newHistory)
      setInputVal('')
      return
    }

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available commands:
  • help          - List all commands
  • resume        - Open official PDF resume in Preview.app
  • projects      - Open Excel & Tax projects in Finder
  • about         - View biography and background in Safari
  • spotify       - Launch Spotify audio player
  • skills        - Print technical & tax accounting skills
  • contact       - Show email, LinkedIn, and GitHub links
  • whoami        - Print developer bio
  • clear         - Clear terminal screen`
        })
        break

      case 'resume':
        newHistory.push({ type: 'output', text: 'Opening Patel_Radhe_Resume.pdf in Preview.app...' })
        onOpenResume()
        break

      case 'projects':
      case 'finder':
        newHistory.push({ type: 'output', text: 'Opening Projects in Finder...' })
        onOpenFinder()
        break

      case 'ls':
        newHistory.push({
          type: 'output',
          text: `Projects in /Users/radhe/Projects:
  [DIR]   Excel-Tax-Automation
  [DIR]   FlowThrough-K1-Allocations
  [DIR]   SurePrep-Workflow-Optimization
  [DIR]   Towson-Accounting-CaseStudies
  [FILE]  Patel_Radhe_Resume.pdf
  [AUDIO] gehra_hua.webm (Full Song)
  [AUDIO] gehra_hua.m4a (Full Song)`
        })
        break

      case 'about':
        newHistory.push({ type: 'output', text: 'Opening About Radhe in Safari...' })
        onOpenAbout()
        break

      case 'spotify':
      case 'play':
      case 'music':
        newHistory.push({ type: 'output', text: 'Launching Spotify audio player and Gehra Hua...' })
        onOpenSpotify()
        break

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Technical & Accounting Matrix:
  Tax Forms:     1040, 1041, 1065, 1120, 1120S, 990, K-1 / K-2 / K-3
  Software:      CCH Axcess, SurePrep, TaxCaddy, QuickBooks, MS Excel (Associate)
  Programming:   JavaScript, React, Vite, HTML/CSS, Git
  Languages:     English (Fluent), Gujarati (Bilingual), Hindi (Bilingual)`
        })
        break

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Contact Information:
  Email:    patelradhe0168@gmail.com
  LinkedIn: https://linkedin.com/in/radhepatelrising
  GitHub:   https://github.com/AgniCompute`
        })
        break

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: 'Radhe Mayankkumar Patel: CPA-track accounting senior at Towson University & tax process builder.'
        })
        break

      case 'clear':
        setHistory([])
        setInputVal('')
        return

      default:
        newHistory.push({
          type: 'output',
          text: `zsh: command not found: ${cmd}. Type "help" for a list of valid commands.`
        })
        break
    }

    setHistory(newHistory)
    setInputVal('')
  }

  return (
    <div className="terminal-app-container">
      <div className="terminal-body">
        {history.map((item, idx) => (
          <div key={idx} className={`terminal-line ${item.type}`}>
            {item.text}
          </div>
        ))}

        <div className="terminal-input-row">
          <span className="terminal-prompt">radhe@macbook-pro ~ % </span>
          <input
            type="text"
            className="terminal-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            spellCheck="false"
          />
        </div>
        <div ref={terminalBottomRef} />
      </div>
    </div>
  )
}

// ==========================================
// DOCK ITEM COMPONENT
// ==========================================
function DockItem({ name, isOpen, onClick, children }) {
  return (
    <div className="dock-item-wrapper">
      <button className="dock-item-btn" type="button" onClick={onClick} aria-label={name}>
        {children}
        <span className="dock-tooltip">{name}</span>
      </button>
      {isOpen && <span className="dock-dot" />}
    </div>
  )
}

// ==========================================
// ICONS (High-fidelity SVGs)
// ==========================================
function AppleIcon() {
  return (
    <svg viewBox="0 0 170 170" width="14" height="14" fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.7-11.7-13.98-5.99-9.13-10.7-19.6-14.13-31.42-3.43-11.81-5.14-22.9-5.14-33.27 0-14.35 3.63-26.35 10.89-36 7.26-9.65 16.73-14.59 28.43-14.81 5.33 0 11.2 1.34 17.61 4.02 6.41 2.68 10.28 4.07 11.61 4.17 1.52-.1 5.56-1.55 12.12-4.34 6.56-2.8 12.18-4.08 16.86-3.85 12.5.65 22.5 5.25 30 13.8-10.87 6.52-16.19 15.65-15.97 27.39.22 9.13 3.75 16.9 10.59 23.32 6.85 6.41 15.05 10.11 24.62 11.1-2.17 6.74-4.78 13.53-7.83 20.37zM119.22 31.84c0-7.39 2.66-14.46 7.99-21.2C132.53 3.9 139.1.53 146.92 0c.22 1.09.33 2.17.33 3.26 0 7.39-2.83 14.57-8.48 21.52-5.65 6.96-12.5 10.76-20.55 11.41-.44-1.41-.66-2.71-.66-4.35z" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="22" height="12" viewBox="0 0 24 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="19" height="11" rx="2.5" />
      <rect x="3" y="3" width="15" height="7" fill="currentColor" rx="1.5" />
      <path d="M21 5v3" strokeWidth="2" />
    </svg>
  )
}

function ControlCenterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="6" rx="3" />
      <circle cx="8" cy="7" r="2" fill="currentColor" />
      <rect x="3" y="14" width="18" height="6" rx="3" />
      <circle cx="16" cy="17" r="2" fill="currentColor" />
    </svg>
  )
}

function BluetoothIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SpotifySmallIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#1db954">
      <circle cx="12" cy="12" r="12" />
      <path
        d="M17.5 15.8c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.8-9.3-1-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 4-.9 7.5-.5 10.3 1.2.4.2.4.6.3.8zm1.2-2.7c-.3.4-.8.5-1.2.3-2.8-1.7-7.2-2.2-10.5-1.2-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.8-1.2 8.6-.6 11.9 1.4.4.2.5.7.3 1zm.1-2.8C15.4 8.3 9.9 8.1 6.7 9.1c-.5.2-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 3.8-1.1 9.8-.9 13.8 1.4.5.3.6.9.3 1.4-.3.4-.9.5-1.4.2z"
        fill="#000"
      />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function MacbookProIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" />
      <path d="M2 19h20M9 16h6" stroke="currentColor" strokeLinecap="round" />
    </svg>
  )
}

function PdfFileIcon() {
  return (
    <svg width="54" height="54" viewBox="0 0 64 64" fill="none">
      <rect x="10" y="4" width="44" height="56" rx="6" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1.5" />
      <path d="M38 4v16h16" fill="#e8eaed" />
      <path d="M38 4l16 16H38z" fill="#d2d5d9" />
      <rect x="8" y="30" width="48" height="18" rx="3" fill="#e53935" />
      <text x="32" y="43" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
        PDF
      </text>
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
      <path
        d="M6 14C6 11.7909 7.79086 10 10 10H24L30 16H54C56.2091 16 58 17.7909 58 20V50C58 52.2091 56.2091 54 54 54H10C7.79086 54 6 52.2091 6 50V14Z"
        fill="#2680eb"
      />
      <path
        d="M6 24C6 21.7909 7.79086 20 10 20H54C56.2091 20 58 21.7909 58 24V50C58 52.2091 56.2091 54 54 54H10C7.79086 54 6 52.2091 6 50V24Z"
        fill="#66afff"
      />
    </svg>
  )
}

function SafariAppIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="#ffffff" />
      <circle cx="32" cy="32" r="26" fill="url(#safari-grad)" />
      <path d="M32 14v4M32 46v4M14 32h4M46 32h4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <polygon points="36,28 44,20 28,36 20,44" fill="#ff3b30" />
      <polygon points="28,36 20,44 36,28" fill="#ffffff" />
      <defs>
        <linearGradient id="safari-grad" x1="0" y1="0" x2="64" y2="64">
          <stop stopColor="#007aff" />
          <stop offset="1" stopColor="#00c6ff" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function SpotifyAppIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="#121212" />
      <circle cx="32" cy="32" r="23" fill="#1db954" />
      <path
        d="M42 39.5c-.4.6-1.2.8-1.8.4-4.8-2.9-10.8-3.5-17.9-1.9-.7.2-1.4-.3-1.6-1-.2-.7.3-1.4 1-1.6 7.7-1.8 14.4-1 19.9 2.3.6.4.8 1.2.4 1.8zm2.4-5.3c-.5.8-1.5 1-2.3.5-5.5-3.4-14-4.4-20.5-2.4-.9.3-1.8-.2-2.1-1.1-.3-.9.2-1.8 1.1-2.1 7.4-2.3 16.8-1.2 23.3 2.8.8.5 1 1.5.5 2.3zm.2-5.5C39.4 24.5 28.7 24.1 22.4 26c-1 .3-2.1-.3-2.4-1.3-.3-1 .3-2.1 1.3-2.4 7.4-2.2 19.2-1.8 27.1 2.9 1 .6 1.3 1.9.7 2.9-.6.9-1.9 1.2-2.9.6z"
        fill="#000000"
      />
    </svg>
  )
}

function TerminalAppIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="#202124" stroke="#3c4043" strokeWidth="1.5" />
      <text x="14" y="38" fill="#34a853" fontSize="20" fontWeight="bold" fontFamily="monospace">
        &gt;_
      </text>
      <rect x="38" y="26" width="10" height="3" fill="#ffffff" />
    </svg>
  )
}

function FinderDockIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="#ffffff" />
      <path
        d="M32 6C17.64 6 6 17.64 6 32s11.64 26 26 26c1.8 0 3.5-.2 5.2-.5-1.4-2-2.2-4.5-2.2-7.5 0-6.6 5.4-12 12-12 3 0 5.5.8 7.5 2.2.3-1.7.5-3.4.5-5.2 0-14.36-11.64-26-26-26z"
        fill="#1c75bc"
      />
      <path
        d="M32 6C46.36 6 58 17.64 58 32c0 1.8-.2 3.5-.5 5.2-2-1.4-4.5-2.2-7.5-2.2-6.6 0-12 5.4-12 12 0 3 .8 5.5 2.2 7.5-1.7.3-3.4.5-5.2.5-14.36 0-26-11.64-26-26S20.64 6 32 6z"
        fill="#64b5f6"
      />
      <circle cx="24" cy="26" r="3.5" fill="#1d1d1f" />
      <circle cx="40" cy="26" r="3.5" fill="#1d1d1f" />
      <path d="M22 38c3 5 17 5 20 0" stroke="#1d1d1f" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function PreviewDockIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="#2d68c4" />
      <circle cx="28" cy="28" r="14" fill="#ffffff" stroke="#90caf9" strokeWidth="3" />
      <line x1="38" y1="38" x2="52" y2="52" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
      <text x="28" y="32" fill="#1565c0" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        PDF
      </text>
    </svg>
  )
}

function SafariDockIcon() {
  return <SafariAppIcon />
}

function SpotifyDockIcon() {
  return <SpotifyAppIcon />
}

function TerminalDockIcon() {
  return <TerminalAppIcon />
}

function MailDockIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="#007aff" />
      <path d="M12 20h40v24H12z" fill="#ffffff" rx="3" />
      <polyline points="12,21 32,35 52,21" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function LinkedInDockIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="#0a66c2" />
      <path
        d="M22 28v16h-5V28h5zm-2.5-8c1.6 0 2.5 1 2.5 2.4 0 1.3-.9 2.4-2.5 2.4s-2.5-1.1-2.5-2.4c0-1.4 1-2.4 2.5-2.4zM47 44h-5v-8c0-2-.7-3.4-2.5-3.4-1.4 0-2.2.9-2.5 1.8-.1.3-.1.8-.1 1.2V44h-5s.1-14.5 0-16h5v2.3c.7-1 1.8-2.5 4.6-2.5 3.3 0 5.8 2.2 5.8 7v9.2z"
        fill="#ffffff"
      />
    </svg>
  )
}

function GitHubDockIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="#24292e" />
      <path
        d="M32 14c-9.9 0-18 8.1-18 18 0 7.9 5.1 14.7 12.3 17.1.9.2 1.2-.4 1.2-.9v-3.4c-5 1.1-6.1-2.4-6.1-2.4-.8-2.1-2-2.6-2-2.6-1.6-1.1.1-1.1.1-1.1 1.8.1 2.8 1.9 2.8 1.9 1.6 2.8 4.2 2 5.2 1.5.2-1.2.6-2 1.2-2.5-4-.5-8.2-2-8.2-8.9 0-2 .7-3.6 1.9-4.8-.2-.5-.8-2.3.2-4.7 0 0 1.5-.5 5 1.9 1.4-.4 3-.6 4.5-.6s3.1.2 4.5.6c3.5-2.4 5-1.9 5-1.9 1 2.4.4 4.2.2 4.7 1.2 1.2 1.9 2.8 1.9 4.8 0 6.9-4.2 8.4-8.2 8.9.7.6 1.3 1.7 1.3 3.5v5.1c0 .5.3 1.1 1.2.9C44.9 46.7 50 39.9 50 32c0-9.9-8.1-18-18-18z"
        fill="#ffffff"
      />
    </svg>
  )
}

function TrashDockIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill="#8e8e93" />
      <path d="M22 22h20v24a3 3 0 0 1-3 3H25a3 3 0 0 1-3-3V22z" fill="#ffffff" />
      <path d="M19 18h26v3H19zM28 15h8v3h-8z" fill="#ffffff" />
      <line x1="27" y1="26" x2="27" y2="43" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="26" x2="32" y2="43" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round" />
      <line x1="37" y1="26" x2="37" y2="43" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
