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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

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
    url: "https://giftme-eta.vercel.app/",
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

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    try {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } catch (error) {
      console.log("Scroll error:", error)
    }
  }

  const downloadResume = () => {
    try {
      // Create a link element and trigger download
      const link = document.createElement("a")
      link.href = "/resume.pdf"
      link.download = "Collins_Arusei_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.log("Download error:", error)
      // Fallback: open in new tab
      window.open("/resume.pdf", "_blank")
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Floating Buy Me Coffee Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-2xl"
        >
          <Link href="https://giftme-eta.vercel.app/support-developer" target="_blank">
            <Coffee className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-40 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Collins Arusei
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection("home")} className="hover:text-blue-400 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection("about")} className="hover:text-blue-400 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection("projects")} className="hover:text-blue-400 transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection("skills")} className="hover:text-blue-400 transition-colors">
                Skills
              </button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-blue-400 transition-colors">
                Contact
              </button>
            </nav>
            <Button
              onClick={downloadResume}
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Fixed mobile spacing */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-20 md:pt-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
            <div className="flex-1">
              <p className="text-xl text-blue-400 mb-4 font-medium">Hi, I'm Collins Arusei</p>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Software Developer
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                Self-taught Software Developer | Full-Stack Enthusiast | Tech Innovator
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={downloadResume}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Download Resume
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-slate-900 bg-transparent"
                  asChild
                >
                  <Link href="https://giftme-eta.vercel.app/support-developer" target="_blank">
                    <Coffee className="mr-2 w-4 h-4" />
                    Buy Me a Coffee
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20"></div>
                <Image
                  src="/images/collins-photo.jpg"
                  alt="Collins Arusei"
                  width={400}
                  height={400}
                  className="relative rounded-full object-cover border-4 border-blue-400/50 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                I am an Information Technology student at Dedan Kimathi University of Technology, passionate about
                building real-world software solutions. With hands-on experience in developing full-stack web
                applications, I am driven by curiosity and a commitment to continuous improvement. I thrive on building
                impactful projects with modern technologies.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {quickFacts.map((fact, index) => (
              <div
                key={index}
                className="bg-slate-700/50 p-6 rounded-lg border border-slate-600 hover:border-blue-400/50 transition-colors"
              >
                <div className="flex items-center mb-3">
                  {fact.label === "University" && <Calendar className="w-5 h-5 text-blue-400 mr-2" />}
                  {fact.label === "GitHub" && <Github className="w-5 h-5 text-purple-400 mr-2" />}
                  {fact.label === "Email" && <Mail className="w-5 h-5 text-green-400 mr-2" />}
                  {fact.label === "Interests" && <Heart className="w-5 h-5 text-pink-400 mr-2" />}
                  <h3 className="font-semibold text-gray-200">{fact.label}</h3>
                </div>
                <p className="text-gray-400 text-sm">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Added glow effects */}
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my recent work, demonstrating my skills in full-stack development, UI/UX design, and
              problem-solving with real-world applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group">
                <Card className="overflow-hidden bg-slate-800/50 border-slate-600 hover:border-blue-400/50 transition-all duration-300 h-full relative hover:shadow-2xl hover:shadow-blue-500/20">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <Button asChild className="bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/25">
                        <Link href={project.url} target="_blank">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live Demo
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-400 border-blue-400/30 group-hover:bg-blue-500/30 group-hover:shadow-sm group-hover:shadow-blue-400/50 transition-all"
                      >
                        {project.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300 text-base leading-relaxed group-hover:text-gray-200 transition-colors">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="text-xs border-slate-500 text-gray-300 hover:border-blue-400 hover:text-blue-400 group-hover:border-blue-400/70 group-hover:text-blue-300 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all"
                    >
                      <Link href={project.url} target="_blank">
                        Visit Project <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              My expertise spans across modern web technologies, from frontend frameworks to backend systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card
                key={category}
                className="bg-slate-700/50 border-slate-600 hover:border-blue-400/50 transition-colors h-full"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-white capitalize flex items-center">
                    {category === "languages" && <Code className="w-5 h-5 mr-2 text-blue-400" />}
                    {category === "frameworks" && <Globe className="w-5 h-5 mr-2 text-purple-400" />}
                    {category === "backend" && <Database className="w-5 h-5 mr-2 text-green-400" />}
                    {category === "other" && <User className="w-5 h-5 mr-2 text-pink-400" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillList.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                          <span className="text-gray-400 text-xs">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              category === "languages"
                                ? "bg-gradient-to-r from-blue-400 to-blue-600"
                                : category === "frameworks"
                                  ? "bg-gradient-to-r from-purple-400 to-purple-600"
                                  : category === "backend"
                                    ? "bg-gradient-to-r from-green-400 to-green-600"
                                    : "bg-gradient-to-r from-pink-400 to-pink-600"
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Resume
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Download my complete resume to learn more about my experience, education, and projects.
            </p>
            <Button
              size="lg"
              onClick={downloadResume}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Download className="mr-2 w-5 h-5" />
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="bg-slate-700/50 border-slate-600 hover:border-blue-400/50 transition-colors text-center">
              <CardHeader>
                <Mail className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                <CardTitle className="text-lg text-white">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">collinsaruse@gmail.com</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-700/50 border-slate-600 hover:border-purple-400/50 transition-colors text-center">
              <CardHeader>
                <Github className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                <CardTitle className="text-lg text-white">GitHub</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href="https://github.com/Collinsarusei"
                  target="_blank"
                  className="text-gray-300 text-sm hover:text-purple-400"
                >
                  Collinsarusei
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-slate-700/50 border-slate-600 hover:border-blue-600/50 transition-colors text-center">
              <CardHeader>
                <Linkedin className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-lg text-white">LinkedIn</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href="https://www.linkedin.com/in/collins-arusei-b5b74a2a9"
                  target="_blank"
                  className="text-gray-300 text-sm hover:text-blue-600"
                >
                  Collins Arusei
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-slate-700/50 border-slate-600 hover:border-pink-400/50 transition-colors text-center">
              <CardHeader>
                <Instagram className="w-8 h-8 mx-auto text-pink-400 mb-2" />
                <CardTitle className="text-lg text-white">Instagram</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href="https://instagram.com/chemoget_collo"
                  target="_blank"
                  className="text-gray-300 text-sm hover:text-pink-400"
                >
                  @chemoget_collo
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              asChild
            >
              <Link href="mailto:collinsaruse@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto text-center">
          <div className="space-y-4">
            <p className="text-gray-400">Built & designed by Collins Arusei, 2025</p>
            <div className="flex justify-center items-center gap-6">
              <Button variant="ghost" size="sm" className="text-orange-400 hover:text-orange-300" asChild>
                <Link href="https://giftme-eta.vercel.app/support-developer" target="_blank">
                  <Coffee className="w-4 h-4 mr-2" />
                  Buy Me a Coffee
                </Link>
              </Button>
              <Link
                href="https://www.linkedin.com/in/collins-arusei-b5b74a2a9"
                target="_blank"
                className="text-blue-600 hover:text-blue-400"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com/chemoget_collo"
                target="_blank"
                className="text-pink-400 hover:text-pink-300"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/Collinsarusei"
                target="_blank"
                className="text-purple-400 hover:text-purple-300"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
