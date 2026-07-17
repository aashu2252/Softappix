import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Services() {
  const location = useLocation()

  // Scroll to section based on hash link
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  // Scroll animations
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
      '.service-card, .process-step, .why-card'
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
            <span>Services</span>
          </div>
          <span className="section-tag">What We Do</span>
          <h1>Comprehensive <span class="highlight">Digital Solutions</span></h1>
          <p>From concept to deployment, we handle every aspect of your digital transformation — with speed, precision, and a passion for results.</p>
          <div className="hero-ctas">
            <Link to="/" state={{ scrollToContact: true }} className="btn btn-primary">Get a Free Quote</Link>
            <Link to="/case-studies" className="btn btn-secondary">View Our Work</Link>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="services-detail" id="services-detail">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Core Offerings</span>
            <h2 className="section-title">Everything You Need to Go Digital</h2>
            <p className="section-subtitle">Tailored solutions built on modern technology, designed for measurable business impact.</p>
          </div>

          <div className="services-grid">
            {/* Web Development */}
            <div className="service-card" id="web-development">
              <div className="service-icon">🎨</div>
              <h3 className="service-title">Web Development</h3>
              <p className="service-description">We craft lightning-fast, visually stunning web experiences using React, Vite, and modern UI/UX principles. Every line of code is written with performance and scalability in mind.</p>
              <ul className="service-features" style={{ marginBottom: '24px' }}>
                <li>Custom React Applications</li>
                <li>Sub-second Load Times (Vite-powered)</li>
                <li>Responsive / Mobile-First Design</li>
                <li>Core Web Vitals Optimization</li>
                <li>Netlify / Vercel Deployment</li>
                <li>1-Month Post-Launch Support</li>
              </ul>
              <Link to="/" state={{ scrollToContact: true }} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start a Project →</Link>
            </div>

            {/* Digital Strategy */}
            <div className="service-card" id="digital-strategy">
              <div className="service-icon">📈</div>
              <h3 className="service-title">Digital Strategy</h3>
              <p className="service-description">We help you reach the right audience at the right time. Through data-driven SEO, content marketing, and analytics, we turn your digital presence into a lead-generation machine.</p>
              <ul className="service-features" style={{ marginBottom: '24px' }}>
                <li>On-Page & Technical SEO Audits</li>
                <li>Keyword Research & Strategy</li>
                <li>Content Planning & Strategy</li>
                <li>Google Analytics 4 & Conversion Tracking</li>
                <li>Conversion Rate Optimization (CRO)</li>
                <li>A/B Testing & Data Insights</li>
              </ul>
              <Link to="/" state={{ scrollToContact: true }} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Grow Your Brand →</Link>
            </div>

            {/* E-commerce */}
            <div className="service-card" id="ecommerce">
              <div className="service-icon">🛒</div>
              <h3 className="service-title">E-commerce Solutions</h3>
              <p className="service-description">Custom online storefronts for IndiaMart sellers, B2B businesses, and D2C brands. We build seamless shopping experiences that convert visitors into loyal customers.</p>
              <ul className="service-features" style={{ marginBottom: '24px' }}>
                <li>Custom Product Catalogs</li>
                <li>Razorpay / PayU Payments</li>
                <li>Inventory & Order Management</li>
                <li>WhatsApp Order Alerts</li>
                <li>IndiaMart Lead Import</li>
                <li>Mobile-Optimized Checkout</li>
              </ul>
              <Link to="/" state={{ scrollToContact: true }} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Build Your Store →</Link>
            </div>

            {/* Software Development */}
            <div className="service-card" id="software-development">
              <div className="service-icon">💻</div>
              <h3 className="service-title">Software Development</h3>
              <p className="service-description">Custom-built software solutions tailored to your business needs. From internal tools to full-scale SaaS platforms, we engineer robust, scalable applications that solve real problems.</p>
              <ul className="service-features" style={{ marginBottom: '24px' }}>
                <li>Custom Web Application Development</li>
                <li>SaaS Platform Engineering</li>
                <li>REST API & Backend Development</li>
                <li>Database Design & Optimization</li>
                <li>Third-Party System Integration</li>
                <li>Legacy Software Modernisation</li>
              </ul>
              <Link to="/" state={{ scrollToContact: true }} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Build Your Software →</Link>
            </div>

            {/* Mobile App Development */}
            <div className="service-card" id="mobile-app-development">
              <div className="service-icon">📱</div>
              <h3 className="service-title">Mobile App Development</h3>
              <p className="service-description">We build powerful cross-platform mobile applications that deliver native-like performance. Engage your users directly on their smartphones with seamless digital experiences.</p>
              <ul className="service-features" style={{ marginBottom: '24px' }}>
                <li>React Native Development</li>
                <li>Cross-Platform Compatibility</li>
                <li>Intuitive Mobile UI/UX</li>
                <li>Push Notifications & Alerts</li>
                <li>App Store & Google Play Launch</li>
                <li>Ongoing Maintenance</li>
              </ul>
              <Link to="/" state={{ scrollToContact: true }} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Build Your App →</Link>
            </div>

            {/* Logo Design */}
            <div className="service-card" id="logo-design">
              <div className="service-icon">✨</div>
              <h3 className="service-title">Logo Design</h3>
              <p className="service-description">Crafting memorable and professional brand identities. We design logos that capture your business essence, resonate with your target audience, and stand out in the market.</p>
              <ul className="service-features" style={{ marginBottom: '24px' }}>
                <li>Custom Brand Marks</li>
                <li>Typography Selection</li>
                <li>Color Palette Design</li>
                <li>Comprehensive Brand Guidelines</li>
                <li>Multiple File Formats (SVG, PNG, EPS)</li>
                <li>Revisions Included</li>
              </ul>
              <Link to="/" state={{ scrollToContact: true }} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Design Your Brand →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Process</span>
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">A proven 4-step process that delivers results on time, every time.</p>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-number">1</div>
              <h3 className="process-step-title">Discover</h3>
              <p className="process-step-desc">We start with a deep-dive consultation to understand your goals, audience, and competitive landscape. No guesswork — just clarity.</p>
            </div>
            <div className="process-step">
              <div className="process-number">2</div>
              <h3 className="process-step-title">Design</h3>
              <p className="process-step-desc">We craft wireframes and UI mockups that align with your brand identity, optimized for user experience and conversion from the very start.</p>
            </div>
            <div className="process-step">
              <div className="process-number">3</div>
              <h3 className="process-step-title">Develop</h3>
              <p className="process-step-desc">Our engineers build your solution using clean, maintainable code and industry best practices, with regular check-ins and progress updates.</p>
            </div>
            <div className="process-step">
              <div className="process-number">4</div>
              <h3 className="process-step-title">Launch & Grow</h3>
              <p className="process-step-desc">We deploy your product, monitor performance, and provide ongoing support to ensure it keeps delivering results as your business scales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why SoftAppix */}
      <section className="why-us">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Us</span>
            <h2 className="section-title">The SoftAppix Difference</h2>
            <p className="section-subtitle">We're not just developers — we're growth partners invested in your success.</p>
          </div>
          <div className="why-us-grid">
            <div className="why-card">
              <div className="why-card-icon">⚡</div>
              <h3>Speed Without Compromise</h3>
              <p>We ship fast without cutting corners. Our use of Vite and React ensures sub-second load times and an agile development cycle that gets you to market faster.</p>
            </div>
            <div className="why-card">
              <div className="why-card-icon">🎯</div>
              <h3>Results-Driven Approach</h3>
              <p>Every decision we make is tied to your business outcomes. We measure success by your KPIs — traffic, conversions, leads — not just lines of code shipped.</p>
            </div>
            <div className="why-card">
              <div className="why-card-icon">🤝</div>
              <h3>True Partnership</h3>
              <p>We treat your project like it's ours. With transparent communication, regular updates, and post-launch support, we stay with you long after the site goes live.</p>
            </div>
            <div className="why-card">
              <div className="why-card-icon">🏘️</div>
              <h3>Local Expertise, Global Standards</h3>
              <p>Based in Indore, we deeply understand the challenges of Indian SMBs, while applying world-class technology standards that compete on a global stage.</p>
            </div>
            <div className="why-card">
              <div className="why-card-icon">🔒</div>
              <h3>Clean, Secure Code</h3>
              <p>Security is never an afterthought. We follow OWASP guidelines, ensure HTTPS everywhere, and write code that is easy to audit, maintain, and extend.</p>
            </div>
            <div className="why-card">
              <div className="why-card-icon">📊</div>
              <h3>Data at the Core</h3>
              <p>Every project ships with analytics baked in. We help you track what matters so you can make smart, data-backed decisions as your business evolves.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner-inner">
            <span className="section-tag">Ready to Start?</span>
            <h2>Let's Build Something <span className="highlight">Exceptional</span></h2>
            <p>Tell us about your project and we'll craft a tailored solution that fits your budget, timeline, and goals.</p>
            <div className="hero-ctas">
              <Link to="/" state={{ scrollToContact: true }} className="btn btn-primary">Get a Free Quote</Link>
              <Link to="/case-studies" className="btn btn-secondary">See Our Work First</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
