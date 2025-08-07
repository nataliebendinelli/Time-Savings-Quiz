/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  env: {
    HUBSPOT_API_KEY: process.env.HUBSPOT_API_KEY,
    HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID,
    HUBSPOT_FORM_ID: process.env.HUBSPOT_FORM_ID,
  },
}

module.exports = nextConfig