"use server";

import { unstable_cache } from "next/cache";
import type { GitHubStats, ContributionData } from "./types";

const GITHUB_USERNAME = "abushaidislam";

async function fetchContributions(token: string): Promise<ContributionData | null> {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection(from: "${oneYearAgo.toISOString()}", to: "${today.toISOString()}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    };
  } catch {
    return null;
  }
}

export const getGitHubStats = unstable_cache(
  async (): Promise<GitHubStats> => {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return { stars: 0, forks: 0, commits: 0, contributions: null };
    }

    const headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    };

    try {
      // Aggregate stars & forks across all public repos
      let stars = 0;
      let forks = 0;
      const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
        { headers },
      );
      if (reposRes.ok) {
        const repos = (await reposRes.json()) as Array<{
          stargazers_count?: number;
          forks_count?: number;
        }>;
        stars = repos.reduce((n, r) => n + (r.stargazers_count || 0), 0);
        forks = repos.reduce((n, r) => n + (r.forks_count || 0), 0);
      }

      const contributions = await fetchContributions(token);
      const commits = contributions?.totalContributions ?? 0;

      return { stars, forks, commits, contributions };
    } catch {
      return { stars: 0, forks: 0, commits: 0, contributions: null };
    }
  },
  ["github-stats"],
  { revalidate: 86400 },
);
