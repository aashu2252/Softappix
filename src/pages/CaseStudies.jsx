import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCaseStudies()
  }, [])

  const fetchCaseStudies = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('id', { ascending: true })

      if (error) throw error

      // Normalize snake_case DB columns to camelCase used in JSX
      const formattedData = (data || []).map(study => ({
        ...study,
        techUsed: study.tech_used || study.techUsed || [],
        image_url: study.image_url || study.imageUrl,
        lead_increase: study.lead_increase || study.leadIncrease,
        bounce_rate: study.bounce_rate || study.bounceRate,
        seo_ranking: study.seo_ranking || study.seoRanking,
        organic_traffic: study.organic_traffic || study.organicTraffic
      }))
      setCaseStudies(formattedData)
    } catch (err) {
      console.warn('Could not fetch from Supabase:', err.message)
      setCaseStudies([])
    } finally {
      setLoading(false)
    }
  }

  // Filter logic
  const filteredCaseStudies = caseStudies.filter(study => {
    if (filter === 'all') return true
    
    // Normalize categories to match tags
    const normalizedTag = study.tag.toLowerCase().replace(' ', '-')
    
    if (filter === 'web-development') return normalizedTag === 'web-development'
    if (filter === 'digital-strategy') return normalizedTag === 'digital-strategy'
    if (filter === 'ecommerce') return normalizedTag === 'e-commerce' || normalizedTag === 'ecommerce'
    if (filter === 'software-development') return normalizedTag === 'software-development'
    
    return false
  })

  // Set category logo assets mapping or falls back to logo placeholder
  const getLogoSrc = (companyName) => {
    if (companyName.toLowerCase().includes('alacrity')) return '/assets/alacrity-logo.svg'
    if (companyName.toLowerCase().includes('global')) return '/assets/globaltech-logo.svg'
    return '/assets/logo-placeholder.svg'
  }

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-content container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Case Studies</span>
          </div>
          <span className="section-tag">Success Stories</span>
          <h1>Real Projects. <span className="highlight">Real Results.</span></h1>
          <p>Dive deep into how we've helped businesses build credibility, drive traffic, and scale their digital operations — backed by numbers that matter.</p>
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
            <span className="stat-number">1+</span>
            <div className="stat-label">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Filter and Cards Section */}
      <section className="case-studies" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="filter-bar" id="filterBar">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Projects
            </button>
            <button 
              className={`filter-btn ${filter === 'web-development' ? 'active' : ''}`}
              onClick={() => setFilter('web-development')}
            >
              Web Development
            </button>
            <button 
              className={`filter-btn ${filter === 'digital-strategy' ? 'active' : ''}`}
              onClick={() => setFilter('digital-strategy')}
            >
              Digital Strategy
            </button>
            <button 
              className={`filter-btn ${filter === 'ecommerce' ? 'active' : ''}`}
              onClick={() => setFilter('ecommerce')}
            >
              E-commerce
            </button>
            <button 
              className={`filter-btn ${filter === 'software-development' ? 'active' : ''}`}
              onClick={() => setFilter('software-development')}
            >
              Software Development
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
              <span className="loading-spinner">⚡ Loading projects...</span>
            </div>
          ) : (
            <div className="case-studies-grid" id="caseStudiesContainer">
              {filteredCaseStudies.map(study => (
                <article key={study.id} className="case-card" style={{ animation: 'fadeInUp 0.4s ease-out' }}>
                  <div 
                    className="case-card-banner"
                    style={study.image_url ? { 
                      backgroundImage: `url(${study.image_url})`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      backgroundBlendMode: 'overlay'
                    } : {}}
                  ></div>
                  <div className="case-card-logo-wrap">
                    <img src={getLogoSrc(study.company)} alt={`${study.company} Logo`} className="case-card-logo" />
                  </div>
                  <div className="case-header">
                    <span className="case-tag">{study.tag}</span>
                    <h3 className="case-hook">{study.hook}</h3>
                    <p className="case-company">{study.company}</p>
                  </div>
                  <div className="case-body">
                    <p className="case-summary">{study.outcome}</p>
                    
                    {/* Metrics grid if present */}
                    {(study.lead_increase || study.bounce_rate || study.seo_ranking || study.organic_traffic) && (
                      <div className="case-metrics-grid" style={{ marginTop: '16px', marginBottom: '16px' }}>
                        {study.lead_increase && (
                          <div className="case-metric-item">
                            <span className="case-metric-value">{study.lead_increase}</span>
                            <span className="case-metric-label">Lead Increase</span>
                          </div>
                        )}
                        {study.bounce_rate && (
                          <div className="case-metric-item">
                            <span className="case-metric-value">{study.bounce_rate}</span>
                            <span className="case-metric-label">Bounce Rate</span>
                          </div>
                        )}
                        {study.seo_ranking && (
                          <div className="case-metric-item">
                            <span className="case-metric-value">{study.seo_ranking}</span>
                            <span className="case-metric-label">SEO Ranking</span>
                          </div>
                        )}
                        {study.organic_traffic && (
                          <div className="case-metric-item">
                            <span className="case-metric-value">{study.organic_traffic}</span>
                            <span className="case-metric-label">Organic Traffic</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="case-tech">
                      {study.techUsed.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    {study.link && (
                      <div className="case-actions">
                        <a href={study.link} target="_blank" rel="noopener noreferrer" className="btn-visit">
                          <span>Visit Project</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="visit-icon">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}

              {filteredCaseStudies.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                  <p>No case studies available under this category.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner-inner">
            <span className="section-tag">Your Story Next?</span>
            <h2>Ready to Become Our <span className="highlight">Next Success Story?</span></h2>
            <p>Every great case study starts with a conversation. Tell us your goals and let's create something remarkable together.</p>
            <div className="hero-ctas">
              <Link to="/" state={{ scrollToContact: true }} className="btn btn-primary">Start Your Project</Link>
              <Link to="/services" className="btn btn-secondary">Explore Our Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
