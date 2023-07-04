import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    define: {
      // eslint-disable-next-line no-undef
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    plugins: [
      react(),
      federation({
        name: "drama-queen",
        // remotes: {
        //This is the right way of mfe with vite module federation (but legacy queens does not use)
        // queen: {
        //   external: `Promise.resolve((window?._env_?.["VITE_QUEEN_URL"] || import.meta.env["VITE_QUEEN_URL"]) + "/entry.js")`,
        //   externalType: "promise",
        // },
        // },
        filename: "remoteEntry.js",
        exposes: {
          "./DramaIndex": "./src/bootstrap.tsx",
        },
        shared: ["react", "react-dom", "react-router-dom"],
      }),
      tsconfigPaths(),
      VitePWA({
        //Generate the external service worker for pearl
        injectRegister: false,
        strategies: "injectManifest",
        // injectManifest: {
        //   injectionPoint: undefined,
        // },
        manifest: false,
        srcDir: "src",
        filename: "queen-service-worker.js",
      }),
      VitePWA({
        injectRegister: "auto",
        strategies: "injectManifest",
        srcDir: "src",
        filename: "sw.js",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "masked-icon.svg",
        ],
        manifest: {
          name: "Questionnaire",
          short_name: "Questionnaire",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          orientation: "portrait",
          scope: "/",
          start_url: "/",
          icons: [
            {
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/android-chrome-256x256.png",
              sizes: "256x256",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    build: {
      //   modulePreload: false,
      target: "esnext",
      minify: true,
      //   cssCodeSplit: false,
    },
  };
});
