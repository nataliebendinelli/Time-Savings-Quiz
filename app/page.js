'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          <div className="logo-wrapper">
            <Image 
              src="/accrue-logo.svg" 
              alt="Accrue Logo" 
              width={140} 
              height={40}
              priority
            />
          </div>
          <div className="nav-cta">
            <Link href="/quiz" className="btn btn-nav">
              Take the Quiz
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? 'animate-in' : ''}`}>
        <div className="hero-content">
          <div className="hero-badge">
            <span>2-MINUTE ASSESSMENT</span>
          </div>
          <h1 className="hero-title">
            Is Payroll Eating Your
            <span className="text-accent"> Entire Wednesday?</span>
          </h1>
          <p className="hero-subtitle">
            Discover your Payroll Personality and find out exactly how many hours 
            you could reclaim each month. Join 10,000+ small businesses who've 
            already discovered their path to payroll freedom.
          </p>
          <div className="hero-cta">
            <Link href="/quiz" className="btn btn-primary btn-large">
              Start Your Free Assessment
              <svg className="arrow-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <p className="cta-subtext">
              <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#3f75a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              No credit card required • 100% free
            </p>
          </div>
          <div className="trust-indicators">
            <div className="trust-item">
              <strong>10,000+</strong>
              <span>Businesses Assessed</span>
            </div>
            <div className="trust-item">
              <strong>15 hrs</strong>
              <span>Average Time Saved/Month</span>
            </div>
            <div className="trust-item">
              <strong>94%</strong>
              <span>Report Less Stress</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <span className="card-emoji">📊</span>
            <span className="card-text">Payroll in Minutes</span>
          </div>
          <div className="floating-card card-2">
            <span className="card-emoji">✅</span>
            <span className="card-text">Error-Free Processing</span>
          </div>
          <div className="floating-card card-3">
            <span className="card-emoji">🎯</span>
            <span className="card-text">100% Compliance</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-content">
          <div className="section-header">
            <h2>Why Take the Payroll Freedom Quiz?</h2>
            <p>Get personalized insights in just 2 minutes</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" fill="#e8f1f8"/>
                  <path d="M24 14V24L30 30" stroke="#3f75a0" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="10" stroke="#3f75a0" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Discover Your Time Drain</h3>
              <p>Uncover exactly how many hours payroll is stealing from your week and what that costs your business</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" fill="#e8f1f8"/>
                  <path d="M16 24L21 29L32 18" stroke="#3f75a0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Get Your Payroll Personality</h3>
              <p>Find out if you're a "Spreadsheet Survivor" or "Payroll Prisoner" with our fun personality assessment</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" fill="#e8f1f8"/>
                  <path d="M24 14L26.5 21H34L28 25.5L30.5 33L24 28L17.5 33L20 25.5L14 21H21.5L24 14Z" fill="#3f75a0"/>
                </svg>
              </div>
              <h3>Personalized Solution Path</h3>
              <p>Receive customized recommendations based on your business size, pain points, and current processes</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" fill="#e8f1f8"/>
                  <rect x="16" y="20" width="16" height="12" rx="2" stroke="#3f75a0" strokeWidth="2"/>
                  <path d="M20 24H28M20 28H24" stroke="#3f75a0" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>ROI Calculator</h3>
              <p>See your potential savings in real dollars and hours with our instant ROI calculation</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-content">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Three simple steps to payroll freedom</p>
          </div>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Answer Quick Questions</h3>
              <p>Tell us about your current payroll process and pain points in our engaging 11-question quiz</p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Get Your Results</h3>
              <p>Receive your Payroll Personality, time savings potential, and personalized recommendations</p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Take Action</h3>
              <p>Follow your custom roadmap to eliminate errors, crush complexity, and reclaim your Wednesdays</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof">
        <div className="section-content">
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              The quiz opened my eyes to how much time I was wasting. 
              We've saved 20 hours per month since switching to Accrue. 
              Now I actually leave the office on Wednesdays!
            </p>
            <div className="testimonial-author">
              <strong>Sarah Mitchell</strong>
              <span>Owner, Mitchell Design Co. (25 employees)</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Reclaim Your Wednesdays?</h2>
          <p>Join thousands of businesses who've discovered their path to payroll freedom</p>
          <Link href="/quiz" className="btn btn-primary btn-large">
            Take the 2-Minute Quiz
            <svg className="arrow-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <p className="guarantee">
            <strong>Now You Know It's Right™</strong> - Accrue's guarantee of accuracy and peace of mind
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Image 
              src="/accrue-logo.svg" 
              alt="Accrue Logo" 
              width={120} 
              height={35}
            />
            <p>© 2024 Accrue. All rights reserved.</p>
          </div>
          <div className="footer-tagline">
            <p><strong>Now You Know It's Right™</strong></p>
            <p>Eliminate Errors • Crush Complexity • Call on an Expert</p>
          </div>
        </div>
      </footer>
    </div>
  )
}