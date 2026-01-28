"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronRight, Coffee, Download } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "UzaBidhaa Marketplace",
    description: "Local marketplace for buyers and sellers in Kenya. Real-time messaging, product listings, payment integration.",
    image: "/images/uzabidhaa-project.png",
    url: "https://uzabidhaa.com",
    tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Node.js"],
    category: "E-commerce Platform",
  },
  {
    id: 2,
    title: "CelebrateWith.me",
    description: "Online gifting web app for sending surprise gifts. Supports user events, secure monetary gifts, integrated payment & delivery tracking.",
    image: "/images/celebrate-project.png",
    url: "https://giftme-orpin.vercel.app/",
    tech: ["Next.js", "MongoDB", "Payment API", "Delivery API"],
    category: "Gifting Platform",
  },
  {
    id: 3,
    title: "Habnet Solutions",
    description: "Corporate website for a systems & supply firm. Showcases services, company values, legal documents, and project structure.",
    image: "/images/habnet-project.png",
    url: "https://habnet-nu.vercel.app/",
    tech: ["React", "CSS", "Animation", "Responsive Design"],
    category: "Corporate Website",
  },
  {
    id: 4,
    title: "WeightWise",
    description: "Fitness and health tracker app. Lets users log measurements, track progress with charts, and form healthy habits.",
    image: "/images/weightwise-project.png",
    url: "https://weight-wise-sigma.vercel.app/",
    tech: ["React", "Vercel", "D3.js/Chart.js", "MongoDB"],
    category: "Health & Fitness",
  },
  {
    id: 5,
    title: "Unwind Business Enterprise",
    description: "Corporate travel & logistics platform offering business safaris, trade tours, global shipping, and travel booking services for international business expansion.",
    image: "/images/unwind.png",
    url: "https://www.unwindbusinessenterprise.com",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
    category: "Business & Logistics",
  },
  {
    id: 6,
    title: "Lindatoto",
    description: "Healthcare immunization tracking application with hospital inventory management. Tracks patient vaccination records, monitors vaccine stock levels, and generates immunization reports.",
    image: "/images/lindatoto.png",
    url: "https://lindatoto.com",
    tech: ["React", "Database Management", "Healthcare APIs", "Reporting"],
    category: "Healthcare System",
  },
]

const skills = {
  languages: [
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "SQL", level: 75 },
  ],
  frameworks: [
    { name: "React.js", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 88 },
  ],
  backend: [
    { name: "MongoDB", level: 80 },
    { name: "Supabase", level: 75 },
    { name: "Paystack API", level: 85 },
    { name: "Daraja API", level: 80 },
  ],
  it: [
    { name: "Network Administration", level: 80 },
    { name: "System Troubleshooting", level: 85 },
    { name: "Hardware & Software Support", level: 82 },
    { name: "Cloud Services", level: 75 },
  ],
  cybersecurity: [
    { name: "Security Principles", level: 80 },
    { name: "Threat Analysis", level: 75 },
    { name: "Secure Coding", level: 78 },
    { name: "Network Security", level: 75 },
  ],
  other: [
    { name: "Git", level: 85 },
    { name: "Responsive Design", level: 90 },
    { name: "REST APIs", level: 85 },
    { name: "Project Management", level: 75 },
  ],
}

