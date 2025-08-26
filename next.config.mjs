// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tells Next to output a standalone Node server in `.next/standalone`
  output: 'standalone',

  // (Optional) expose your sheet ID to the server runtime
  env: {
    SHEET_ID: process.env.SHEET_ID,
  }
}

export default nextConfig
