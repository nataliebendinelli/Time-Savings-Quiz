# Payroll Freedom Quiz - Deployment Instructions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed locally
- Git installed
- Vercel account (free at vercel.com)
- HubSpot account with API access

## Step 1: Install Dependencies Locally

```bash
# Navigate to project directory
cd /Users/nataliebendinelli/Desktop/Repositories/Quizzes/Time-Savings-Quiz

# Install dependencies
npm install

# Create .env.local file from example
cp .env.local.example .env.local
```

## Step 2: Configure HubSpot Integration

### Get Your HubSpot Credentials:

1. **HubSpot API Key:**
   - Go to HubSpot → Settings → Integrations → Private Apps
   - Create new private app called "Payroll Quiz"
   - Grant these scopes:
     - `crm.objects.contacts.write`
     - `forms`
   - Copy the API key

2. **HubSpot Portal ID:**
   - Go to HubSpot → Settings → Account Overview
   - Copy your Hub ID/Portal ID

3. **HubSpot Form ID:**
   - Go to HubSpot → Marketing → Forms
   - Create new form called "Payroll Freedom Quiz"
   - Add these fields:
     - Email (required)
     - First Name (required)
     - Company (required)
     - Phone (optional)
     - Quiz Personality (single-line text)
     - Quiz Score (number)
     - Company Size (dropdown)
     - Timeline (dropdown)
     - Hours Saved Potential (number)
     - Pain Points (multi-line text)
   - Copy the Form ID from the form's URL or embed code

### Add Credentials to .env.local:

Edit `.env.local` and add your credentials:

```env
HUBSPOT_API_KEY=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
HUBSPOT_PORTAL_ID=12345678
HUBSPOT_FORM_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## Step 3: Test Locally

```bash
# Run development server
npm run dev

# Open browser to http://localhost:3000
# Test the quiz flow and form submission
```

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Follow prompts:
# - Set up and deploy: Y
# - Which scope: Select your account
# - Link to existing project: N
# - Project name: payroll-freedom-quiz
# - Directory: ./
# - Override settings: N
```

### Option B: Deploy via GitHub + Vercel Dashboard

1. **Push to GitHub:**
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Payroll Freedom Quiz"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/payroll-freedom-quiz.git

# Push to GitHub
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: `.next`
   - Click "Deploy"

## Step 5: Add Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables for Production:

   ```
   HUBSPOT_API_KEY = your_actual_api_key
   HUBSPOT_PORTAL_ID = your_actual_portal_id
   HUBSPOT_FORM_ID = your_actual_form_id
   ```

4. Click "Save" for each variable
5. Redeploy to apply changes:
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Select "Redeploy"

## Step 6: Configure Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., quiz.accrue.com)
3. Follow DNS configuration instructions:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or use Vercel nameservers

## Step 7: Verify Deployment

1. **Test Quiz Flow:**
   - Visit your deployed URL
   - Click "Start Quiz" from landing page
   - Complete all 11 questions
   - Submit lead form
   - Verify results page displays

2. **Verify HubSpot Integration:**
   - Check HubSpot → Contacts for new lead
   - Check HubSpot → Forms for submission
   - Verify all quiz data is captured

## 📊 Monitoring & Analytics

### Vercel Analytics
1. Enable Analytics in Vercel Dashboard
2. Add to package.json:
   ```json
   "@vercel/analytics": "^1.0.0"
   ```
3. Import in `app/layout.js`:
   ```javascript
   import { Analytics } from '@vercel/analytics/react'
   
   // Add before closing </body>
   <Analytics />
   ```

### Monitor Key Metrics:
- Page load times
- Quiz completion rates
- Form submission success
- API response times

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check Node version (needs 18+)
   - Clear cache: `rm -rf .next node_modules`
   - Reinstall: `npm install`

2. **HubSpot Not Receiving Data:**
   - Verify environment variables in Vercel
   - Check API key permissions
   - Test with console.log in API route
   - Check Vercel Function logs

3. **Images Not Loading:**
   - Ensure logo is in `/public` folder
   - Use correct path: `/accrue-logo.svg`

4. **Slow Performance:**
   - Enable Vercel Edge Functions
   - Optimize images with Next.js Image component
   - Check bundle size with `npm run build`

### Debug Mode:

Add to `.env.local` for debugging:
```env
DEBUG=true
```

Check logs in Vercel Dashboard → Functions tab

## 📝 Post-Deployment Checklist

- [ ] Landing page loads correctly
- [ ] Quiz navigation works smoothly
- [ ] Progress bar updates properly
- [ ] Encouragement popup shows for high-pain answers
- [ ] Lead form validates email format
- [ ] Results calculate correctly
- [ ] HubSpot receives form submission
- [ ] Contact created in HubSpot CRM
- [ ] Social sharing buttons work
- [ ] Mobile responsive design works
- [ ] Page load time < 3 seconds
- [ ] SSL certificate active
- [ ] Analytics tracking working

## 🔄 Updating the Quiz

To make changes after deployment:

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Vercel auto-deploys from main branch

Or use Vercel CLI:
```bash
vercel --prod
```

## 📧 Support

For issues with:
- **Vercel Deployment:** support@vercel.com
- **HubSpot Integration:** Check HubSpot developer docs
- **Quiz Logic:** Review `/app/quiz/page.js`

## 🎉 Success Indicators

Your quiz is successfully deployed when:
1. URL is accessible (e.g., payroll-freedom-quiz.vercel.app)
2. Quiz completes without errors
3. Leads appear in HubSpot within 1 minute
4. No errors in Vercel Function logs
5. Page scores 90+ on Google PageSpeed

---

**Remember:** The quiz already works! This deployment just puts it online with proper HubSpot integration. Keep your `.env.local` file secure and never commit it to Git.