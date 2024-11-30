import path from "path";

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"], 
      includePaths: [path.join(__dirname, "src/app")],
    prependData: `@use "@/app/mixins" as *;`,
  }
};

export default nextConfig;
