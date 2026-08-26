export type ArticleCategory =
  | 'nep-2020-policy'
  | 'robotics-ai'
  | 'robotics-ai-labs'
  | 'pedagogy-curriculum'
  | 'school-case-studies'
  | 'aviation-drones'
  | 'drone-aviation'
  | 'student-innovations';

export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface Author {
  id: string;
  name: string;
  role: string;
  designation: string;
  avatar: string;
  bio: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or formatted text
  category: ArticleCategory;
  categoryName: string;
  tags: string[];
  authorId: string;
  author?: Author;
  coverImage: string;
  readingTimeMinutes: number;
  publishedDate: string; // ISO date or "March 15, 2026"
  updatedDate?: string;
  status: ArticleStatus;
  featured?: boolean;
  trending?: boolean;
  viewsCount: number;
  relatedSchoolSlug?: string;
  seo: SEOMetadata;
}

export interface BlogCategory {
  id: string;
  slug: ArticleCategory;
  name: string;
  description: string;
  iconName?: string;
  count?: number;
}

export interface BlogData {
  articles: BlogArticle[];
  authors: Author[];
  categories: BlogCategory[];
}
