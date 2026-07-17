import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Home() {
  const location = useLocation()
  const contactRef = useRef(null)

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error'

  useEffect(() => {
    // Scroll to contact form if triggered from navigate state
    if (location.state && location.state.scrollToContact && contactRef.current) {
      setTimeout(() => {
        contactRef.current.scrollIntoView({ behavior: 'smooth' })
        // Clear state to avoid scrolling again on refresh
        window.history.replaceState({}, document.title)
      }, 100)
    }
  }, [location])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    const targets = document.querySelectorAll(
      '.service-card, .tech-category, .about-card, .local-card'
    )

    targets.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.projectType || !formData.message.trim()) {
      alert('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Submit to Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            project_type: formData.projectType,
            message: formData.message
          }
        ])

      if (error) throw error

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        projectType: '',
        message: ''
      })

      // Auto-clear success message after 7 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 7000)

    } catch (err) {
      console.error('Error submitting form to Supabase:', err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleScrollToContact = (e) => {
    e.preventDefault()
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-badge">🚀 Trusted by Growing Businesses</div>
          <h1 className="hero-headline">
            Empowering Businesses with{' '}
            <span className="highlight">High-Performance</span>{' '}
            Web Solutions
          </h1>
          <p className="hero-subheadline">
            From custom React applications to strategic digital marketing, SoftAppix helps brands like Alacrity
            Enterprises scale their digital footprint.
          </p>
          <div className="hero-ctas">
            <Link to="/case-studies" className="btn btn-primary">View Our Work</Link>
            <a href="#contact" onClick={handleScrollToContact} className="btn btn-secondary">Get Free Quote</a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat">
              <span className="stat-number">9+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat">
              <span className="stat-number">99%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-window">
            <div className="window-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <pre className="code-content">
              <code>
                <span className="code-keyword">const</span> <span className="code-variable">softappix</span> = &#123;{'\n'}
                {'  '}<span className="code-property">mission</span>: <span className="code-string">"empower businesses"</span>,{'\n'}
                {'  '}<span className="code-property">stack</span>: [<span className="code-string">"React"</span>, <span className="code-string">"Vite"</span>, <span className="code-string">"AI"</span>],{'\n'}
                {'  '}<span className="code-property">result</span>: <span className="code-string">"🚀 growth"</span>{'\n'}
                &#125;;
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">Comprehensive Digital Solutions</h2>
            <p className="section-subtitle">From concept to deployment, we handle every aspect of your digital transformation</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3 className="service-title">Web Development</h3>
              <p className="service-description">Lightning-fast, responsive websites built with modern UI/UX to engage users and drive conversions.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📈</div>
              <h3 className="service-title">Digital Strategy</h3>
              <p className="service-description">Data-driven SEO and targeted marketing to help you reach the right audience and scale your business.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🛒</div>
              <h3 className="service-title">E-commerce Solutions</h3>
              <p className="service-description">Seamless online storefronts and payment integrations designed to convert visitors into loyal customers.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3 className="service-title">Software Development</h3>
              <p className="service-description">Custom-built software, SaaS platforms and backend APIs engineered to solve real business problems at scale.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3 className="service-title">Mobile App Development</h3>
              <p className="service-description">Powerful cross-platform mobile applications that deliver native-like performance and intuitive user experiences.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">✨</div>
              <h3 className="service-title">Logo Design</h3>
              <p className="service-description">Memorable brand identities and professional logos that capture your business essence and stand out in the market.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/services" className="btn btn-secondary">View All Services →</Link>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="our-clients" id="our-clients">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Partnerships</span>
            <h2 className="section-title">Our Clients</h2>
            <p className="section-subtitle">Trusted by innovative businesses to deliver high-performance digital solutions</p>
          </div>
          <div className="clients-grid">
            <div className="client-logo">
              <img src="/assets/alacrity-logo.svg" alt="Alacrity Enterprises Logo" className="client-img" />
              <span className="client-name">Alacrity</span>
              <span className="client-suffix">Enterprises</span>
            </div>
            <div className="client-logo">
              <img src="/assets/globaltech-logo.svg" alt="Global Tech Industries Logo" className="client-img" />
              <span className="client-name">Global Tech</span>
              <span className="client-suffix">Industries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack" id="tech-stack">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Expertise</span>
            <h2 className="section-title">Tech Stack</h2>
            <p className="section-subtitle">Modern tools and technologies we use to build exceptional digital experiences</p>
          </div>
          <div className="tech-grid">
            <div className="tech-category">
              <h3 className="tech-category-title">Frontend</h3>
              <div className="tech-items">
                <div className="tech-item">
                  <span className="tech-icon">⚛️</span>
                  <span className="tech-name">React</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">⚡</span>
                  <span className="tech-name">Vite</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">🎨</span>
                  <span className="tech-name">Tailwind CSS</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">📱</span>
                  <span className="tech-name">Responsive Design</span>
                </div>
              </div>
            </div>
            <div className="tech-category">
              <h3 className="tech-category-title">Backend & Tools</h3>
              <div className="tech-items">
                <div className="tech-item">
                  <span className="tech-icon">🐍</span>
                  <span className="tech-name">Python</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">🔥</span>
                  <span className="tech-name">Firebase</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">📦</span>
                  <span className="tech-name">Git</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">☁️</span>
                  <span className="tech-name">Cloud Services</span>
                </div>
              </div>
            </div>
            <div className="tech-category">
              <h3 className="tech-category-title">Specialties</h3>
              <div className="tech-items">
                <div className="tech-item">
                  <span className="tech-icon">🚀</span>
                  <span className="tech-name">Website Optimization</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">🧩</span>
                  <span className="tech-name">Logic Building</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">🔍</span>
                  <span className="tech-name">SEO</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">🎯</span>
                  <span className="tech-name">Performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="section-tag">About SoftAppix</span>
              <h2 className="section-title">The SoftAppix Vision</h2>
              <p className="about-description">
                At SoftAppix, we believe in the power of <strong>clean code</strong> and <strong>data-driven
                  marketing</strong>. Our mission is to help local businesses transition to the global digital
                stage without compromising on quality or performance.
              </p>
              <p className="about-description">
                We specialize in building high-performance web applications that not only look great but also
                deliver measurable business results. Our approach combines technical excellence with strategic
                thinking.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <span className="feature-icon">✓</span>
                  <span>Clean, Maintainable Code</span>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">✓</span>
                  <span>Data-Driven Strategies</span>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">✓</span>
                  <span>Scalable Solutions</span>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">✓</span>
                  <span>Client-First Approach</span>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <img src="/assets/about-visual.svg" alt="Abstract modern digital tech growth" className="about-image" />
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/about" className="btn btn-secondary">Learn More About Us →</Link>
          </div>
        </div>
      </section>

      {/* Indore Roots Section */}
      <section className="local-roots" id="local-roots">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Differentiator</span>
            <h2 className="section-title">The Indore Advantage</h2>
            <p className="section-subtitle">Local expertise meets global standards</p>
          </div>
          <div className="local-grid">
            <div className="local-card">
              <div className="local-icon">🏘️</div>
              <h3>Local Roots</h3>
              <p>Helping Indore-based businesses digitize and reach their full potential. We understand the local market dynamics and tailor solutions accordingly.</p>
              <ul className="local-highlights">
                <li>Understanding local business needs</li>
                <li>Cultural alignment</li>
                <li>Regional language support</li>
              </ul>
            </div>
            <div className="local-divider">
              <span>→</span>
            </div>
            <div className="local-card">
              <div className="local-icon">🌍</div>
              <h3>Global Reach</h3>
              <p>Applying high-end tech stacks like Vite, React, and AI that compete on a global scale. Our solutions meet international standards.</p>
              <ul className="local-highlights">
                <li>World-class technology</li>
                <li>International best practices</li>
                <li>Global market access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact" ref={contactRef}>
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <span className="section-tag">Get In Touch</span>
              <h2 className="section-title">Let's Build Something Amazing</h2>
              <p className="contact-description">
                Ready to transform your digital presence? We'd love to hear about
                your project. Let's discuss how we can help you achieve your goals.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>softappix@gmail.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+91 8517072252</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Indore, Madhya Pradesh, India</span>
                </div>
              </div>
              <div className="social-links">
                <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://instagram.com" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="https://twitter.com" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {submitStatus === 'success' && (
                <div className="form-success" style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '24px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <div className="success-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <span className="success-icon" style={{
                      width: '48px',
                      height: '48px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      color: '#10b981'
                    }}>✓</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981', margin: 0 }}>Message Sent!</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>Thank you! We have received your query and will get back to you shortly.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-error" style={{
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  padding: '24px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <div className="error-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <span className="error-icon" style={{
                      width: '48px',
                      height: '48px',
                      background: 'rgba(239, 68, 68, 0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      color: '#ef4444'
                    }}>✕</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ef4444', margin: 0 }}>Submission Failed</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>We encountered an error. Please try again or email us directly.</p>
                  </div>
                </div>
              )}

              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectType">Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select project type</option>
                    <option value="web-development">Web Development</option>
                    <option value="digital-strategy">Digital Strategy</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="software-development">Software Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
