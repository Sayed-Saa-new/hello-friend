import Image from "next/image";
import Link from "next/link";
import { GridWrapper } from "@/app/components/GridWrapper";

export const metadata = {
  title: "Projects | Syed",
  description:
    "A curated collection of AI-powered products, full-stack apps, and experiments built by Syed.",
};

type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cover: string;
  stack: string[];
  platforms: string[];
  status: "Live" | "In Progress" | "Beta";
  liveUrl?: string;
  repoUrl?: string;
  repoPrivate?: boolean;
  year: string;
};

const projects: Project[] = [
  {
    slug: "aegis",
    name: "Aegis Authenticator",
    tagline: "A Zero-Knowledge TOTP Authenticator",
    description:
      "End-to-end encrypted two-factor authentication that runs as a PWA, browser extension and Windows desktop app — a privacy-first alternative to Google Authenticator & Authy where the server never sees your secrets.",
    cover: "/projects/aegis-cover.jpg",
    stack: [
      "React 19",
      "TanStack Start",
      "TypeScript",
      "Tailwind v4",
      "Framer Motion",
      "Supabase",
      "Web Crypto",
      "IndexedDB",
      "Chrome MV3",
      "Electron",
      "Stripe",
    ],
    platforms: ["Web PWA", "Chrome Extension", "Windows Desktop"],
    status: "Live",
    liveUrl: "https://aegis-syed.lovable.app",
    repoPrivate: true,
    year: "2025 – 2026",
  },
];

export default function ProjectPage() {
  return (
    <div className="relative space-y-16 pb-24">
      <title>Projects | Syed</title>

      <GridWrapper>
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
            A collection of my favorite works.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-text-secondary">
            Products I&apos;ve designed, engineered and shipped — from
            privacy-first security tools to AI-powered experiences.
          </p>
        </div>
      </GridWrapper>

      <GridWrapper>
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          {projects.map((p, idx) => (
            <ProjectCard key={p.slug} project={p} index={idx} />
          ))}
        </div>
      </GridWrapper>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(3, "0");
  return (
    <article className="group overflow-hidden rounded-3xl border border-border-primary bg-surface-secondary/40 transition hover:border-border-secondary hover:bg-surface-secondary/60">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F5EEDF]">
        <Image
          src={project.cover}
          alt={`${project.name} — cover`}
          fill
          sizes="(max-width: 768px) 100vw, 1024px"
          className="object-cover"
          priority={index === 0}
        />
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-[1fr_260px] md:p-10">
        <div>
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-text-tertiary">
            <span>Case Study · {num}</span>
            <span className="h-px flex-1 bg-border-primary" />
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] tracking-wider ${
                project.status === "Live"
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-amber-500/10 text-amber-600"
              }`}
            >
              {project.status}
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-medium tracking-tight text-text-primary md:text-4xl">
            {project.name}
          </h2>
          <p className="mt-1 text-lg text-text-secondary">{project.tagline}</p>

          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-text-secondary">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border-primary bg-surface-primary px-3 py-1 text-xs text-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-text-primary px-4 py-2 font-medium text-surface-primary transition hover:opacity-90"
              >
                Visit live site
                <span aria-hidden>→</span>
              </Link>
            )}
            {project.repoPrivate ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-border-primary px-4 py-2 text-text-tertiary">
                <span className="h-1.5 w-1.5 rounded-full bg-text-tertiary" />
                Private repository
              </span>
            ) : project.repoUrl ? (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-primary px-4 py-2 text-text-primary transition hover:bg-surface-primary"
              >
                View source
              </Link>
            ) : null}
          </div>
        </div>

        <dl className="space-y-4 rounded-2xl border border-border-primary bg-surface-primary/60 p-5 text-sm">
          <MetaRow label="Year" value={project.year} />
          <MetaRow label="Role" value="Solo Full-Stack Engineer & Designer" />
          <MetaRow
            label="Platforms"
            value={project.platforms.join(" · ")}
          />
          <MetaRow label="Status" value={project.status} />
        </dl>
      </div>
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
        {label}
      </dt>
      <dd className="mt-1 text-text-primary">{value}</dd>
    </div>
  );
}
