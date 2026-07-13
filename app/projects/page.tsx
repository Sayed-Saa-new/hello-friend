import { GridWrapper } from "@/app/components/GridWrapper";

interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
}

const projects: Project[] = [
  {
    title: "Aegis Authenticator",
    description:
      "A zero-knowledge, end-to-end encrypted TOTP authenticator PWA with a browser extension and Windows desktop app — a privacy-first alternative to Google Authenticator & Authy. Built with React 19, TanStack Start, Supabase and the Web Crypto API (AES-GCM, Argon2id, X25519).",
    image: "/projects/aegis-cover.jpg",
    url: "https://aegis-syed.lovable.app",
  },
];

export const metadata = {
  title: "Projects | Syed",
  description:
    "A curated collection of AI-powered products, full-stack apps, and experiments built by Syed.",
};

function ProjectImage(props: { src: string; alt: string }) {
  return (
    <img src={props.src} alt={props.alt} className="drama-shadow rounded-xl" />
  );
}

export default function ProjectPage() {
  return (
    <div className="relative space-y-16">
      <title>Projects | Syed</title>
      <GridWrapper>
        <h1 className="mx-auto mt-16 max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
          A collection of my favorite works.
        </h1>
      </GridWrapper>

      <GridWrapper className="space-y-12">
        {projects.map((project) => (
          <div key={project.title} className="space-y-12">
            <GridWrapper className="px-10">
              <ProjectImage src={project.image} alt={project.title} />
            </GridWrapper>
            <GridWrapper className="px-10">
              <div className="max-w-2xl text-balance">
                <h2 className="mb-3 text-2xl font-medium leading-6 tracking-tight text-slate-900 md:leading-none">
                  {project.title}
                </h2>
                <p className="mb-3 flex-grow text-base leading-6 text-text-secondary">
                  {project.description}
                </p>
                <a
                  className="inline-flex items-center text-sm font-medium text-indigo-600"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit {project.title}
                  <svg
                    className="relative ml-2.5 mt-px overflow-visible"
                    width="3"
                    height="6"
                    viewBox="0 0 3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0L3 3L0 6"></path>
                  </svg>
                </a>
              </div>
            </GridWrapper>
          </div>
        ))}
      </GridWrapper>
    </div>
  );
}
