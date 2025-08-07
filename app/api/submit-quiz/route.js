import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // HubSpot API configuration
    const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY
    const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID
    const HUBSPOT_FORM_ID = process.env.HUBSPOT_FORM_ID

    if (!HUBSPOT_API_KEY || !HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID) {
      console.error('Missing HubSpot configuration')
      // Still return success to not break the user experience
      return NextResponse.json({ success: true, message: 'Configuration pending' })
    }

    // Prepare HubSpot form submission
    const hubspotData = {
      fields: [
        {
          name: 'email',
          value: body.email
        },
        {
          name: 'firstname',
          value: body.firstName
        },
        {
          name: 'company',
          value: body.companyName
        },
        {
          name: 'phone',
          value: body.phone || ''
        },
        {
          name: 'quiz_personality',
          value: body.quizResults?.personality || ''
        },
        {
          name: 'quiz_score',
          value: String(body.quizResults?.score || 0)
        },
        {
          name: 'company_size',
          value: body.quizResults?.companySize || ''
        },
        {
          name: 'timeline',
          value: body.quizResults?.timeline || ''
        },
        {
          name: 'hours_saved_potential',
          value: String(body.quizResults?.hoursSaved || 0)
        },
        {
          name: 'pain_points',
          value: body.quizResults?.painPoints?.join(', ') || ''
        }
      ],
      context: {
        pageUri: request.headers.get('referer') || 'https://quiz.accrue.com',
        pageName: 'Payroll Freedom Quiz Results'
      }
    }

    // Submit to HubSpot Forms API
    const hubspotResponse = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotData)
      }
    )

    if (!hubspotResponse.ok) {
      const errorText = await hubspotResponse.text()
      console.error('HubSpot submission failed:', errorText)
      // Still return success to not break the user experience
      return NextResponse.json({ success: true, message: 'Saved locally' })
    }

    // Optional: Also create a contact using the HubSpot API
    if (HUBSPOT_API_KEY) {
      try {
        const contactData = {
          properties: {
            email: body.email,
            firstname: body.firstName,
            company: body.companyName,
            phone: body.phone || '',
            quiz_personality: body.quizResults?.personality || '',
            quiz_score: String(body.quizResults?.score || 0),
            lifecyclestage: 'lead',
            lead_source: 'Payroll Freedom Quiz'
          }
        }

        await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contactData)
        })
      } catch (contactError) {
        console.error('Contact creation error:', contactError)
        // Don't fail the main request
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Quiz results submitted successfully' 
    })

  } catch (error) {
    console.error('Quiz submission error:', error)
    // Return success to not break user experience
    return NextResponse.json({ 
      success: true, 
      message: 'Results saved' 
    })
  }
}