import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/')],
    prependData: `
      @import "_mixins.scss";
    `,
  },
};

export default nextConfig;
