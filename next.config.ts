import { join } from 'path';

const nextConfig = {
  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
    additionalData: `
      @use "@/app/ui/_variables.scss" as *;
      @use "@/app/ui/_mixins.scss" as *;
    `,
  },
};

export default nextConfig;