import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleContactLink = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      const contactSec = document.getElementById('contact')
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/', { state: { scrollToContact: true } })
    }
  }

  const handleServiceLink = (hash) => {
    navigate(`/services#${hash}`)
    // Trigger scroll manually if already on services page
    if (location.pathname === '/services') {
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img src="/assets/logo-placeholder.svg" alt="SoftAppix Logo" className="logo-icon" />
              <span className="logo-text">SoftAppix</span>
            </Link>
            <p className="footer-tagline">Empowering businesses with high-performance web solutions.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li><button onClick={() => handleServiceLink('web-development')} className="footer-nav-btn">Web Development</button></li>
                <li><button onClick={() => handleServiceLink('digital-strategy')} className="footer-nav-btn">Digital Strategy</button></li>
                <li><button onClick={() => handleServiceLink('ecommerce')} className="footer-nav-btn">E-commerce</button></li>
                <li><button onClick={() => handleServiceLink('software-development')} className="footer-nav-btn">Software Development</button></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/case-studies">Case Studies</Link></li>
                <li><a href="#contact" onClick={handleContactLink}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Connect</h4>
              <ul>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SoftAppix. All rights reserved. | Built with ❤️ in Indore</p>
        </div>
      </div>
    </footer>
  )
}
