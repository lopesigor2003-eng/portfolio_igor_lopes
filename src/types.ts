export interface ProjectVideo {
  title: string;
  url: string;
  desc: string;
}

export interface PortfolioItem {
  name: string;
  url: string;
  title: string;
  headings: string[];
  paragraphs: string[];
  images: string[];
  videos?: ProjectVideo[];
}

export type CategoryKey = 'social' | 'wordpress' | 'editorial' | 'sports' | 'military' | 'all';

export interface CategorySpec {
  key: CategoryKey;
  label: string;
  description: string;
}
