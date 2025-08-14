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
      { text: "Missing payroll entirely - angry employees are my worst fear", points: 1 },
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

  const calculateResults = () => {
    let totalScore = 0
    let painPoints = []
    
    Object.values(answers).forEach(answer => {
      totalScore += answer.points
    })

    // Determine personality and messaging based on reversed scoring (higher = better)
    let personality, description, ctaText, urgencyMessage, hoursSaved

    if (totalScore >= 18) {
      personality = "The Payroll Pro"
      description = "You're already optimized! Your payroll process is running smoothly with minimal time investment. Still, there might be a few final optimizations worth exploring."
      ctaText = "See Advanced Optimization Tips"
      urgencyMessage = "Already saving time - optimize even further"
      hoursSaved = 2
    } else if (totalScore >= 14) {
      personality = "The Semi-Streamlined"
      description = "You've got some systems in place, but there's still room for improvement. You're losing 4-8 hours monthly that could be spent growing your business."
      ctaText = "Optimize Your Payroll Process - See How"
      urgencyMessage = "Save 4-8 hours/month with full automation"
      hoursSaved = 6
    } else if (totalScore >= 10) {
      personality = "The Spreadsheet Struggler"
      description = "You're fighting an uphill battle with spreadsheets and manual processes. You're losing 8-15 hours every month - that's a full workday or more! Time to upgrade your tools."
      ctaText = "Break Free From Spreadsheet Prison - Free Demo"
      urgencyMessage = "You're losing 8-15 hours/month to payroll"
      hoursSaved = 12
    } else {
      personality = "The Payroll Prisoner"
      description = "🚨 PAYROLL EMERGENCY DETECTED! You're losing 15+ hours every month to payroll chaos. That's almost two full workdays! It's time to break free from this payroll prison."
      ctaText = "URGENT: Schedule Emergency Payroll Rescue"
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
    return (
      <div className="quiz-container">
        <nav className="quiz-nav">
          <Image src="/accrue-logo.svg" alt="Accrue" width={120} height={35} />
        </nav>
        
        <div className="results-container">
          <div className="personality-badge">
            <h1>{results.personality}</h1>
            <div className="score-badge">Score: {results.score}</div>
          </div>
          
          <p className="personality-description">{results.description}</p>
          
          <div className="results-metrics">
            <div className="metric-card">
              <span className="metric-number">{results.hoursSaved}</span>
              <span className="metric-label">Hours/Month You Could Save</span>
            </div>
            <div className="metric-card">
              <span className="metric-number">${results.hoursSaved * 85}</span>
              <span className="metric-label">Monthly Value of Time Saved</span>
            </div>
          </div>

          <div className="cta-section" style={{ marginBottom: '2rem' }}>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => window.location.href = 'https://calendly.com/accrue-sales/demo'}
            >
              {results.ctaText}
            </button>
            <p className="urgency-message">{results.urgencyMessage}</p>
          </div>

          {results.painPoints.length > 0 && (
            <div className="pain-points">
              <h3>Your Biggest Challenges:</h3>
              <ul>
                {results.painPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
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
          You said <strong style={{ color: '#FF6B6B' }}>{problemText.toLowerCase()}</strong> was your biggest nightmare.
        </span>
        Is this nightmare happening right now?
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