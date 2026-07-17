import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { 
  Trash2, LogOut, Plus, Users, FileText, 
  Globe, Image, Calendar, Mail, Tag, ArrowUpRight 
} from 'lucide-react'

export default function Admin() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  
  // Auth Form States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authSubmitting, setAuthSubmitting] = useState(false)

  // Dashboard States
  const [activeTab, setActiveTab] = useState('submissions') // 'submissions' | 'case-studies'
  const [submissions, setSubmissions] = useState([])
  const [caseStudies, setCaseStudies] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [actionError, setActionError] = useState('')

  // New Case Study Form State
  const [newStudy, setNewStudy] = useState({
    company: '',
    hook: '',
    challenge: '',
    solution: '',
    key_feature: '',
    tech_used: '',
    outcome: '',
    tag: 'Web Development',
    link: '',
    image_url: '',
    lead_increase: '',
    bounce_rate: '',
    seo_ranking: '',
    organic_traffic: ''
  })
  const [studySubmitting, setStudySubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState('')

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setAuthLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setAuthLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      fetchDashboardData()
    }
  }, [session, activeTab])

  const fetchDashboardData = async () => {
    setLoadingData(true)
    setActionError('')
    try {
      if (activeTab === 'submissions') {
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        setSubmissions(data || [])
      } else {
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .order('id', { ascending: false })
        if (error) throw error
        setCaseStudies(data || [])
      }
    } catch (err) {
      console.error('Error fetching admin data:', err)
      setActionError(err.message || 'Failed to fetch database records.')
    } finally {
      setLoadingData(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthError('')
    setAuthSubmitting(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
    } catch (err) {
      setAuthError(err.message || 'Failed to authenticate admin.')
    } finally {
      setAuthSubmitting(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const handleDeleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return
    setActionError('')
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)
      if (error) throw error
      setSubmissions(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      setActionError('Could not delete submission: ' + err.message)
    }
  }

  const handleDeleteCaseStudy = async (id) => {
    if (!window.confirm('Are you sure you want to delete this case study?')) return
    setActionError('')
    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id)
      if (error) throw error
      setCaseStudies(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      setActionError('Could not delete case study: ' + err.message)
    }
  }

  const handleAddCaseStudy = async (e) => {
    e.preventDefault()
    setStudySubmitting(true)
    setActionError('')
    setFormSuccess('')

    try {
      // Split tech used by comma and clean up whitespace
      const techArray = newStudy.tech_used
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0)

      const payload = {
        company: newStudy.company,
        hook: newStudy.hook,
        challenge: newStudy.challenge || null,
        solution: newStudy.solution || null,
        key_feature: newStudy.key_feature || null,
        tech_used: techArray,
        outcome: newStudy.outcome,
        tag: newStudy.tag,
        link: newStudy.link || null,
        image_url: newStudy.image_url || null,
        lead_increase: newStudy.lead_increase || null,
        bounce_rate: newStudy.bounce_rate || null,
        seo_ranking: newStudy.seo_ranking || null,
        organic_traffic: newStudy.organic_traffic || null
      }

      const { data, error } = await supabase
        .from('case_studies')
        .insert([payload])
        .select()

      if (error) throw error

      setFormSuccess('Case study added successfully!')
      setNewStudy({
        company: '',
        hook: '',
        challenge: '',
        solution: '',
        key_feature: '',
        tech_used: '',
        outcome: '',
        tag: 'Web Development',
        link: '',
        image_url: '',
        lead_increase: '',
        bounce_rate: '',
        seo_ranking: '',
        organic_traffic: ''
      })
      
      // Refresh list
      fetchDashboardData()

      setTimeout(() => setFormSuccess(''), 5000)
    } catch (err) {
      setActionError('Could not save case study: ' + err.message)
    } finally {
      setStudySubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <p>Verifying admin session...</p>
      </div>
    )
  }

  // LOGIN SCREEN
  if (!session) {
    return (
      <section className="contact" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '480px' }}>
          <div className="contact-form-wrapper" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="section-tag">Protected Area</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '8px' }}>Admin Dashboard</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                Sign in with your Supabase auth credentials.
              </p>
            </div>

            {authError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px',
                color: '#ef4444',
                fontSize: '0.85rem'
              }}>
                ✕ {authError}
              </div>
            )}

            <form className="contact-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Admin Email</label>
                <input 
                  type="email" 
                  placeholder="admin@softappix.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={authSubmitting}>
                {authSubmitting ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
            
            <div style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', lineHeight: '1.4' }}>
              💡 If you don't have an admin account, register one in your Supabase Dashboard under <strong>Authentication &gt; Users &gt; Add User</strong>.
            </div>
          </div>
        </div>
      </section>
    )
  }

  // LOGGED-IN ADMIN DASHBOARD
  return (
    <section className="services-detail" style={{ minHeight: '85vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Header Panel */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '24px',
          marginBottom: '32px'
        }}>
          <div>
            <span className="section-tag">Authenticated as {session.user.email}</span>
            <h2 className="section-title" style={{ margin: '4px 0 0 0', textAlign: 'left' }}>Admin Panel</h2>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '10px 16px' }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Action Error Message */}
        {actionError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            color: '#ef4444',
            fontSize: '0.9rem'
          }}>
            ✕ Error: {actionError}
          </div>
        )}

        {/* Tabs switcher */}
        <div className="filter-bar" style={{ justifyContent: 'flex-start', marginBottom: '32px' }}>
          <button 
            className={`filter-btn ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
            style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
          >
            <Users size={16} />
            Submissions ({submissions.length})
          </button>
          <button 
            className={`filter-btn ${activeTab === 'case-studies' ? 'active' : ''}`}
            onClick={() => setActiveTab('case-studies')}
            style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
          >
            <FileText size={16} />
            Case Studies Manager ({caseStudies.length})
          </button>
        </div>

        {/* TAB CONTENT: SUBMISSIONS LIST */}
        {activeTab === 'submissions' && (
          <div>
            {loadingData ? (
              <p style={{ color: 'var(--text-secondary)' }}>Loading submissions...</p>
            ) : submissions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px', border: '1px dashed var(--border-light)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No contact form submissions found in database.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {submissions.map(sub => (
                  <div key={sub.id} style={{
                    background: 'var(--card-bg-fallback)',
                    backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '12px',
                    padding: '24px',
                    position: 'relative'
                  }}>
                    <button 
                      onClick={() => handleDeleteSubmission(sub.id)}
                      style={{
                        position: 'absolute',
                        right: '24px',
                        top: '24px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: 'none',
                        color: '#ef4444',
                        padding: '8px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Delete entry"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>{sub.name}</h4>
                      <span style={{
                        background: 'rgba(56, 189, 248, 0.15)',
                        color: '#38bdf8',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {sub.project_type}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Mail size={12} /> {sub.email}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} /> {new Date(sub.created_at).toLocaleString()}
                      </span>
                    </div>

                    <div style={{ 
                      background: 'rgba(0,0,0,0.2)', 
                      padding: '16px', 
                      borderRadius: '8px', 
                      color: 'var(--text-muted)',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {sub.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: CASE STUDIES MANAGER */}
        {activeTab === 'case-studies' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'start' }}>
            
            {/* Form to Add New Case Study */}
            <div className="contact-form-wrapper" style={{ width: '100%', maxWidth: 'none', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Plus size={20} /> Add New Case Study
              </h3>

              {formSuccess && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: '#10b981',
                  marginBottom: '20px',
                  fontSize: '0.9rem'
                }}>
                  ✓ {formSuccess}
                </div>
              )}

              <form onSubmit={handleAddCaseStudy} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                
                <div className="form-group">
                  <label>Company Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Alacrity Enterprises"
                    value={newStudy.company}
                    onChange={e => setNewStudy(prev => ({ ...prev, company: e.target.value }))}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Hook / Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. B2B Industrial Wholesale Platform"
                    value={newStudy.hook}
                    onChange={e => setNewStudy(prev => ({ ...prev, hook: e.target.value }))}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Category Tag *</label>
                  <select 
                    value={newStudy.tag}
                    onChange={e => setNewStudy(prev => ({ ...prev, tag: e.target.value }))}
                    required
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Digital Strategy">Digital Strategy</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Software Development">Software Development</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Original Website Link (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com"
                    value={newStudy.link}
                    onChange={e => setNewStudy(prev => ({ ...prev, link: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label>Initial UI Image URL (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/..."
                    value={newStudy.image_url}
                    onChange={e => setNewStudy(prev => ({ ...prev, image_url: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label>Tech Used * (Comma-separated)</label>
                  <input 
                    type="text" 
                    placeholder="React, Vite, Supabase, Tailwind CSS"
                    value={newStudy.tech_used}
                    onChange={e => setNewStudy(prev => ({ ...prev, tech_used: e.target.value }))}
                    required 
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Outcome / Short Summary *</label>
                  <textarea 
                    rows="3" 
                    placeholder="Describe the final results and deliverables..."
                    value={newStudy.outcome}
                    onChange={e => setNewStudy(prev => ({ ...prev, outcome: e.target.value }))}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Challenge (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Describe the client's problem..."
                    value={newStudy.challenge}
                    onChange={e => setNewStudy(prev => ({ ...prev, challenge: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label>Solution (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Describe how SoftAppix solved it..."
                    value={newStudy.solution}
                    onChange={e => setNewStudy(prev => ({ ...prev, solution: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label>Key Feature (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Main standout feature..."
                    value={newStudy.key_feature}
                    onChange={e => setNewStudy(prev => ({ ...prev, key_feature: e.target.value }))}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', gridColumn: '1 / -1' }}>
                  <div className="form-group">
                    <label>Lead Metric (e.g. ↑ 300%)</label>
                    <input 
                      type="text" 
                      placeholder="Lead Increase"
                      value={newStudy.lead_increase}
                      onChange={e => setNewStudy(prev => ({ ...prev, lead_increase: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Bounce Metric (e.g. ↓ 80%)</label>
                    <input 
                      type="text" 
                      placeholder="Bounce Rate"
                      value={newStudy.bounce_rate}
                      onChange={e => setNewStudy(prev => ({ ...prev, bounce_rate: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label>SEO Metric (e.g. Top 3)</label>
                    <input 
                      type="text" 
                      placeholder="SEO Ranking"
                      value={newStudy.seo_ranking}
                      onChange={e => setNewStudy(prev => ({ ...prev, seo_ranking: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Traffic Metric (e.g. ↑ 200%)</label>
                    <input 
                      type="text" 
                      placeholder="Organic Traffic"
                      value={newStudy.organic_traffic}
                      onChange={e => setNewStudy(prev => ({ ...prev, organic_traffic: e.target.value }))}
                    />
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={studySubmitting}>
                    {studySubmitting ? 'Saving Case Study...' : 'Save Case Study'}
                  </button>
                </div>
              </form>
            </div>

            {/* List of Case Studies with Deletion Option */}
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px' }}>Existing Case Studies</h3>
              {loadingData ? (
                <p style={{ color: 'var(--text-secondary)' }}>Loading case studies...</p>
              ) : caseStudies.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>No case studies in database.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {caseStudies.map(study => (
                    <div key={study.id} style={{
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{ 
                        height: '120px', 
                        backgroundImage: `url(${study.image_url || 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=400&q=80'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '12px',
                          top: '12px',
                          background: 'rgba(0,0,0,0.6)',
                          color: '#fff',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontWeight: 600
                        }} className="case-tag">
                          {study.tag}
                        </span>
                      </div>
                      
                      <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 700 }}>{study.company}</h4>
                          <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{study.hook}</p>
                          
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '16px' }}>
                            {(study.tech_used || study.techUsed || []).slice(0, 3).map((tech, idx) => (
                              <span key={idx} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: '12px' }}>
                          {study.link ? (
                            <a href={study.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#38bdf8' }}>
                              Visit <ArrowUpRight size={12} />
                            </a>
                          ) : <span />}
                          <button 
                            onClick={() => handleDeleteCaseStudy(study.id)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: 'none',
                              color: '#ef4444',
                              padding: '6px 10px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.8rem'
                            }}
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  )
}
