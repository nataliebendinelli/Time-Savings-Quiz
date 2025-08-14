'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const quizQuestions = [
  {
    id: 1,
    title: "How do you currently handle payroll for your business?",
    options: [
      { text: "Manually with spreadsheets and calculators", points: 1 },
      { text: "Basic payroll software but lots of manual data entry", points: 2 },
      { text: "Partially automated system with some manual steps", points: 3 },
      { text: "Fully automated payroll system", points: 4 }
    ]
  },
  {
    id: 2,
    title: "What's your biggest payroll nightmare?",
    options: [
      { text: "IRS compliance issues - penalties and audits terrify me", points: 1 },
      { text: "Missing payroll entirely - angry employees are my worst nightmare", points: 1 },
      { text: "Delayed payroll - the guilt of late payments keeps me up", points: 2 },
      { text: "No major problems - I've got it under control", points: 4 }
    ]
  },
  {
    id: 3,
    title: "Is this a current problem?", // This will be dynamically updated
    isDynamic: true,
    options: [
      { text: "Yes - it's happening right now", points: 1 },
      { text: "No - but I worry it could happen", points: 3 }
    ]
  },
  {
    id: 4,
    title: "How often do payroll mistakes happen?",
    options: [
      { text: "Every single payroll - something's always wrong", points: 1 },
      { text: "Most payrolls have at least one issue", points: 2 },
      { text: "Maybe once a month", points: 3 },
      { text: "Rarely - we run pretty smooth", points: 4 }
    ]
  },
  {
    id: 5,
    title: "How do you handle payroll taxes?",
    options: [
      { text: "I do it all manually", points: 1 },
      { text: "Software helps, but I still worry", points: 2 },
      { text: "Mostly automated, some checking", points: 3 },
      { text: "Fully automated - set and forget", points: 4 }
    ]
  },
  {
    id: 6,
    title: "How do your employees access their pay stubs, tax forms, and payroll information?",
    options: [
      { text: "They have to ask me for everything - I print/email manually", points: 1 },
      { text: "I email them documents each pay period", points: 2 },
      { text: "They can access some things online but often need my help", points: 3 },
      { text: "They have full self-service access to everything they need", points: 4 }
    ]
  }
]

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [leadData, setLeadData] = useState({})
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expandedChallenge, setExpandedChallenge] = useState(null)

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    // Skip question 3 if they selected "No major problems" in question 2
    let nextQuestion = currentQuestion + 1
    if (questionId === 2 && answer.text.includes("No major problems")) {
      // Skip the "Is this a current problem?" question
      nextQuestion = currentQuestion + 2
    }

    // Move to next question or show lead form
    if (nextQuestion <= quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(nextQuestion), 300)
    } else {
      setTimeout(() => setShowLeadForm(true), 300)
    }
  }

  const challengeInfo = {
    "Manual spreadsheet chaos": {
      icon: "📊",
      description: "Using spreadsheets for payroll is error-prone and time-consuming. Studies show manual entry has a 1% error rate per field, which compounds quickly across employees and pay periods.",
      solution: "Automated payroll eliminates manual data entry, reducing errors by 99% and saving 10+ hours monthly."
    },
    "IRS compliance fears and audit risks": {
      icon: "🚨",
      description: "Tax penalties can cost thousands. The IRS issued $7 billion in payroll tax penalties last year. Even small mistakes can trigger audits.",
      solution: "Our tax compliance engine automatically calculates, files, and pays all federal, state, and local taxes on time."
    },
    "Risk of missing payroll entirely": {
      icon: "😰",
      description: "Missing payroll damages employee trust and can lead to legal issues. 50% of employees will start job hunting after just one missed payment.",
      solution: "Set it and forget it - automated payroll runs like clockwork, even when you're on vacation."
    },
    "Payroll delays affecting employee morale": {
      icon: "⏰",
      description: "Late payments hurt morale and productivity. Employees who worry about pay are 48% less productive at work.",
      solution: "Guarantee on-time payments every time with automated scheduling and reminders."
    },
    "Currently experiencing this problem": {
      icon: "🔥",
      description: "Active payroll problems compound over time. The longer you wait, the more it costs in time, money, and stress.",
      solution: "Don't let this problem get worse. We can have you set up and running smoothly in less than 15 minutes."
    },
    "Constant payroll errors and corrections": {
      icon: "❌",
      description: "Each payroll correction takes 30-60 minutes to fix. Multiply that by every pay period and you're losing days of productivity.",
      solution: "Automated validation catches errors before they happen, and employee self-service reduces correction requests by 75%."
    },
    "Manual tax calculations and compliance risks": {
      icon: "🧮",
      description: "Tax laws change constantly - there were 500+ payroll tax updates last year alone. Manual calculations can't keep up.",
      solution: "Our system updates automatically with every tax law change, ensuring you're always compliant."
    },
    "No employee self-service capabilities": {
      icon: "📱",
      description: "Without self-service, you become the help desk. The average business spends 5 hours monthly answering employee payroll questions.",
      solution: "Give employees 24/7 access to pay stubs, W-2s, and time-off balances through our mobile app."
    }
  }

  const calculateResults = () => {
    let totalScore = 0
    let painPoints = []
    
    Object.values(answers).forEach(answer => {
      totalScore += answer.points
    })

    // Determine personality and messaging based on reversed scoring (higher = better)
    let personality, description, ctaText, urgencyMessage, hoursSaved

    if (totalScore >= 18) {
      personality = "The Smooth Operator"
      description = "Your payroll runs like a well-oiled machine! You've mastered the basics. But did you know we also handle HR compliance, benefits admin, and tax planning? Let's optimize your entire back office."
      ctaText = "Explore Our Full Service Suite"
      urgencyMessage = "Running smooth - see what else we offer"
      hoursSaved = 2
    } else if (totalScore >= 14) {
      personality = "The Settler"
      description = "You're settling for 'good enough' when 'great' is within reach. You're still losing 4-8 hours monthly on payroll tasks that could be automated. Why settle when you could soar?"
      ctaText = "Stop Settling - Start Thriving"
      urgencyMessage = "Save 4-8 hours/month with full automation"
      hoursSaved = 6
    } else if (totalScore >= 10) {
      personality = "The Barely Surviving"
      description = "You're barely keeping your head above water! Between spreadsheets and manual calculations, you're drowning in 8-15 hours of payroll work every month. Let's throw you a lifeline."
      ctaText = "Get Your Rescue Plan - Free Demo"
      urgencyMessage = "You're losing 8-15 hours/month to payroll"
      hoursSaved = 12
    } else {
      personality = "The Chaos Commander"
      description = "🚨 PAYROLL CHAOS DETECTED! You're commanding a sinking ship, losing 15+ hours every month to payroll disasters. Your business deserves better than this constant firefighting!"
      ctaText = "URGENT: End the Chaos Now"
      urgencyMessage = "Critical: You're losing 15+ hours/month"
      hoursSaved = 15
    }

    // Identify main pain points based on answers
    if (answers[1]?.text.includes("Manually with spreadsheets")) painPoints.push("Manual spreadsheet chaos")
    if (answers[2]?.text.includes("IRS compliance")) painPoints.push("IRS compliance fears and audit risks")
    if (answers[2]?.text.includes("Missing payroll")) painPoints.push("Risk of missing payroll entirely")
    if (answers[2]?.text.includes("Delayed payroll")) painPoints.push("Payroll delays affecting employee morale")
    if (answers[3]?.text.includes("Yes")) painPoints.push("Currently experiencing this problem")
    if (answers[4]?.text.includes("Every pay period")) painPoints.push("Constant payroll errors and corrections")
    if (answers[5]?.text.includes("Manually calculate")) painPoints.push("Manual tax calculations and compliance risks")
    if (answers[6]?.text.includes("ask me for everything")) painPoints.push("No employee self-service capabilities")

    return {
      score: Math.round(totalScore),
      personality,
      description,
      ctaText,
      urgencyMessage,
      hoursSaved,
      painPoints
    }
  }

  const handleLeadSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target)
    const lead = {
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      companyName: formData.get('companyName'),
      phone: formData.get('phone'),
      quizResults: calculateResults()
    }

    try {
      // Send to HubSpot via API route
      const response = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      })

      if (response.ok) {
        setLeadData(lead)
        setShowLeadForm(false)
        setShowResults(true)
      }
    } catch (error) {
      console.error('Error submitting lead:', error)
      // Show results anyway
      setLeadData(lead)
      setShowLeadForm(false)
      setShowResults(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate actual questions answered (accounting for skipped question)
  const questionsAnswered = Object.keys(answers).length
  const totalQuestions = answers[2]?.text.includes("No major problems") ? 5 : 6
  const progress = ((questionsAnswered + 1) / totalQuestions) * 100

  if (showResults) {
    const results = calculateResults()
    const [animateIn, setAnimateIn] = useState(false)
    
    useEffect(() => {
      setTimeout(() => setAnimateIn(true), 100)
    }, [])
    
    return (
      <div className="quiz-container results-page">
        <nav className="quiz-nav">
          <Image src="/accrue-logo.svg" alt="Accrue" width={120} height={35} />
        </nav>
        
        <div className={`results-container ${animateIn ? 'animate-in' : ''}`}>
          <div className="results-header">
            <div className="personality-badge">
              <div className="badge-glow"></div>
              <h1 className="personality-title">{results.personality}</h1>
              <div className="personality-emoji">
                {results.personality.includes('Smooth') ? '😎' : 
                 results.personality.includes('Settler') ? '😐' :
                 results.personality.includes('Barely') ? '😰' : '🔥'}
              </div>
            </div>
            
            <p className="personality-description">{results.description}</p>
          </div>
          
          <div className="results-metrics">
            <div className="metric-card metric-time">
              <div className="metric-icon">⏰</div>
              <div className="metric-content">
                <span className="metric-number counter" data-target={results.hoursSaved}>
                  {results.hoursSaved}
                </span>
                <span className="metric-label">Hours/Month You Could Save</span>
              </div>
            </div>
            <div className="metric-card metric-money">
              <div className="metric-icon">💰</div>
              <div className="metric-content">
                <span className="metric-number counter" data-target={results.hoursSaved * 85}>
                  ${results.hoursSaved * 85}
                </span>
                <span className="metric-label">Monthly Value of Time Saved</span>
              </div>
            </div>
          </div>

          <div className="action-section">
            <div className="urgency-banner">
              <span className="urgency-icon">⚡</span>
              <p className="urgency-message">{results.urgencyMessage}</p>
            </div>
            <button 
              className="btn btn-primary btn-large btn-results-cta"
              onClick={() => window.location.href = 'https://calendly.com/accrue-sales/demo'}
            >
              {results.ctaText}
              <svg className="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {results.painPoints.length > 0 && (
            <div className="pain-points">
              <h3>Your Biggest Challenges:</h3>
              <div className="challenges-list">
                {results.painPoints.map((point, idx) => {
                  const info = challengeInfo[point]
                  const isExpanded = expandedChallenge === idx
                  
                  return (
                    <div key={idx} className="challenge-item">
                      <button 
                        className="challenge-header"
                        onClick={() => setExpandedChallenge(isExpanded ? null : idx)}
                      >
                        <span className="challenge-title">
                          <span className="challenge-icon">{info?.icon || "•"}</span>
                          {point}
                        </span>
                        <span className="expand-icon">{isExpanded ? "−" : "+"}</span>
                      </button>
                      {isExpanded && info && (
                        <div className="challenge-details">
                          <p className="challenge-description">{info.description}</p>
                          <div className="challenge-solution">
                            <strong>✅ How we solve this:</strong>
                            <p>{info.solution}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="share-section">
            <h4>Share Your Payroll Personality:</h4>
            <div className="share-buttons">
              <button onClick={() => {
                const text = `I'm a ${results.personality}! Just discovered I could save ${results.hoursSaved} hours/month on payroll. Take the quiz:`
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`)
              }}>Share on LinkedIn</button>
            </div>
          </div>

          <div className="tagline-footer">
            <p><strong>Now You Know It's Right™</strong></p>
            <p>Eliminate Errors • Crush Complexity • Call on an Expert</p>
            <p className="source-note">*Time value based on average small business owner income data</p>
          </div>
        </div>
      </div>
    )
  }

  if (showLeadForm) {
    return (
      <div className="quiz-container">
        <nav className="quiz-nav">
          <Image src="/accrue-logo.svg" alt="Accrue" width={120} height={35} />
        </nav>
        
        <div className="lead-form-container">
          <h2>Almost There! Get Your Results</h2>
          <p>See your Payroll Personality and personalized recommendations</p>
          
          <form onSubmit={handleLeadSubmit} className="lead-form">
            <input 
              type="email" 
              name="email" 
              placeholder="Work Email*" 
              required 
              className="form-input"
            />
            <input 
              type="text" 
              name="firstName" 
              placeholder="First Name*" 
              required 
              className="form-input"
            />
            <input 
              type="text" 
              name="companyName" 
              placeholder="Company Name*" 
              required 
              className="form-input"
            />
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone (Optional - for priority support)" 
              className="form-input"
            />
            <button 
              type="submit" 
              className="btn btn-primary btn-large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Get My Results'}
            </button>
            <p className="privacy-note">🔒 We respect your privacy. No spam, ever.</p>
          </form>
        </div>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]
  
  // Dynamically update question 3 title based on question 2 answer
  let dynamicTitle = question.title
  if (question.id === 3 && answers[2]) {
    const problemText = answers[2].text.split(' - ')[0] // Get the main part before the dash
    dynamicTitle = (
      <>
        <span style={{ fontSize: '0.9em', fontWeight: 'normal', display: 'block', marginBottom: '0.5rem', color: '#666' }}>
          You said <strong style={{ color: '#FF6B6B' }}>{problemText.toLowerCase()}</strong> was your biggest concern.
        </span>
        Is this happening right now?
      </>
    )
  }

  return (
    <div className="quiz-container">
      <nav className="quiz-nav">
        <Image src="/accrue-logo.svg" alt="Accrue" width={120} height={35} />
      </nav>
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="quiz-content">
        <div className="question-header">
          <span className="question-number">Question {questionsAnswered + 1} of {totalQuestions}</span>
          <h2 className="question-title">{question.isDynamic ? dynamicTitle : question.title}</h2>
        </div>
        
        <div className="answer-options">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className="answer-option"
              onClick={() => handleAnswer(question.id, option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}