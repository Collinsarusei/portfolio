"use client"
import {
  Code,
  Database,
  Globe,
  Mail,
  Coffee,
  ExternalLink,
  Download,
  Github,
  User,
  Calendar,
  Heart,
  Linkedin,
  Instagram,
  ChevronDown,
  X,
  Menu,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const projects = [
  {
    title: "UzaBidhaa Marketplace",
    description:
      "Local marketplace for buyers and sellers in Kenya. Real-time messaging, product listings, payment integration.",
    image: "/images/uzabidhaa-project.png",
    url: "https://uzabidhaa.com",
    tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Node.js"],
    category: "E-commerce Platform",
  },
  {
    title: "CelebrateWith.me",
    description:
      "Online gifting web app for sending surprise gifts. Supports user events, secure monetary gifts, integrated payment & delivery tracking.",
    image: "/images/celebrate-project.png",
    url: "https://giftme-orpin.vercel.app/",
    tech: ["Next.js", "MongoDB", "Payment API", "Delivery API"],
    category: "Gifting Platform",
  },
  {
    title: "Habnet Solutions",
    description:
      "Corporate website for a systems & supply firm. Showcases services, company values, legal documents, and project structure.",
    image: "/images/habnet-project.png",
    url: "https://habnet-nu.vercel.app/",
    tech: ["React", "CSS", "Animation", "Responsive Design"],
    category: "Corporate Website",
  },
  {
    title: "WeightWise",
    description:
      "Fitness and health tracker app. Lets users log measurements, track progress with charts, and form healthy habits.",
    image: "/images/weightwise-project.png",
    url: "https://weight-wise-sigma.vercel.app/",
    tech: ["React", "Vercel", "D3.js/Chart.js", "MongoDB"],
    category: "Health & Fitness",
  },
  {
    title: "Unwind Business Enterprise",
    description:
      "Corporate travel & logistics platform offering business safaris, trade tours, global shipping, and travel booking services for international business expansion.",
    image: "/images/unwind.png",
    url: "https://www.unwindbusinessenterprise.com",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
    category: "Business & Logistics",
  },
  {
    title: "Lindatoto",
    description:
      "Healthcare immunization tracking application with hospital inventory management. Tracks patient vaccination records, monitors vaccine stock levels, and generates immunization reports.",
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

const quickFacts = [
  { label: "University", value: "Dedan Kimathi University of Technology (2023–Present)" },
  { label: "GitHub", value: "Collinsarusei" },
  { label: "Email", value: "collinsaruse@gmail.com" },
  { label: "Interests", value: "Content Creation, Hiking, Chess, Music" },
]

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const downloadResume = async () => {
    try {
      const iframe = document.createElement("iframe")
      iframe.style.position = "fixed"
      iframe.style.left = "-9999px"
      iframe.style.width = "850px"
      iframe.style.height = "1200px"
      document.body.appendChild(iframe)

      iframe.src = "/generate-resume"

      await new Promise((resolve) => {
        iframe.onload = resolve
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (!iframeDoc) throw new Error("Could not access iframe content")

      const resumeElement = iframeDoc.querySelector('[data-resume-content="true"]')
      if (!resumeElement) throw new Error("Resume content not found")

      const canvas = await html2canvas(resumeElement as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png", 1.0)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      })

      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST")
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST")
        heightLeft -= pageHeight
      }

      pdf.save("Collins_Arusei_Resume.pdf")

      document.body.removeChild(iframe)
    } catch (error) {
      console.error("Error generating PDF:", error)
      window.open("/generate-resume", "_blank")
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center scan-line">
        <div className="hud-border p-8 bg-card/80 backdrop-blur-sm">
          <div className="military-label mb-4 text-center">// SYSTEM_INITIALIZING</div>
          <div className="terminal-text text-xl">[LOADING_INTERFACE...]</div>
        </div>
      </div>
    )
  }

  if (!showPortfolio) {
    return (
      <div className="min-h-screen bg-background text-foreground scan-line flex items-center justify-center relative">
        {/* Background grid */}
        <div className="absolute inset-0 grid-overlay opacity-30"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4">
          {/* Profile Image - Square cropped to head */}
          <div className="mb-8 fade-in">
            <div className="relative inline-block">
              <div className="hud-border p-1 bg-card/80 backdrop-blur-sm">
                <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden">
                  <Image
                    src="/images/collins-photo.jpg"
                    alt="Collins Arusei"
                    fill
                    className="object-cover object-top scale-125"
                    style={{ objectPosition: 'center 20%' }}
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="military-label text-xs">// OPERATOR</div>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="mb-6 fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold terminal-text mb-2">
              COLLINS
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold terminal-text text-accent">
              ARUSEI
            </h2>
          </div>

          {/* Title */}
          <div className="mb-8 fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="military-label mb-2">// DESIGNATION</div>
            <p className="text-xl md:text-2xl text-muted-foreground terminal-text">
              SOFTWARE DEVELOPER
            </p>
          </div>

          {/* Status indicator */}
          <div className="mb-12 fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="hud-border inline-block px-6 py-3 bg-card/60 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="terminal-text text-sm">SYSTEM_ACTIVE</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="fade-in" style={{ animationDelay: '0.8s' }}>
            <Button
              onClick={() => setShowPortfolio(true)}
              size="lg"
              className="rounded-none border border-primary/50 bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 hud-border px-8 py-4"
            >
              <span className="terminal-text">ACCESS_PORTFOLIO</span>
              <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Minimal nav */}
          <div className="absolute top-6 right-6 fade-in" style={{ animationDelay: '1s' }}>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary rounded-none terminal-text text-xs"
                onClick={downloadResume}
              >
                <Download className="w-4 h-4 mr-1" />
                RESUME
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-accent rounded-none terminal-text text-xs"
              >
                <Link href="https://github.com/Collinsarusei" target="_blank">
                  <Github className="w-4 h-4 mr-1" />
                  GITHUB
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground scan-line">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-card/95 backdrop-blur-sm z-40 border-b border-border hud-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setShowPortfolio(false)}
            className="terminal-text hover:text-primary transition-colors text-sm flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            [COLLINS_ARUSEI]
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6">
              <button 
                onClick={() => setActiveSection(activeSection === 'about' ? null : 'about')}
                className={`terminal-text hover:text-primary transition-colors text-sm ${activeSection === 'about' ? 'text-primary' : ''}`}
              >
                PROFILE
              </button>
              <button 
                onClick={() => setActiveSection(activeSection === 'projects' ? null : 'projects')}
                className={`terminal-text hover:text-primary transition-colors text-sm ${activeSection === 'projects' ? 'text-primary' : ''}`}
              >
                OPERATIONS
              </button>
              <button 
                onClick={() => setActiveSection(activeSection === 'skills' ? null : 'skills')}
                className={`terminal-text hover:text-primary transition-colors text-sm ${activeSection === 'skills' ? 'text-primary' : ''}`}
              >
                SYSTEMS
              </button>
              <button 
                onClick={() => setActiveSection(activeSection === 'contact' ? null : 'contact')}
                className={`terminal-text hover:text-primary transition-colors text-sm ${activeSection === 'contact' ? 'text-primary' : ''}`}
              >
                COMMS
              </button>
            </div>
            
            <Button
              onClick={downloadResume}
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent rounded-none hud-border"
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="terminal-text text-xs">EXPORT_DATA</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-muted-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <button 
                onClick={() => { setActiveSection(activeSection === 'about' ? null : 'about'); setMobileMenuOpen(false); }}
                className={`terminal-text hover:text-primary transition-colors text-sm block w-full text-left ${activeSection === 'about' ? 'text-primary' : ''}`}
              >
                PROFILE
              </button>
              <button 
                onClick={() => { setActiveSection(activeSection === 'projects' ? null : 'projects'); setMobileMenuOpen(false); }}
                className={`terminal-text hover:text-primary transition-colors text-sm block w-full text-left ${activeSection === 'projects' ? 'text-primary' : ''}`}
              >
                OPERATIONS
              </button>
              <button 
                onClick={() => { setActiveSection(activeSection === 'skills' ? null : 'skills'); setMobileMenuOpen(false); }}
                className={`terminal-text hover:text-primary transition-colors text-sm block w-full text-left ${activeSection === 'skills' ? 'text-primary' : ''}`}
              >
                SYSTEMS
              </button>
              <button 
                onClick={() => { setActiveSection(activeSection === 'contact' ? null : 'contact'); setMobileMenuOpen(false); }}
                className={`terminal-text hover:text-primary transition-colors text-sm block w-full text-left ${activeSection === 'contact' ? 'text-primary' : ''}`}
              >
                COMMS
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          {/* About Section */}
          {activeSection === 'about' && (
            <div className="py-12 fade-in">
              <div className="hud-border p-8 bg-card/80 backdrop-blur-sm">
                <div className="military-label mb-6">// MISSION_PROFILE</div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold terminal-text mb-4">OPERATOR_DATA</h3>
                    <div className="space-y-4">
                      <p className="terminal-text">
                        {'>'} Information Technology student at Dedan Kimathi University of Technology
                      </p>
                      <p className="terminal-text">
                        {'>'} Passionate about building real-world software solutions
                      </p>
                      <p className="terminal-text">
                        {'>'} Full-stack development with modern technologies
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg terminal-text mb-4">// QUICK_FACTS</h4>
                    <div className="space-y-3">
                      {quickFacts.map((fact, index) => (
                        <div key={index} className="military-label text-xs">
                          {fact.label}: {fact.value}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Section */}
          {activeSection === 'projects' && (
            <div className="py-12 fade-in">
              <div className="military-label mb-6 text-center">// OPERATIONS_LOG</div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="hud-border overflow-hidden bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-300">
                    <div className="relative h-32">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="terminal-text font-bold mb-2">{project.title}</h4>
                      <div className="military-label text-xs mb-2">{project.category}</div>
                      <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span key={i} className="military-label text-xs">[{tech}]</span>
                        ))}
                      </div>
                      <Button
                        asChild
                        size="sm"
                        className="w-full rounded-none border border-primary/50 bg-card hover:bg-primary hover:text-primary-foreground hud-border"
                      >
                        <Link href={project.url} target="_blank">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          <span className="terminal-text text-xs">VIEW</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <div className="py-12 fade-in">
              <div className="military-label mb-6 text-center">// SYSTEM_CAPABILITIES</div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <div key={category} className="hud-border p-6 bg-card/80 backdrop-blur-sm">
                    <div className="military-label mb-4">// {category.toUpperCase()}_MODULES</div>
                    <div className="space-y-3">
                      {skillList.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="terminal-text text-sm">{skill.name}</span>
                            <span className="military-label text-xs">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-border h-1">
                            <div
                              className="bg-primary h-full transition-all duration-1000"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <div className="py-12 fade-in">
              <div className="military-label mb-6 text-center">// COMMUNICATION_PROTOCOLS</div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="hud-border p-6 bg-card/80 backdrop-blur-sm text-center">
                  <Mail className="w-8 h-8 mx-auto text-primary mb-2" />
                  <div className="military-label text-xs mb-2">// EMAIL_PROTOCOL</div>
                  <p className="terminal-text text-sm">collinsaruse@gmail.com</p>
                </div>
                <div className="hud-border p-6 bg-card/80 backdrop-blur-sm text-center">
                  <Github className="w-8 h-8 mx-auto text-accent mb-2" />
                  <div className="military-label text-xs mb-2">// REPOSITORY</div>
                  <Link href="https://github.com/Collinsarusei" target="_blank" className="terminal-text text-sm hover:text-accent">
                    Collinsarusei
                  </Link>
                </div>
                <div className="hud-border p-6 bg-card/80 backdrop-blur-sm text-center">
                  <Linkedin className="w-8 h-8 mx-auto text-primary mb-2" />
                  <div className="military-label text-xs mb-2">// PROFESSIONAL_NETWORK</div>
                  <Link href="https://www.linkedin.com/in/collins-arusei-b5b74a2a9" target="_blank" className="terminal-text text-sm hover:text-primary">
                    Collins Arusei
                  </Link>
                </div>
                <div className="hud-border p-6 bg-card/80 backdrop-blur-sm text-center">
                  <Instagram className="w-8 h-8 mx-auto text-accent mb-2" />
                  <div className="military-label text-xs mb-2">// SOCIAL_CHANNEL</div>
                  <Link href="https://instagram.com/chemoget_collo" target="_blank" className="terminal-text text-sm hover:text-accent">
                    @chemoget_collo
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Default state - show overview */}
          {!activeSection && (
            <div className="py-12 text-center">
              <div className="hud-border p-12 bg-card/80 backdrop-blur-sm max-w-2xl mx-auto">
                <div className="military-label mb-6">// SYSTEM_INTERFACE</div>
                <h2 className="text-3xl font-bold terminal-text mb-6">COLLINS ARUSEI</h2>
                <p className="terminal-text mb-8">SOFTWARE DEVELOPER // FULL_STACK_ENGINEER</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold terminal-text text-primary">6+</div>
                    <div className="military-label text-xs">PROJECTS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold terminal-text text-accent">15+</div>
                    <div className="military-label text-xs">TECHNOLOGIES</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold terminal-text text-primary">3+</div>
                    <div className="military-label text-xs">YEARS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold terminal-text text-accent">100%</div>
                    <div className="military-label text-xs">DEDICATION</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setActiveSection('projects')}
                    className="rounded-none border border-primary/50 bg-card hover:bg-primary hover:text-primary-foreground hud-border"
                  >
                    <span className="terminal-text text-sm">VIEW_OPERATIONS</span>
                  </Button>
                  <Button
                    onClick={() => setActiveSection('skills')}
                    variant="outline"
                    className="rounded-none border border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground hud-border"
                  >
                    <span className="terminal-text text-sm">VIEW_SYSTEMS</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
