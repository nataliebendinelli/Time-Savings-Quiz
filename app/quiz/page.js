'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const quizQuestions = [
  {
    id: 1,
    phase: 1,
    title: "How many employees do you run payroll for?",
    options: [
      { text: "1-10 employees", points: 2 },
      { text: "11-50 employees", points: 3 },
      { text: "51-100 employees", points: 4 },
      { text: "100+ employees", points: 1, enterprise: true }
    ]
  },
  {
    id: 2,
    phase: 1,
    title: "How much of your Friday currently gets eaten up by payroll?",
    options: [
      { text: "Just a few minutes", points: 1 },
      { text: "Half the day", points: 2 },
      { text: "The entire afternoon", points: 3, showEncouragement: true },
      { text: "I'm still doing it on Saturday morning", points: 4, showEncouragement: true }
    ]
  },
  {
    id: 3,
    phase: 1,
    title: "When it comes to choosing payroll software, you are:",
    options: [
      { text: "The final decision maker", points: 4 },
      { text: "A key influencer in the decision", points: 3 },
      { text: "I evaluate and recommend solutions", points: 2 },
      { text: "I just use whatever we have", points: 1 }
    ]
  },
  {
    id: 4,
    phase: 2,
    title: "What's your current payroll setup?",
    options: [
      { text: "Excel spreadsheets and prayer", points: 4 },
      { text: "Basic payroll software that crashes", points: 3 },
      { text: "Decent software with quirks", points: 2 },
      { text: "We outsource it completely", points: 1 }
    ]
  },
  {
    id: 5,
    phase: 2,
    title: "Your employees are asking about their paychecks and you're still processing. Your response:",
    options: [
      { text: "Give me 5 minutes!", points: 1 },
      { text: "Check back Monday", points: 2 },
      { text: "Nervous laughter", points: 3 },
      { text: "Hide behind the office plant", points: 4 }
    ]
  },
  {
    id: 6,
    phase: 2,
    title: "Which payroll task makes you want to hide under your desk?",
    options: [
      { text: "Calculating hours and overtime", points: 2 },
      { text: "Tax withholdings and compliance", points: 3 },
      { text: "Benefits deductions and allocations", points: 2 },
      { text: "All of the above plus more", points: 4 }
    ]
  },
  {
    id: 7,
    phase: 3,
    title: "If you could get your Friday afternoons back, what would you do instead?",
    options: [
      { text: "Start the weekend early", points: 2 },
      { text: "Focus on growing the business", points: 1 },
      { text: "Actually eat lunch like a human", points: 3 },
      { text: "Remember what sunlight looks like", points: 4 }
    ]
  },
  {
    id: 8,
    phase: 3,
    title: "Your current payroll process moves at the speed of:",
    options: [
      { text: "A motivated sloth", points: 2 },
      { text: "Molasses in winter", points: 3 },
      { text: "Government bureaucracy", points: 4 },
      { text: "My enthusiasm on Monday morning", points: 4 }
    ]
  },
  {
    id: 9,
    phase: 3,
    title: "Your payroll spreadsheet crashes right before deadline. You become:",
    options: [
      { text: "A detective hunting for backup files", points: 2 },
      { text: "The Hulk, but with calculators", points: 3 },
      { text: "A time traveler trying to undo this moment", points: 4 },
      { text: "Someone seriously considering interpretive dance as a career", points: 4 }
    ]
  },
  {
    id: 10,
    phase: 4,
    title: "Your dream payroll system would be:",
    options: [
      { text: "One-click simple", points: 2 },
      { text: "Completely automated", points: 3 },
      { text: "Error-proof and compliant", points: 2 },
      { text: "All of the above, delivered yesterday", points: 4 }
    ]
  },
  {
    id: 11,
    phase: 4,
    title: "When are you looking to solve your payroll problems?",
    options: [
      { text: "Right now - this is urgent", points: 4, highUrgency: true },
      { text: "Within the next 3 months", points: 3 },
      { text: "Sometime this year", points: 2 },
      { text: "Eventually, when I have time", points: 1 }
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
  const [companySize, setCompanySize] = useState('')
  const [authority, setAuthority] = useState('')
  const [timeline, setTimeline] = useState('')

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    // Track special answers
    if (questionId === 1) {
      const sizeMap = {
        "1-10 employees": "1-10",
        "11-50 employees": "11-50",
        "51-100 employees": "51-100",
        "100+ employees": "100+"
      }
      setCompanySize(sizeMap[answer.text] || '')
    }

    if (questionId === 3) {
      setAuthority(answer.text)
    }

    if (questionId === 11) {
      setTimeline(answer.text)
    }

    // Show encouragement popup for high-pain answers
    if (answer.showEncouragement) {
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

    // Apply multipliers
    if (companySize === "11-50") totalScore *= 1.2
    if (authority.includes("decision maker")) totalScore *= 1.3
    if (timeline.includes("Right now")) totalScore *= 1.4

    // Determine personality and messaging
    let personality, description, ctaText, urgencyMessage, hoursSaved

    if (totalScore <= 20) {
      personality = "The Payroll Prodigy"
      description = "You're already efficient, but efficiency can always level up! While you've got a handle on payroll, there are still opportunities to reclaim precious time."
      ctaText = "See How the Pros Shave Off Those Last Few Minutes"
      urgencyMessage = "Optimize your already smooth process"
      hoursSaved = 5
    } else if (totalScore <= 30) {
      personality = "The Friday Fighter"
      description = "You're battling payroll like a warrior, but even warriors need better weapons! Your determination is admirable, but it's time to upgrade your arsenal."
      ctaText = "Upgrade Your Payroll Arsenal - Free Demo"
      urgencyMessage = "Stop fighting and start winning"
      hoursSaved = 12
    } else if (totalScore <= 40) {
      personality = "The Spreadsheet Survivor"
      description = "You've survived payroll purgatory - time for your great escape! You've proven you can handle anything, but you shouldn't have to."
      ctaText = "Break Free From Spreadsheet Prison - 30-Day Trial"
      urgencyMessage = "Your escape plan is ready"
      hoursSaved = 20
    } else {
      personality = "The Payroll Prisoner"
      description = "🚨 PAYROLL EMERGENCY DETECTED! You're losing entire days to payroll chaos. Immediate rescue required - let's get you free TODAY."
      ctaText = "URGENT: Emergency Payroll Rescue Demo"
      urgencyMessage = "Critical: Schedule your rescue within 24 hours"
      hoursSaved = 30
    }

    // Identify main pain points
    if (answers[6]?.text.includes("Tax")) painPoints.push("Tax compliance nightmares")
    if (answers[6]?.text.includes("All of the above")) painPoints.push("Complete payroll overwhelm")
    if (answers[4]?.text.includes("Excel")) painPoints.push("Manual spreadsheet chaos")
    if (answers[2]?.points >= 3) painPoints.push("Entire Fridays lost to payroll")

    return {
      score: Math.round(totalScore),
      personality,
      description,
      ctaText,
      urgencyMessage,
      hoursSaved,
      painPoints,
      companySize,
      authority,
      timeline
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
          <h3>🚀 Help is on the way!</h3>
          <p>We see you're struggling with payroll. Let's fix that!</p>
        </div>
      )}
    </div>
  )
}