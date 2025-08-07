import './globals.css'

export const metadata = {
  title: 'Payroll Freedom Quiz - Reclaim Your Fridays | Accrue',
  description: 'Discover how much time you\'re losing to payroll and get your personalized payroll personality. Take our 2-minute quiz and find out how Accrue can help you reclaim your Fridays.',
  keywords: 'payroll, HR, small business, time savings, payroll software, Accrue',
  openGraph: {
    title: 'Payroll Freedom Quiz - Reclaim Your Fridays',
    description: 'Find out how much time you could save on payroll',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}