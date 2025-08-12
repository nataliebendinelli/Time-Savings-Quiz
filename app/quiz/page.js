'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const quizQuestions = [
  {
    id: 1,
    title: "How do you currently handle payroll for your business?",
    options: [
      { text: "Manually with spreadsheets and calculators", points: 4 },
      { text: "Basic payroll software but lots of manual data entry", points: 3 },
      { text: "Partially automated system with some manual steps", points: 2 },
      { text: "Fully automated payroll system", points: 1 }
    ]
  },
  {
    id: 2,
    title: "How much time do you (or your team) spend on payroll each pay period?",
    options: [
      { text: "More than 8 hours", points: 4 },
      { text: "4-8 hours", points: 3 },
      { text: "2-4 hours", points: 2 },
      { text: "Less than 2 hours", points: 1 }
    ]
  },
  {
    id: 3,
    title: "How often do you have to fix payroll mistakes or handle employee questions about their pay?",
    options: [
      { text: "Every pay period - it's a constant headache", points: 4 },
      { text: "A few times per month", points: 3 },
      { text: "Occasionally, maybe once a month", points: 2 },
      { text: "Rarely, our payroll is usually accurate", points: 1 }
    ]
  },
  {
    id: 4,
    title: "How do you handle payroll taxes and compliance reporting?",
    options: [
      { text: "Manually calculate and file everything myself", points: 4 },
      { text: "Use basic software but still need to double-check everything", points: 3 },
      { text: "Mostly automated but requires some manual oversight", points: 2 },
      { text: "Fully automated with automatic tax filing and compliance", points: 1 }
    ]
  },
  {
    id: 5,
    title: "How do your employees access their pay stubs, tax forms, and payroll information?",
    options: [
      { text: "They have to ask me for everything - I print/email manually", points: 4 },
      { text: "I email them documents each pay period", points: 3 },
      { text: "They can access some things online but often need my help", points: 2 },
      { text: "They have full self-service access to everything they need", points: 1 }
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
  const [showEncouragement, setShowEncouragement] = useState(false)

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    // Show encouragement popup for high-pain answers (4 points)
    if (answer.points === 4) {
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 3000)
    }

    // Move to next question or show lead form
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
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

    // Determine personality and messaging based on new scoring
    let personality, description, ctaText, urgencyMessage, hoursSaved

    if (totalScore >= 16) {
      personality = "The Payroll Prisoner"
      description = "🚨 PAYROLL EMERGENCY DETECTED! You're losing 15+ hours every month to payroll chaos. That's almost two full workdays! Immediate rescue required - let's get you free TODAY."
      ctaText = "URGENT: Emergency Payroll Rescue Demo"
      urgencyMessage = "Critical: You're losing 15+ hours/month"
      hoursSaved = 15
    } else if (totalScore >= 12) {
      personality = "The Spreadsheet Struggler"
      description = "You're fighting an uphill battle with spreadsheets and manual processes. You're losing 8-15 hours every month - that's a full workday or more! Time to upgrade your tools."
      ctaText = "Break Free From Spreadsheet Prison - Free Demo"
      urgencyMessage = "You're losing 8-15 hours/month to payroll"
      hoursSaved = 12
    } else if (totalScore >= 8) {
      personality = "The Semi-Streamlined"
      description = "You've got some systems in place, but there's still room for improvement. You're losing 4-8 hours monthly that could be spent growing your business."
      ctaText = "Optimize Your Payroll Process - See How"
      urgencyMessage = "Save 4-8 hours/month with full automation"
      hoursSaved = 6
    } else {
      personality = "The Payroll Pro"
      description = "You're already optimized! Your payroll process is running smoothly with minimal time investment. Still, there might be a few final optimizations worth exploring."
      ctaText = "See Advanced Optimization Tips"
      urgencyMessage = "Already saving time - optimize even further"
      hoursSaved = 2
    }

    // Identify main pain points based on answers
    if (answers[1]?.text.includes("Manually with spreadsheets")) painPoints.push("Manual spreadsheet chaos")
    if (answers[2]?.text.includes("More than 8 hours")) painPoints.push("Excessive time investment each pay period")
    if (answers[3]?.text.includes("Every pay period")) painPoints.push("Constant payroll errors and corrections")
    if (answers[4]?.text.includes("Manually calculate")) painPoints.push("Manual tax calculations and compliance risks")
    if (answers[5]?.text.includes("ask me for everything")) painPoints.push("No employee self-service capabilities")

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

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

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
              <span className="metric-number">${results.hoursSaved * 50}</span>
              <span className="metric-label">Monthly Value of Time Saved</span>
            </div>
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

          <div className="cta-section">
            <button 
              className="btn btn-primary btn-large"
              onClick={() => window.location.href = 'https://calendly.com/accrue-sales/demo'}
            >
              {results.ctaText}
            </button>
            <p className="urgency-message">{results.urgencyMessage}</p>
          </div>

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
          <span className="question-number">Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <h2 className="question-title">{question.title}</h2>
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

      {showEncouragement && (
        <div className="encouragement-popup">
          <h3>⏰ That's a lot of wasted time!</h3>
          <p>We can help you reclaim those hours. Keep going!</p>
        </div>
      )}
    </div>
  )
}