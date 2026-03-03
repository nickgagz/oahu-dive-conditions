import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oahu Dive Conditions",
    short_name: "Dive Conditions",
    description:
      "Historical shore-diving conditions awareness tool for Oahu. See what divers reported under similar swell, wind, and tide conditions.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1f5f9", // slate-100
    theme_color: "#0f172a", // slate-900
    orientation: "portrait",
    categories: ["sports", "weather"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

