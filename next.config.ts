import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/ui')],
    prependData: `
      @import "_variables.scss";
      @import "_mixins.scss";
    `,
  },
};

export default nextConfig;
