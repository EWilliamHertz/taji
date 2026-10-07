import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cloud Shell domains for HMR and Dev Server
  allowedDevOrigins: [
    "3000-cs-553118797525-default.cs-europe-west4-pear.cloudshell.dev"
  ],
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "3000-cs-553118797525-default.cs-europe-west4-pear.cloudshell.dev",
      ],
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
