/** @type {import('@remix-pwa/dev').WorkerConfig} */
export default {
  postcss: true,
  ignoredRouteFiles: ["**/.*"],
  // some gotcha you might want to check ttps://remix.run/docs/en/main/guides/gotchas
  serverDependenciesToBundle: [/@remix-pwa\/.*/],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
