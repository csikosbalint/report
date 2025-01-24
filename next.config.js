// @ts-check

module.exports = async (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "blogger.googleusercontent.com",
            port: "",
            pathname: "/img/**",
          },
        ],
      },
    };
    return nextConfig
}