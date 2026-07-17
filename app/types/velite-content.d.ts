declare module "#site/content" {
  export type Blog = {
    title: string;
    publishedAt: string;
    summary: string;
    imageName: string;
    categories: string[];
    slug: string;
    slugAsParams: string;
    code: string;
    canonicalUrl?: string;
    draft?: boolean;
    audioFile?: string;
    headings?: Array<{
      id: string;
      text: string;
      level: number;
    }>;
  };

  export type Changelog = {
    title: string;
    publishedAt: string;
    imageName?: string;
    slug: string;
    slugAsParams: string;
    code: string;
    draft?: boolean;
  };

  export const posts: Blog[];
  export const changelogItems: Changelog[];
}