/**
 * @type {import('next').NextConfig}
 */
const config = {
  experimental: { esmExternals: true },
  images: {
    domains: [
      // packages/blog2/src/components/molecules/NowPlaying/index.tsx
      "i.scdn.co",
    ],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/2021/06/16/append-to-object",
        destination: "/2021-06-16-append-to-object",
        permanent: true,
      },
      {
        source: "/2021/06/21/absolute-in-typescript",
        destination: "/2021-06-21-absolute-in-typescript",
        permanent: true,
      },
      {
        source: "/2021/06/19/making-union-out-of-string",
        destination: "/2021-06-19-making-union-out-of-string",
        permanent: true,
      },
      {
        source: "/2021/07/05/spread-in-typescript",
        destination: "/2021-07-05-spread-in-typescript",
        permanent: true,
      },
      {
        source: "/2021-04-28-mapped-types-in-functions",
        destination: "/2021-04-28-chainable-options",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/stats/js/script.js",
        destination: "https://plausible.io/js/plausible.outbound-links.js",
      },
      {
        source: "/stats/api/event",
        destination: "https://plausible.io/api/event",
      },
    ];
  },
};

module.exports = config;
