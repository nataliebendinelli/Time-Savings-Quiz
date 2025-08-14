'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 0, seconds: 0 })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const socialProofData = [
    "Sarah from Austin just saved 14 hours/month",
    "Mike in Denver discovered he's losing $2,400/month",
    "Jennifer from Portland got her results in 90 seconds",
    "Tom in Seattle now saves 18 hours monthly",
    "Lisa from Phoenix reduced payroll time by 85%"
  ]

  useEffect(() => {
    setIsVisible(true)
    
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          return { hours: 11, minutes: 59, seconds: 59 } // Reset to 12 hours
        }
      })
    }, 1000)

    // Social proof rotation
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % socialProofData.length)
    }, 4000)

    return () => {
      clearInterval(timer)
      clearInterval(testimonialTimer)
    }
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
          
          {/* Countdown Timer */}
          <div className="countdown-timer">
            <span className="timer-label">🔥 Limited Time Offer Expires In:</span>
            <div className="timer-display">
              <span className="time-unit">
                <span className="time-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="time-label">Hours</span>
              </span>
              <span className="time-separator">:</span>
              <span className="time-unit">
                <span className="time-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="time-label">Minutes</span>
              </span>
              <span className="time-separator">:</span>
              <span className="time-unit">
                <span className="time-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="time-label">Seconds</span>
              </span>
            </div>
          </div>

          <div className="hero-cta">
            <Link href="/quiz" className="btn btn-primary btn-large btn-pulse">
              Get My Time Back Now
              <svg className="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            
            {/* Live Social Proof */}
            <div className="social-proof-ticker">
              <span className="ticker-icon">⚡</span>
              <span className="ticker-text">{socialProofData[currentTestimonial]}</span>
            </div>
            <div className="cta-subtext">
              <p>
                <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#3f75a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                No credit card required
              </p>
              <p>
                <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#3f75a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                100% free
              </p>
              <p>
                <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#3f75a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                2-minute assessment
              </p>
            </div>
          </div>
          <div className="trust-indicators">
            <div className="trust-item">
              <strong>10,000+</strong>
              <span>Businesses Assessed</span>
            </div>
            <div className="trust-item">
              <strong>Up to 15 hrs</strong>
              <span>Time Saved/Month</span>
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
          <div className="floating-card card-4">
            <span className="card-emoji">⏰</span>
            <span className="card-text">Save 15+ Hours Monthly</span>
          </div>
          <div className="floating-card card-5">
            <span className="card-emoji">🚀</span>
            <span className="card-text">Instant Tax Filing</span>
          </div>
          <div className="floating-card card-6">
            <span className="card-emoji">💼</span>
            <span className="card-text">Employee Self-Service</span>
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