import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolbox — Apps, Hardware & Tools Syed Uses Daily",
  description:
    "The software, hardware, and tools Syed (Abushaid Islam) uses every day to build AI-powered products and modern web apps — editors, terminals, AI copilots, and more.",
  alternates: { canonical: "/toolbox" },
  openGraph: {
    title: "Toolbox — Apps, Hardware & Tools Syed Uses Daily",
    description:
      "The apps, hardware, and workflow behind Syed's day-to-day building.",
    url: "/toolbox",
    type: "website",
  },
};

export default function ToolboxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
