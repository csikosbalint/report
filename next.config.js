
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "su8ishee.ddns.net",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};
module.exports = nextConfig
