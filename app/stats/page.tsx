import { Metadata } from "next";
import { getGitHubStats } from "@/app/lib/stats/github-stats";
import { StatsPageHeader } from "@/app/components/stats/StatsPageHeader";
import { StatsSectionHeader } from "@/app/components/stats/StatsSectionHeader";
import { StatCard } from "@/app/components/stats/StatCard";
import { GitHubStatsCard } from "@/app/components/stats/GitHubStatsCard";
import { ContributionGraphCard } from "@/app/components/stats/ContributionGraphCard";
import { GridWrapper } from "@/app/components/GridWrapper";
import { StatsPageWrapper } from "@/app/components/stats/StatsPageWrapper";

export const metadata: Metadata = {
  title: "Stats | Syed — Abushaid Islam",
  description:
    "GitHub activity, shipped projects, and a snapshot of what I'm building as a Software & AI Engineer.",
};

const CODING_SINCE = new Date("2024-01-01");

const PROJECTS = [
  { name: "Aegis Authenticator", status: "Live" },
  { name: "Readoft", status: "In Progress" },
  { name: "DMailova", status: "In Progress" },
];

const STACK_COUNT = 12; // React, TS, Next, TanStack, Tailwind, Supabase, Postgres, Framer Motion, Vite, Node, Electron, Stripe

export default async function StatsPage() {
  const githubStats = await getGitHubStats();

  const daysCoding = Math.max(
    1,
    Math.floor((Date.now() - CODING_SINCE.getTime()) / (1000 * 60 * 60 * 24)),
  );

  return (
    <StatsPageWrapper>
      <div className="mt-14 space-y-12 pb-16 md:mt-16 md:space-y-16">
        <StatsPageHeader />

        {/* Overview */}
        <section>
          <GridWrapper>
            <StatsSectionHeader
              title="Overview"
              description="A quick snapshot of what I'm building"
              delay={0.2}
            />
            <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
              <div className="md:col-span-3">
                <StatCard
                  label="Projects Shipped"
                  value={PROJECTS.length}
                  delay={0.25}
                />
              </div>
              <div className="md:col-span-3">
                <StatCard
                  label="Tech Stack"
                  value={STACK_COUNT}
                  delay={0.3}
                />
              </div>
              <div className="md:col-span-3">
                <StatCard
                  label="Days Building"
                  value={daysCoding}
                  delay={0.35}
                />
              </div>
              <div className="md:col-span-3">
                <StatCard
                  label="Contributions (1y)"
                  value={githubStats.contributions?.totalContributions ?? 0}
                  delay={0.4}
                />
              </div>
            </div>
          </GridWrapper>
        </section>

        {/* GitHub Section */}
        <section>
          <GridWrapper>
            <StatsSectionHeader
              title="GitHub"
              description="Open source contributions and repository stats"
              delay={0.45}
            />
            <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
              {githubStats.contributions && (
                <div className="h-full md:col-span-9">
                  <ContributionGraphCard
                    contributions={githubStats.contributions}
                    delay={0.5}
                  />
                </div>
              )}
              <div className="flex h-full flex-col gap-2 md:col-span-3">
                <div className="flex-1">
                  <GitHubStatsCard
                    type="stars"
                    label="GitHub Stars"
                    value={githubStats.stars}
                    delay={0.55}
                  />
                </div>
                <div className="flex-1">
                  <GitHubStatsCard
                    type="forks"
                    label="Forks"
                    value={githubStats.forks}
                    delay={0.6}
                  />
                </div>
                <div className="flex-1">
                  <GitHubStatsCard
                    type="commits"
                    label="Contributions"
                    value={githubStats.commits}
                    delay={0.65}
                  />
                </div>
              </div>
            </div>
          </GridWrapper>
        </section>

        {/* Projects */}
        <section>
          <GridWrapper>
            <StatsSectionHeader
              title="Projects"
              description="Products I've shipped and things in progress"
              delay={0.7}
            />
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {PROJECTS.map((p, i) => (
                <div
                  key={p.name}
                  className="rounded-2xl border border-border-primary bg-bg-primary p-6"
                  style={{ animationDelay: `${0.75 + i * 0.05}s` }}
                >
                  <div className="text-sm text-text-secondary">{p.status}</div>
                  <div className="mt-2 text-lg font-semibold text-text-primary">
                    {p.name}
                  </div>
                </div>
              ))}
            </div>
          </GridWrapper>
        </section>
      </div>
    </StatsPageWrapper>
  );
}
