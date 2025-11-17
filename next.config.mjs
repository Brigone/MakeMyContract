/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "pdfmake",
      "@foliojs-fork/pdfkit",
      "@foliojs-fork/fontkit",
    ],
  },
  webpack: (config) => {
    config.module.rules ??= [];
    config.module.rules.push({
      test: /\.trie$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;