/** @type {import('next').NextConfig} */

// When building for GitHub Pages we set PAGES=true (see .github/workflows/deploy.yml):
// static export + a basePath because the site is served at /<repo>.
const isPages = process.env.PAGES === "true";
const basePath = isPages ? process.env.PAGES_BASE_PATH || "/skylens" : "";

const nextConfig = {
  reactStrictMode: true,
  ...(isPages ? { output: "export", basePath, assetPrefix: basePath, trailingSlash: true } : {}),
  images: {
    unoptimized: isPages,
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Make the basePath available to client code (e.g. for fetch/asset URLs if needed).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
