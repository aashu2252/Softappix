import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when page location changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const handleContactClick = (e) => {
    e.preventDefault()
    setIsMenuOpen(false)
    if (location.pathname === '/') {
      const contactSec = document.getElementById('contact')
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/', { state: { scrollToContact: true } })
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/assets/logo-placeholder.svg" alt="SoftAppix Logo" className="logo-icon" />
          <span className="logo-text">SoftAppix</span>
        </Link>
        
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} 
          id="mobileMenuBtn" 
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive && location.pathname === '/' ? 'active-page' : ''}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/services" 
              className={({ isActive }) => isActive ? 'active-page' : ''}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/case-studies" 
              className={({ isActive }) => isActive ? 'active-page' : ''}
            >
              Case Studies
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'active-page' : ''}
            >
              About
            </NavLink>
          </li>
          <li>
            <a href="#contact" className="nav-cta" onClick={handleContactClick}>
              Get a Quote
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
