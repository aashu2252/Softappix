import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Scroll animations
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
      '.story-stat-card, .value-card, .founder-card, .local-card'
    )

    targets.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-content container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>About</span>
          </div>
          <span className="section-tag">Our Story</span>
          <h1>Building the <span className="highlight">Digital Future</span> of Indian Businesses</h1>
          <p>We're a passionate team of developers and strategists from Indore, on a mission to help businesses thrive in the digital age — without compromise on quality or cost.</p>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="stats-banner">
        <div className="container">
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <div className="stat-label">Projects Delivered</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">9+</span>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">99%</span>
            <div className="stat-label">Client Satisfaction</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">3+</span>
            <div className="stat-label">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-text">
              <span className="section-tag">How We Started</span>
              <h2>From a Laptop in Indore to <span className="highlight">Growing Businesses</span> Across India</h2>
              <p>SoftAppix was born from a simple observation: <strong>India's local businesses were being left behind</strong> in the digital revolution. Brilliant entrepreneurs with great products had no decent web presence, no digital strategy, and no technical partner they could trust.</p>
              <p>We started with one goal — <strong>bridge that gap</strong>. By combining world-class frontend technology with deep understanding of the Indian market, we help businesses from Indore and beyond establish a powerful, credible digital identity.</p>
              <p>From IndiaMart sellers needing a product catalog to enterprises requiring AI-powered automation, we've built solutions that genuinely move the needle — and we're just getting started.</p>
            </div>
            <div className="story-visual">
              <div className="story-stat-card">
                <span className="number">10+</span>
                <span className="label">Websites Launched</span>
              </div>
              <div className="story-stat-card">
                <span className="number">2025</span>
                <span className="label">Year Founded</span>
              </div>
              <div className="story-stat-card">
                <span className="number">100%</span>
                <span className="label">Remote-First Team</span>
              </div>
              <div className="story-stat-card">
                <span className="number">24h</span>
                <span className="label">Avg. Response Time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What Drives Us</span>
            <h2 className="section-title">Mission, Vision & Values</h2>
            <p className="section-subtitle">The principles that guide every decision we make, every line of code we write.</p>
          </div>
          <div className="values-grid">
            <div className="value-card" style={{ gridColumn: 'span 1' }}>
              <span className="value-emoji">🎯</span>
              <h3>Mission</h3>
              <p>To empower Indian businesses — especially local SMBs — with high-performance digital solutions that were once only accessible to large corporations. We make world-class technology affordable and approachable.</p>
            </div>
            <div className="value-card">
              <span className="value-emoji">🔭</span>
              <h3>Vision</h3>
              <p>A digital India where every business, regardless of size or location, has the tools to compete globally. We envision being the go-to technical partner for the next generation of Indian entrepreneurs.</p>
            </div>
            <div className="value-card">
              <span className="value-emoji">⭐</span>
              <h3>Excellence</h3>
              <p>We take pride in our craft. Every project gets our absolute best — clean code, thoughtful design, and solutions that are built to last well beyond the launch date.</p>
            </div>
            <div className="value-card">
              <span className="value-emoji">🤝</span>
              <h3>Partnership</h3>
              <p>We don't disappear after delivery. We invest in long-term relationships, provide ongoing support, and grow alongside our clients as their businesses evolve and scale.</p>
            </div>
            <div className="value-card">
              <span className="value-emoji">🔍</span>
              <h3>Transparency</h3>
              <p>No hidden fees, no vague timelines, no black-box decisions. We keep you informed at every step with clear communication and honest progress updates.</p>
            </div>
            <div className="value-card">
              <span className="value-emoji">🚀</span>
              <h3>Innovation</h3>
              <p>We stay ahead of the curve, constantly learning and adopting new technologies — from Vite and React to Gemini AI — to ensure our clients always have a competitive edge.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">The Team</span>
            <h2 className="section-title">Meet the Founder</h2>
            <p className="section-subtitle">The person behind the code, the strategy, and the vision.</p>
          </div>
          <div className="founder-card">
            <div className="founder-avatar">
              <img src="/assets/founder-placeholder.svg" alt="Aashutosh Kumar - Founder" />
            </div>
            <div className="founder-info">
              <h2 className="founder-name">Aashutosh Kumar</h2>
              <p className="founder-role">Founder & Full-Stack Developer</p>
              <p className="founder-bio">A self-driven developer and digital strategist based in Indore, Madhya Pradesh. Aashutosh founded SoftAppix with a clear vision: to give local businesses the same digital firepower as big-city enterprises — without the big-city price tag.</p>
              <p className="founder-bio">With expertise spanning React, Python, Node.js, and custom software development, he leads every project end-to-end, ensuring technical excellence meets real business outcomes. He has personally delivered 10+ projects ranging from high-conversion landing pages to full-scale SaaS platforms.</p>
              <div className="founder-tags">
                <span className="founder-tag">React & Vite</span>
                <span className="founder-tag">Python</span>
                <span className="founder-tag">Firebase</span>
                <span className="founder-tag">Software Development</span>
                <span className="founder-tag">SEO Strategy</span>
                <span className="founder-tag">UI/UX Design</span>
                <span className="founder-tag">Cloud Infrastructure</span>
                <span className="founder-tag">E-commerce</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
                <a href="mailto:softappix@gmail.com" className="btn btn-primary">📧 softappix@gmail.com</a>
                <a href="tel:+918517072252" className="btn btn-secondary">📱 +91 8517072252</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indore roots advantage */}
      <section className="local-roots" id="indore-advantage">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Differentiator</span>
            <h2 className="section-title">The Indore Advantage</h2>
            <p className="section-subtitle">Local expertise that understands your market, global technology that sets you apart.</p>
          </div>
          <div className="local-grid">
            <div className="local-card">
              <div className="local-icon">🏘️</div>
              <h3>Local Roots</h3>
              <p>We understand the pulse of Indian business — the urgency, the budget constraints, the relationships, and the nuances of working with local clients, vendors, and markets.</p>
              <ul className="local-highlights">
                <li>Deep understanding of Indian SMB challenges</li>
                <li>Hindi & English communication support</li>
                <li>Reasonable pricing for local businesses</li>
                <li>Relationship-first approach</li>
                <li>In-person meetings available (Indore)</li>
              </ul>
            </div>
            <div className="local-divider"><span>→</span></div>
            <div className="local-card">
              <div className="local-icon">🌍</div>
              <h3>Global Standards</h3>
              <p>Our technology stack, development practices, and design thinking are benchmarked against the best in Silicon Valley — giving our clients products that compete internationally.</p>
              <ul className="local-highlights">
                <li>React & Vite — industry-leading stack</li>
                <li>WCAG accessibility compliance</li>
                <li>Google Core Web Vitals optimized</li>
                <li>ISO-standard security practices</li>
                <li>Internationally benchmarked UX design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner-inner">
            <span className="section-tag">Work With Us</span>
            <h2>Ready to Transform Your <span className="highlight">Digital Presence?</span></h2>
            <p>Join 30+ businesses that trust SoftAppix to build, grow, and maintain their digital footprint.</p>
            <div className="hero-ctas">
              <Link to="/" state={{ scrollToContact: true }} className="btn btn-primary">Start a Conversation</Link>
              <Link to="/case-studies" className="btn btn-secondary">See Our Work</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