const contacts = {
  email: "collinsaruse@gmail.com",
  github: "https://github.com/Collinsarusei",
  linkedin: "https://www.linkedin.com/in/collins-arusei-b5b74a2a9",
  instagram: "https://instagram.com/chemoget_collo",
  university: "Dedan Kimathi University of Technology (2023–Present)",
  interests: "Content Creation, Hiking, Chess, Music, Watching Military Movies"
}

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'projects' | 'project-detail' | 'skills' | 'contacts'>('dashboard')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [typedText, setTypedText] = useState('')
  const [leftPanelText, setLeftPanelText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState<string[]>([])
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [imageReveal, setImageReveal] = useState(0)
  const [radarAngle, setRadarAngle] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const fullText = `> COLLINS ARUSEI // SOFTWARE DEVELOPER
> CLEARANCE: ALPHA LEVEL
> SPECIALIZATION: FULL-STACK DEVELOPMENT
> LOCATION: KENYA // OPERATIONS BASE
> STATUS: ACTIVE // MISSION READY`

  const leftPanelFullText = `ID: C.A-2047
STATUS: ACTIVE
CLEARANCE: ALPHA LEVEL
SPECIALIZATION: SOFTWARE DEVELOPER
LOCATION: KENYA - OPERATIONS BASE`

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4
      audioRef.current.currentTime = 0
      audioRef.current.play().then(() => {
        setAudioEnabled(true)
        console.log('Audio playing successfully')
        
        // Get audio duration for radar synchronization
        if (audioRef.current?.duration && !audioDuration) {
          setAudioDuration(audioRef.current.duration)
          console.log('Audio duration:', audioRef.current.duration)
        }
      }).catch(err => {
        console.log('Audio play failed:', err)
        // Try multiple approaches for autoplay
        attemptAutoplay()
      })
    }
  }

  const stopAudio = () => {
    if (audioRef.current && audioEnabled) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setAudioEnabled(false)
      setRadarAngle(0) // Reset radar
      console.log('Audio stopped')
    }
  }

  const attemptAutoplay = () => {
    // Method 1: Try with muted then unmute
    if (audioRef.current) {
      audioRef.current.muted = true
      audioRef.current.play().then(() => {
        console.log('Muted autoplay successful, unmuting...')
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.muted = false
            setAudioEnabled(true)
          }
        }, 100)
      }).catch(err => {
        console.log('Muted autoplay failed:', err)
        // Method 2: Try with user interaction detection
        setupUserInteractionPlay()
      })
    }
  }

  const setupUserInteractionPlay = () => {
    const playOnFirstInteraction = () => {
      if (audioRef.current && !audioEnabled) {
        audioRef.current.volume = 0.3
        audioRef.current.play().then(() => {
          setAudioEnabled(true)
          console.log('Audio playing on first user interaction')
        }).catch(e => console.log('Audio still failed:', e))
        // Remove listeners after first interaction
        document.removeEventListener('click', playOnFirstInteraction)
        document.removeEventListener('keydown', playOnFirstInteraction)
        document.removeEventListener('mousemove', playOnFirstInteraction)
        document.removeEventListener('scroll', playOnFirstInteraction)
      }
    }
    
    // Try multiple interaction types
    document.addEventListener('click', playOnFirstInteraction, { once: true })
    document.addEventListener('keydown', playOnFirstInteraction, { once: true })
    document.addEventListener('mousemove', playOnFirstInteraction, { once: true })
    document.addEventListener('scroll', playOnFirstInteraction, { once: true })
  }

  const forcePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.volume = 0.5
      audioRef.current.play().then(() => {
        setAudioEnabled(true)
        console.log('Force play successful')
      }).catch(err => {
        console.log('Force play failed:', err)
      })
    }
  }

  const downloadResume = () => {
    // Stop audio before opening resume
    stopAudio()
    // Try to open the resume generation route
    window.open('/generate-resume', '_blank')
  }

  // Radar animation effect - controls audio
  useEffect(() => {
    if (currentView === 'dashboard') {
      // Reset radar angle
      setRadarAngle(0)
      
      // Start radar sweep and audio together
      const startRadarAndAudio = async () => {
        // Try to start audio immediately
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.volume = 0.4
          audioRef.current.muted = false
          
          // Force reload and play immediately
          try {
            await audioRef.current.load()
            console.log('Audio loaded for radar control')
            
            // Play immediately
            const playPromise = audioRef.current.play()
            if (playPromise !== undefined) {
              playPromise.then(() => {
                setAudioEnabled(true)
                console.log('Audio playing with radar control')
              }).catch(err => {
                console.log('Direct play failed, trying muted approach:', err)
                // Try muted approach
                audioRef.current!.muted = true
                audioRef.current!.play().then(() => {
                  setTimeout(() => {
                    if (audioRef.current) {
                      audioRef.current.muted = false
                      setAudioEnabled(true)
                      console.log('Audio playing after unmute')
                    }
                  }, 100)
                }).catch(e => {
                  console.log('Muted approach failed:', e)
                  setupUserInteractionPlay()
                })
              })
            }
          } catch (err) {
            console.log('Audio load failed:', err)
            setupUserInteractionPlay()
          }
        }

        // Start radar sweep animation immediately
        const radarInterval = setInterval(() => {
          setRadarAngle(prevAngle => {
            const newAngle = prevAngle + 2 // Rotate 2 degrees every 50ms
            
            // Stop when radar completes full rotation (360 degrees)
            if (newAngle >= 360) {
              clearInterval(radarInterval)
              stopAudio() // Stop audio when radar completes
              return 360 // Set to final position
            }
            
            return newAngle
          })
        }, 50) // Update every 50ms for smooth rotation

        return () => clearInterval(radarInterval)
      }

      // Start radar and audio immediately on page load - no delay
      startRadarAndAudio()
    }
  }, [currentView])

  // Cleanup audio when leaving dashboard
  useEffect(() => {
    if (currentView !== 'dashboard') {
      stopAudio()
    }
  }, [currentView])

  useEffect(() => {
    if (currentView === 'dashboard') {
      // Reset states
      setImageReveal(0)
      setTypedText('')
      setLeftPanelText('')
      // Note: Audio and radar are controlled by separate useEffect

      // Main text typing animation
      let index = 0
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index))
          index++
        } else {
          clearInterval(interval)
          // Note: Audio is controlled by radar, not by typing completion
        }
      }, 30)

      // Left panel typing animation
      let leftIndex = 0
      const leftInterval = setInterval(() => {
        if (leftIndex <= leftPanelFullText.length) {
          setLeftPanelText(leftPanelFullText.slice(0, leftIndex))
          leftIndex++
        } else {
          clearInterval(leftInterval)
        }
      }, 40)

      // Image reveal animation
      let revealIndex = 0
      const revealInterval = setInterval(() => {
        if (revealIndex <= 100) {
          setImageReveal(revealIndex)
          revealIndex += 2
        } else {
          clearInterval(revealInterval)
        }
      }, 50)

      return () => {
        clearInterval(interval)
        clearInterval(leftInterval)
        clearInterval(revealInterval)
        // Note: Audio cleanup is handled by radar useEffect
      }
    }
  }, [currentView])

  useEffect(() => {
    if (currentView === 'projects') {
      setTerminalHistory([
        '> SYSTEM: Loading project database...',
        '> DATABASE: Connected successfully',
        '> FOUND: 6 active projects',
        '> Please select a project number (1-6):'
      ])
    }
  }, [currentView])

  useEffect(() => {
    if (currentView === 'skills') {
      const skillsText = `> SYSTEM CAPABILITIES // TECHNICAL_SKILLS
> 
> LANGUAGES:
> JavaScript: 90% | TypeScript: 85% | Node.js: 80% | SQL: 75%
> 
> FRAMEWORKS:
> React.js: 90% | Next.js: 85% | Tailwind CSS: 88%
> 
> BACKEND:
> MongoDB: 80% | Supabase: 75% | Paystack API: 85% | Daraja API: 80%
> 
> IT INFRASTRUCTURE:
> Network Administration: 80% | System Troubleshooting: 85% | Hardware & Software Support: 82% | Cloud Services: 75%
> 
> CYBERSECURITY:
> Security Principles: 80% | Threat Analysis: 75% | Secure Coding: 78% | Network Security: 75%
> 
> OTHER SKILLS:
> Git: 85% | Responsive Design: 90% | REST APIs: 85% | Project Management: 75%
> 
> COMMAND: Type 'back' to return to dashboard`
      
      let index = 0
      setTypedText('')
      const interval = setInterval(() => {
        if (index <= skillsText.length) {
          setTypedText(skillsText.slice(0, index))
          index++
        } else {
          clearInterval(interval)
        }
      }, 15)
      return () => clearInterval(interval)
    }
  }, [currentView])

  useEffect(() => {
    if (currentView === 'contacts') {
      // Don't use typing animation for contacts - show static content with clickable links
      setTypedText(`> COMMUNICATION_PROTOCOLS // CONTACT_INFORMATION
> 
> PRIMARY CONTACT:
> Email: collinsaruse@gmail.com
> 
> PROFESSIONAL NETWORKS:
> GitHub: https://github.com/Collinsarusei
> LinkedIn: https://www.linkedin.com/in/collins-arusei-b5b74a2a9
> 
> SOCIAL CHANNEL:
> Instagram: https://instagram.com/chemoget_collo
> 
> ACADEMIC INFO:
> University: Dedan Kimathi University of Technology (2023–Present)
> 
> PERSONAL INTERESTS:
> Content Creation, Hiking, Chess, Music
> 
> COMMAND: Type 'back' to return to dashboard`)
    }
  }, [currentView])

  useEffect(() => {
    if (selectedProject && currentView === 'project-detail') {
      const projectText = `> LOADING PROJECT: ${selectedProject.title}
> CATEGORY: ${selectedProject.category}
> STATUS: ACTIVE
> TECHNOLOGIES: ${selectedProject.tech.join(' | ')}
> DESCRIPTION: ${selectedProject.description}
> URL: ${selectedProject.url}
> COMMAND: Type 'back' to return to project list`
      
      let index = 0
      setTypedText('')
      const interval = setInterval(() => {
        if (index <= projectText.length) {
          setTypedText(projectText.slice(0, index))
          index++
        } else {
          clearInterval(interval)
        }
      }, 20)
      return () => clearInterval(interval)
    }
  }, [selectedProject, currentView])

  const handleAccessProjects = () => {
    setCurrentView('projects')
    setUserInput('')
  }

  const handleAccessSkills = () => {
    setCurrentView('skills')
    setUserInput('')
    setTypedText('')
  }

  const handleAccessContacts = () => {
    setCurrentView('contacts')
    setUserInput('')
    setTypedText('')
  }

  const handleProjectSelect = (input: string) => {
    const projectNum = parseInt(input)
    if (projectNum >= 1 && projectNum <= projects.length) {
      const project = projects[projectNum - 1]
      setSelectedProject(project)
      setCurrentView('project-detail')
      setTerminalHistory(prev => [...prev, `> SELECTED: Project ${projectNum} - ${project.title}`])
    } else if (input.toLowerCase() === 'back') {
      setCurrentView('dashboard')
      setTypedText('')
      setUserInput('')
    } else {
      setTerminalHistory(prev => [...prev, `> ERROR: Invalid selection. Please enter 1-6 or 'back'`])
    }
    setUserInput('')
  }

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentView === 'projects') {
      setTerminalHistory(prev => [...prev, `> ${userInput}`])
      handleProjectSelect(userInput)
    } else if (currentView === 'project-detail' && userInput.toLowerCase() === 'back') {
      setCurrentView('projects')
      setSelectedProject(null)
      setTypedText('')
      setUserInput('')
      setTerminalHistory([
        '> SYSTEM: Loading project database...',
        '> DATABASE: Connected successfully',
        '> FOUND: 6 active projects',
        '> Please select a project number (1-6):'
      ])
    } else if ((currentView === 'skills' || currentView === 'contacts') && userInput.toLowerCase() === 'back') {
      setCurrentView('dashboard')
      setTypedText('')
      setUserInput('')
    }
  }

  useEffect(() => {
    // Only auto-focus on desktop, not mobile to avoid keyboard popup issues
    if (inputRef.current && window.innerWidth > 1024) {
      inputRef.current.focus()
    }
  }, [currentView])

  if (currentView === 'dashboard') {
    return (
      <div 
        className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative"
      >
        {/* Audio Element */}
        <audio 
          ref={audioRef} 
          src="/Audio/websiteaudio.mp3" 
          preload="auto" 
          onError={(e) => console.log('Audio error:', e)}
          onLoadStart={() => console.log('Audio loading...')}
          onCanPlay={() => console.log('Audio can play')}
          onLoadedData={() => console.log('Audio data loaded')}
          onLoadedMetadata={() => console.log('Audio metadata loaded')}
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-black to-green-900/10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50 animate-pulse" 
               style={{ animation: 'scan 8s linear infinite' }}></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
          {/* Left side - Profile */}
          <div className="w-full lg:w-1/3 border-r lg:border-r border-green-400/30 p-4 lg:p-8 flex flex-col">
            {/* Profile Image */}
            <div className="mb-4 lg:mb-6">
              <div className="relative mx-auto lg:mx-0 w-32 h-32 lg:w-48 lg:h-48 border-2 border-green-400 overflow-hidden">
                <div className="relative w-full h-full">
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ 
                      clipPath: `inset(0 0 ${100 - imageReveal}% 0)`
                    }}
                  >
                    <Image
                      src="/images/my image .jpeg"
                      alt="Collins Arusei"
                      fill
                      className="object-cover"
                      priority
                      style={{ 
                        objectPosition: 'center 45%'
                      }}
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-400 animate-pulse"></div>
              </div>
            </div>

            {/* ID Info */}
            <div className="space-y-2 text-sm mb-4 lg:mb-6">
              <pre className="text-xs leading-relaxed whitespace-pre-wrap">
                {leftPanelText}
                <span className="animate-pulse">_</span>
              </pre>
            </div>

            {/* Download Resume Button */}
            <div className="mb-4">
              <button
                onClick={downloadResume}
                className="w-full px-3 py-2 bg-green-400/20 border border-green-400/50 text-green-400 text-xs rounded hover:bg-green-400/30 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-3 h-3" />
                DOWNLOAD RESUME
              </button>
            </div>

            {/* Bottom info */}
            <div className="mt-auto text-xs space-y-1 text-center lg:text-left">
              <div>SPECIALIZATION: FULL-STACK DEVELOPER </div>
              <div>LOCATION: KENYA - OPERATIONS BASE</div>
            </div>
          </div>

          {/* Right side - Main Content */}
          <div className="flex-1 p-4 lg:p-8 flex flex-col">
            {/* Header */}
            <div className="mb-6 lg:mb-8 text-center lg:text-left">
              <h1 className="text-2xl lg:text-4xl font-bold mb-2">COLLINS ARUSEI</h1>
              <div className="text-lg lg:text-xl text-green-300">SOFTWARE DEVELOPER / UI SYSTEMS DESIGNER</div>
            </div>

            {/* Typed Content */}
            <div className="flex-1 flex flex-col lg:flex-row">
              <div className="flex-1 mb-4 lg:mb-0">
                <pre className="text-xs lg:text-sm leading-relaxed whitespace-pre-wrap">
                  {typedText}
                  <span className="animate-pulse">_</span>
                </pre>
              </div>
              
              {/* Radar Display */}
              <div className="ml-0 lg:ml-8 flex items-start justify-center pt-4 lg:pt-12">
                <div className="relative w-32 h-32 lg:w-40 lg:h-40 border-2 border-green-400/70 rounded-full bg-black/50 mb-4 lg:mb-8">
                  {/* Radar circles */}
                  <div className="absolute inset-0 border border-green-400/40 rounded-full"></div>
                  <div className="absolute inset-2 border border-green-400/30 rounded-full"></div>
                  <div className="absolute inset-4 border border-green-400/20 rounded-full"></div>
                  <div className="absolute inset-6 border border-green-400/15 rounded-full"></div>
                  <div className="absolute inset-8 border border-green-400/10 rounded-full"></div>
                  
                  {/* Cross lines */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-green-400/20"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-400/20"></div>
                  
                  {/* Degree markings */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs lg:text-xs text-green-400/60">0°</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 text-xs lg:text-xs text-green-400/60">180°</div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 text-xs lg:text-xs text-green-400/60">270°</div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 text-xs lg:text-xs text-green-400/60">90°</div>
                  
                  {/* Diagonal lines */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-green-400/10 origin-left" style={{transform: 'translateY(-50%) rotate(45deg)'}}></div>
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-green-400/10 origin-left" style={{transform: 'translateY(-50%) rotate(-45deg)'}}></div>
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-green-400/10 origin-left" style={{transform: 'translateY(-50%) rotate(135deg)'}}></div>
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-green-400/10 origin-left" style={{transform: 'translateY(-50%) rotate(-135deg)'}}></div>
                  </div>
                  
                  {/* Radar sweep line */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-400 to-transparent origin-left"
                    style={{
                      transform: `translateY(-50%) rotate(${radarAngle}deg)`,
                      boxShadow: '0 0 15px rgba(34, 197, 94, 0.9)',
                      filter: 'brightness(1.5)'
                    }}
                  ></div>
                  
                  {/* Radar sweep trail */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0deg, rgba(34, 197, 94, 0.2) ${radarAngle}deg, transparent ${radarAngle}deg)`,
                      filter: 'blur(1px)'
                    }}
                  ></div>
                  
                  {/* Animated blips */}
                  <div 
                    className="absolute w-2 h-2 bg-green-400 rounded-full animate-pulse"
                    style={{
                      top: '25%',
                      left: '70%',
                      boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)',
                      animation: 'pulse 2s infinite'
                    }}
                  ></div>
                  <div 
                    className="absolute w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"
                    style={{
                      top: '60%',
                      left: '30%',
                      boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
                      animation: 'pulse 1.5s infinite 0.5s'
                    }}
                  ></div>
                  <div 
                    className="absolute w-1 h-1 bg-green-500 rounded-full animate-pulse"
                    style={{
                      top: '40%',
                      left: '80%',
                      boxShadow: '0 0 6px rgba(34, 197, 94, 0.7)',
                      animation: 'pulse 1.8s infinite 0.3s'
                    }}
                  ></div>
                  
                  {/* Center dot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full" style={{boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)'}}></div>
                  
                  {/* Radar label */}
                  <div className="absolute -bottom-8 lg:-bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-green-400/70 font-bold">
                    TACTICAL RADAR
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-6 lg:mb-8 text-xs lg:text-sm">
              <div className="text-center lg:text-left">
                <div className="text-green-300">CODE EXPERTISE</div>
                <div>JAVASCRIPT | REACT | NODE.JS</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-green-300">DESIGN FOCUS</div>
                <div>TACTICAL UI / UX</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-green-300">MISSION READY</div>
                <div>HIGH-PRECISION SYSTEMS</div>
              </div>
            </div>

            {/* Access Buttons */}
            <div className="text-center space-y-3 lg:space-y-4">
              <button
                onClick={handleAccessProjects}
                className="px-6 lg:px-8 py-2 lg:py-3 border border-green-400 bg-green-400/10 hover:bg-green-400/20 transition-all duration-300 flex items-center gap-2 mx-auto w-full max-w-xs text-sm lg:text-base"
              >
                <span>&gt;&gt;</span> ACCESS PROJECTS
              </button>
              <div className="grid grid-cols-2 gap-3 lg:gap-4 max-w-xs mx-auto">
                <button
                  onClick={handleAccessSkills}
                  className="px-4 lg:px-6 py-2 border border-green-400/50 bg-green-400/5 hover:bg-green-400/15 transition-all duration-300 text-xs lg:text-sm"
                >
                  VIEW SKILLS
                </button>
                <button
                  onClick={handleAccessContacts}
                  className="px-4 lg:px-6 py-2 border border-green-400/50 bg-green-400/5 hover:bg-green-400/15 transition-all duration-300 text-xs lg:text-sm"
                >
                  CONTACT INFO
                </button>
              </div>
              <a
                href="https://giftme-orpin.vercel.app/support-developer"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 lg:px-6 py-2 border border-yellow-400/50 bg-yellow-400/10 hover:bg-yellow-400/20 transition-all duration-300 flex items-center gap-2 mx-auto w-full max-w-xs text-yellow-400 text-xs lg:text-sm"
              >
                <Coffee className="w-3 h-3 lg:w-4 lg:h-4" />
                BUY ME COFFEE
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scan {
            0% { transform: translateY(-100px); }
            100% { transform: translateY(100vh); }
          }
          @keyframes imageGlow {
            0% { 
              filter: brightness(1) contrast(1);
              transform: scale(1);
            }
            100% { 
              filter: brightness(1.1) contrast(1.05);
              transform: scale(1.02);
            }
          }
        `}</style>
      </div>
    )
  }

  if (currentView === 'projects') {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">&gt; PROJECT DATABASE</h2>
            <div className="border border-green-400/30 p-3 lg:p-4">
              {terminalHistory.map((line, index) => (
                <div key={index} className="text-xs lg:text-sm mb-1">{line}</div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
            {projects.map((project) => (
              <div key={project.id} className="border border-green-400/30 p-3 lg:p-4 hover:bg-green-400/5 transition-colors">
                <div className="flex items-center gap-2 lg:gap-3">
                  <span className="text-green-300 text-xs lg:text-sm">[{project.id}]</span>
                  <div>
                    <div className="font-bold text-xs lg:text-sm">{project.title}</div>
                    <div className="text-xs text-green-300">{project.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleTerminalSubmit} className="border border-green-400/30 p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <span className="text-green-300">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-xs lg:text-sm"
                placeholder="Enter project number (1-6) or 'back'..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <span className="animate-pulse">_</span>
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (currentView === 'project-detail' && selectedProject) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left - Project Image */}
            <div>
              <div className="border border-green-400/30 p-3 lg:p-4">
                <div className="relative h-48 lg:h-64 mb-4">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="text-green-300 mb-2 text-sm lg:text-base">PROJECT VISUAL</div>
                  <div className="text-xs lg:text-sm">STATUS: ACTIVE</div>
                </div>
              </div>
            </div>

            {/* Right - Project Details */}
            <div>
              <div className="border border-green-400/30 p-3 lg:p-4 h-full">
                <pre className="text-xs lg:text-sm leading-relaxed whitespace-pre-wrap">
                  {typedText}
                  <span className="animate-pulse">_</span>
                </pre>
              </div>
            </div>
          </div>

          {/* Terminal Input */}
          <form onSubmit={handleTerminalSubmit} className="mt-6 lg:mt-8 border border-green-400/30 p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <span className="text-green-300">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-xs lg:text-sm"
                placeholder="Type 'back' to return to project list..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <span className="animate-pulse">_</span>
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (currentView === 'skills') {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">&gt; SYSTEM CAPABILITIES</h2>
            <div className="border border-green-400/30 p-4 lg:p-6">
              <pre className="text-xs lg:text-sm leading-relaxed whitespace-pre-wrap">
                {typedText}
                <span className="animate-pulse">_</span>
              </pre>
            </div>
          </div>

          {/* Terminal Input */}
          <form onSubmit={handleTerminalSubmit} className="border border-green-400/30 p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <span className="text-green-300">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-xs lg:text-sm"
                placeholder="Type 'back' to return to dashboard..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <span className="animate-pulse">_</span>
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (currentView === 'contacts') {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">&gt; COMMUNICATION PROTOCOLS</h2>
            <div className="border border-green-400/30 p-4 lg:p-6">
              <div className="text-xs lg:text-sm leading-relaxed">
                <div>&gt; COMMUNICATION_PROTOCOLS // CONTACT_INFORMATION</div>
                <div>&gt;</div>
                <div>&gt; PRIMARY CONTACT:</div>
                <div>&gt; Email: <a href="mailto:collinsaruse@gmail.com" className="text-green-300 hover:text-green-200 underline transition-colors">collinsaruse@gmail.com</a></div>
                <div>&gt;</div>
                <div>&gt; PROFESSIONAL NETWORKS:</div>
                <div>&gt; GitHub: <a href="https://github.com/Collinsarusei" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline transition-colors">https://github.com/Collinsarusei</a></div>
                <div>&gt; LinkedIn: <a href="https://www.linkedin.com/in/collins-arusei-b5b74a2a9" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline transition-colors">https://www.linkedin.com/in/collins-arusei-b5b74a2a9</a></div>
                <div>&gt;</div>
                <div>&gt; SOCIAL CHANNEL:</div>
                <div>&gt; Instagram: <a href="https://instagram.com/chemoget_collo" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline transition-colors">https://instagram.com/chemoget_collo</a></div>
                <div>&gt;</div>
                <div>&gt; ACADEMIC INFO:</div>
                <div>&gt; University: Dedan Kimathi University of Technology (2023–Present)</div>
                <div>&gt;</div>
                <div>&gt; PERSONAL INTERESTS:</div>
                <div>&gt; Content Creation, Hiking, Chess, Music and watching millitary documentaries /movies</div>
                <div>&gt;</div>
                <div>&gt; COMMAND: Type 'back' to return to dashboard</div>
                <div className="animate-pulse">_</div>
              </div>
            </div>
          </div>

          {/* Terminal Input */}
          <form onSubmit={handleTerminalSubmit} className="border border-green-400/30 p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <span className="text-green-300">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-xs lg:text-sm"
                placeholder="Type 'back' to return to dashboard..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <span className="animate-pulse">_</span>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return null
}
