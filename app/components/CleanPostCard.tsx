"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { resolveCoverUrl } from "@/app/lib/utils";
import clsx from "clsx";

type CleanPostCardProps = {
  slug: string;
  imageName: string;
  title: string;
  summary: string;
  categories?: string[];
  publishedAt?: string;
  index?: number;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

function formatShort(date?: string) {
  if (!date) return "";
  const d = new Date(date.includes("T") ? date : `${date}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function CleanPostCard({
  slug,
  imageName,
  title,
  summary,
  categories = [],
  publishedAt,
  index = 0,
  className,
}: CleanPostCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      className={clsx("group list-none", className)}
    >
      <Link
        href={`/blog/${slug}`}
        prefetch
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-primary transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_20px_60px_-20px_rgba(79,70,229,0.25)]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <img
            src={resolveCoverUrl(imageName)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {categories[0] && (
            <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
              {categories[0]}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          {publishedAt && (
            <p className="text-xs font-medium uppercase tracking-wider text-text-secondary/70">
              {formatShort(publishedAt)}
            </p>
          )}
          <h3 className="text-base font-semibold leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 md:text-lg">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm leading-6 text-text-secondary">
            {summary}
          </p>
          <div className="mt-auto flex items-center gap-1.5 pt-2 text-xs font-medium text-indigo-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span>Read article</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
