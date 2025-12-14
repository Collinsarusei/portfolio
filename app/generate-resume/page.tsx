"use client"

import { useEffect, useRef, useState } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export default function GenerateResumePDF() {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState("Preparing resume...")

  useEffect(() => {
    const generatePDF = async () => {
      if (!resumeRef.current) {
        setStatus("Error: Resume content not found")
        return
      }

      try {
        setStatus("Generating PDF... Please wait")
        
        // Wait for fonts and styles to load
        await new Promise(resolve => setTimeout(resolve, 1500))

        const element = resumeRef.current
        
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: "#ffffff",
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
        })

        const imgData = canvas.toDataURL("image/png", 1.0)
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          compress: true,
        })

        const imgWidth = 210 // A4 width in mm
        const pageHeight = 297 // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight
        let position = 0

        // Add first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST")
        heightLeft -= pageHeight

        // Add additional pages if needed
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight
          pdf.addPage()
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST")
          heightLeft -= pageHeight
        }

        setStatus("Download starting...")
        pdf.save("Collins_Arusei_Resume.pdf")
        
        setStatus("✅ PDF Downloaded! You can close this tab.")
        
        // Don't auto-close so users can see success message
        setTimeout(() => {
          if (confirm("Resume downloaded successfully! Close this tab?")) {
            window.close()
          }
        }, 1000)
      } catch (error) {
        console.error("Error generating PDF:", error)
        setStatus(`❌ Error: ${error instanceof Error ? error.message : "Failed to generate PDF"}`)
      }
    }

    generatePDF()
  }, [])

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", padding: "32px" }}>
      <div style={{ 
        position: "fixed", 
        top: "16px", 
        left: "50%", 
        transform: "translateX(-50%)",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        padding: "12px 24px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 50
      }}>
        {status}
      </div>
      <div ref={resumeRef} data-resume-content="true" style={{ maxWidth: "850px", margin: "0 auto", backgroundColor: "#ffffff", padding: "40px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", borderBottom: "4px solid #2563eb", paddingBottom: "20px", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "700", color: "#1e3a8a", marginBottom: "8px" }}>COLLINS ARUSEI</h1>
          <div style={{ fontSize: "18px", color: "#4b5563", marginBottom: "16px" }}>
            Full-Stack Software Developer | IT Specialist | Cybersecurity Enthusiast
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", fontSize: "14px", color: "#374151" }}>
            <span>📧 collinsaruse@gmail.com</span>
            <span>🌐 github.com/Collinsarusei</span>
            <span>💼 LinkedIn: collins-arusei</span>
          </div>
        </div>

        {/* Professional Summary */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1e3a8a", borderBottom: "2px solid #93c5fd", paddingBottom: "4px", marginBottom: "12px" }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p style={{ color: "#374151", lineHeight: "1.625" }}>
            Self-driven Full-Stack Software Developer and Information Technology student at Dedan Kimathi University of
            Technology with proven expertise in building production-ready web applications. Specialized in React,
            Next.js, TypeScript, and modern web technologies. Successfully deployed 6+ live applications serving real
            users across e-commerce, healthcare, logistics, and gifting platforms. Strong foundation in IT operations,
            system administration, and cybersecurity principles with hands-on experience in payment integration,
            real-time features, and secure authentication systems.
          </p>
        </div>

        {/* Education */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1e3a8a", borderBottom: "2px solid #93c5fd", paddingBottom: "4px", marginBottom: "12px" }}>EDUCATION</h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
            <span style={{ fontWeight: "700", color: "#111827" }}>Dedan Kimathi University of Technology</span>
            <span style={{ color: "#4b5563" }}>2023 - Present</span>
          </div>
          <div style={{ color: "#374151" }}>Bachelor of Science in Information Technology</div>
        </div>

        {/* Technical Skills */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1e3a8a", borderBottom: "2px solid #93c5fd", paddingBottom: "4px", marginBottom: "12px" }}>TECHNICAL SKILLS</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            <div style={{ backgroundColor: "#f9fafb", padding: "12px", borderRadius: "4px", borderLeft: "4px solid #2563eb" }}>
              <h4 style={{ fontWeight: "700", color: "#1e3a8a", marginBottom: "8px", fontSize: "14px" }}>Programming Languages</h4>
              <ul style={{ fontSize: "12px", lineHeight: "1.5", color: "#374151", listStyle: "none", padding: 0 }}>
                <li>• JavaScript (Advanced)</li>
                <li>• TypeScript (Advanced)</li>
                <li>• Node.js (Advanced)</li>
                <li>• SQL (Intermediate)</li>
              </ul>
            </div>
            <div style={{ backgroundColor: "#f9fafb", padding: "12px", borderRadius: "4px", borderLeft: "4px solid #2563eb" }}>
              <h4 style={{ fontWeight: "700", color: "#1e3a8a", marginBottom: "8px", fontSize: "14px" }}>Frameworks & Libraries</h4>
              <ul style={{ fontSize: "12px", lineHeight: "1.5", color: "#374151", listStyle: "none", padding: 0 }}>
                <li>• React.js</li>
                <li>• Next.js</li>
                <li>• Tailwind CSS</li>
                <li>• D3.js / Chart.js</li>
              </ul>
            </div>
            <div style={{ backgroundColor: "#f9fafb", padding: "12px", borderRadius: "4px", borderLeft: "4px solid #2563eb" }}>
              <h4 style={{ fontWeight: "700", color: "#1e3a8a", marginBottom: "8px", fontSize: "14px" }}>Backend & Databases</h4>
              <ul style={{ fontSize: "12px", lineHeight: "1.5", color: "#374151", listStyle: "none", padding: 0 }}>
                <li>• MongoDB</li>
                <li>• Supabase</li>
                <li>• Paystack API</li>
                <li>• Daraja API (M-Pesa)</li>
              </ul>
            </div>
            <div style={{ backgroundColor: "#f9fafb", padding: "12px", borderRadius: "4px", borderLeft: "4px solid #2563eb" }}>
              <h4 style={{ fontWeight: "700", color: "#1e3a8a", marginBottom: "8px", fontSize: "14px" }}>IT & Infrastructure</h4>
              <ul style={{ fontSize: "12px", lineHeight: "1.5", color: "#374151", listStyle: "none", padding: 0 }}>
                <li>• Network Administration</li>
                <li>• System Troubleshooting</li>
                <li>• Hardware & Software Support</li>
                <li>• Cloud Services</li>
              </ul>
            </div>
            <div style={{ backgroundColor: "#f9fafb", padding: "12px", borderRadius: "4px", borderLeft: "4px solid #2563eb" }}>
              <h4 style={{ fontWeight: "700", color: "#1e3a8a", marginBottom: "8px", fontSize: "14px" }}>Cybersecurity</h4>
              <ul style={{ fontSize: "12px", lineHeight: "1.5", color: "#374151", listStyle: "none", padding: 0 }}>
                <li>• Security Principles</li>
                <li>• Threat Analysis</li>
                <li>• Secure Coding Practices</li>
                <li>• Network Security</li>
              </ul>
            </div>
            <div style={{ backgroundColor: "#f9fafb", padding: "12px", borderRadius: "4px", borderLeft: "4px solid #2563eb" }}>
              <h4 style={{ fontWeight: "700", color: "#1e3a8a", marginBottom: "8px", fontSize: "14px" }}>Other Skills</h4>
              <ul style={{ fontSize: "12px", lineHeight: "1.5", color: "#374151", listStyle: "none", padding: 0 }}>
                <li>• Git & Version Control</li>
                <li>• REST APIs</li>
                <li>• Responsive Design</li>
                <li>• Project Management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1e3a8a", borderBottom: "2px solid #93c5fd", paddingBottom: "4px", marginBottom: "12px" }}>FEATURED PROJECTS</h2>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
              <span style={{ fontWeight: "700", color: "#1e3a8a" }}>UzaBidhaa Marketplace</span>
              <span style={{ fontSize: "12px", color: "#4b5563", fontStyle: "italic" }}>uzabidhaa.com</span>
            </div>
            <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "600", marginBottom: "4px" }}>E-commerce Platform</div>
            <p style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
              Local marketplace connecting buyers and sellers in Kenya. Features real-time messaging, product listings,
              secure payment integration, and user account management.
            </p>
            <div style={{ fontSize: "12px", color: "#15803d", fontStyle: "italic" }}>
              Tech Stack: Next.js, TypeScript, Tailwind CSS, Supabase, Node.js
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
              <span style={{ fontWeight: "700", color: "#1e3a8a" }}>CelebrateWith.me</span>
              <span style={{ fontSize: "12px", color: "#4b5563", fontStyle: "italic" }}>giftme-orpin.vercel.app</span>
            </div>
            <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "600", marginBottom: "4px" }}>Gifting Platform</div>
            <p style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
              Online gifting web application for sending surprise gifts. Supports user events, secure monetary gifts,
              integrated payment processing, and delivery tracking.
            </p>
            <div style={{ fontSize: "12px", color: "#15803d", fontStyle: "italic" }}>
              Tech Stack: Next.js, MongoDB, Payment APIs, Delivery Integration
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
              <span style={{ fontWeight: "700", color: "#1e3a8a" }}>Unwind Business Enterprise</span>
              <span style={{ fontSize: "12px", color: "#4b5563", fontStyle: "italic" }}>unwindbusinessenterprise.com</span>
            </div>
            <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "600", marginBottom: "4px" }}>Business & Logistics</div>
            <p style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
              Corporate travel and logistics platform offering business safaris, trade tours, global shipping, and
              travel booking services for international business expansion.
            </p>
            <div style={{ fontSize: "12px", color: "#15803d", fontStyle: "italic" }}>
              Tech Stack: Next.js, TypeScript, Tailwind CSS, Responsive Design
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
              <span style={{ fontWeight: "700", color: "#1e3a8a" }}>Lindatoto</span>
              <span style={{ fontSize: "12px", color: "#4b5563", fontStyle: "italic" }}>lindatoto.com</span>
            </div>
            <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "600", marginBottom: "4px" }}>Healthcare System</div>
            <p style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
              Healthcare immunization tracking application with hospital inventory management. Tracks patient
              vaccination records, monitors vaccine stock levels, and generates comprehensive immunization reports.
            </p>
            <div style={{ fontSize: "12px", color: "#15803d", fontStyle: "italic" }}>
              Tech Stack: React, Database Management, Healthcare APIs, Reporting Systems
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
              <span style={{ fontWeight: "700", color: "#1e3a8a" }}>Habnet Solutions</span>
              <span style={{ fontSize: "12px", color: "#4b5563", fontStyle: "italic" }}>habnet-nu.vercel.app</span>
            </div>
            <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "600", marginBottom: "4px" }}>Corporate Website</div>
            <p style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
              Corporate website for a systems and supply firm. Showcases services, company values, legal documents, and
              project structure with modern animations and responsive design.
            </p>
            <div style={{ fontSize: "12px", color: "#15803d", fontStyle: "italic" }}>Tech Stack: React, CSS Animations, Responsive Design</div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
              <span style={{ fontWeight: "700", color: "#1e3a8a" }}>WeightWise</span>
              <span style={{ fontSize: "12px", color: "#4b5563", fontStyle: "italic" }}>weight-wise-sigma.vercel.app</span>
            </div>
            <div style={{ fontSize: "12px", color: "#7c3aed", fontWeight: "600", marginBottom: "4px" }}>Health & Fitness</div>
            <p style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
              Fitness and health tracker application. Allows users to log measurements, track progress with interactive
              charts, and form healthy habits through gamification.
            </p>
            <div style={{ fontSize: "12px", color: "#15803d", fontStyle: "italic" }}>Tech Stack: React, Vercel, D3.js/Chart.js, MongoDB</div>
          </div>
        </div>

        {/* Key Achievements */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1e3a8a", borderBottom: "2px solid #93c5fd", paddingBottom: "4px", marginBottom: "12px" }}>
            KEY ACHIEVEMENTS & COMPETENCIES
          </h2>
          <ul style={{ fontSize: "14px", color: "#374151", lineHeight: "1.5" }}>
            <li>
              <strong>Full-Stack Development:</strong> Successfully deployed 6+ production-ready web applications
              serving real users
            </li>
            <li>
              <strong>Payment Integration:</strong> Integrated Paystack and M-Pesa (Daraja API) with secure transaction
              handling
            </li>
            <li>
              <strong>Real-time Systems:</strong> Implemented live messaging, notifications, and real-time data updates
            </li>
            <li>
              <strong>Healthcare Technology:</strong> Developed immunization tracking system with inventory management
            </li>
            <li>
              <strong>E-commerce Solutions:</strong> Built marketplace platform with user authentication and secure
              checkout
            </li>
            <li>
              <strong>UI/UX Excellence:</strong> Crafted responsive, mobile-first applications with modern design
              principles
            </li>
            <li>
              <strong>Database Design:</strong> Architected MongoDB and Supabase databases with optimized queries
            </li>
            <li>
              <strong>Security Best Practices:</strong> Implemented secure authentication, data encryption, and
              vulnerability protection
            </li>
          </ul>
        </div>

        {/* Interests */}
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1e3a8a", borderBottom: "2px solid #93c5fd", paddingBottom: "4px", marginBottom: "12px" }}>
            INTERESTS & ACTIVITIES
          </h2>
          <p style={{ fontSize: "14px", color: "#374151" }}>
            Content Creation | Hiking | Chess | Music | Open Source Contribution
          </p>
        </div>

        {/* References */}
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1e3a8a", borderBottom: "2px solid #93c5fd", paddingBottom: "4px", marginBottom: "12px" }}>REFERENCES</h2>
          <p style={{ fontSize: "14px", color: "#374151" }}>Available upon request</p>
        </div>
      </div>
    </div>
  )
}
