export type ExperienceCategory =
  | 'all'
  | 'robotics_ai'
  | 'drone_aviation'
  | 'coding_stem'
  | 'inaugurations_atl'
  | 'competitions_wro'
  | 'workshops_training';

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  school: string;
  schoolSlug?: string;
  city: string;
  state: string;
  date: string; // e.g. "August 2026"
  category: ExperienceCategory;
  imageUrl: string;
  videoUrl?: string;
  highResUrl?: string;
  aspectRatio?: 'square' | 'wide' | 'portrait' | 'landscape';
  tags: string[];
  featured?: boolean;
  albumId?: string;
}

export interface TransformationMilestone {
  id: string;
  school: string;
  city: string;
  beforeDescription: string;
  beforeImage: string;
  transformationDetails: string;
  afterDescription: string;
  afterImage: string;
  impactMetrics: {
    studentsTrained: string;
    projectsBuilt: string;
    competitionsWon: string;
  };
}

export interface CampusStoryAlbum {
  id: string;
  slug: string;
  schoolName: string;
  city: string;
  state: string;
  implementationDate: string;
  headline: string;
  subtitle: string;
  storyNarrative: string;
  technologiesCovered: string[];
  heroImage: string;
  galleryItemIds: string[];
  outcomes: string[];
  principalQuote?: {
    quote: string;
    author: string;
    designation: string;
  };
}

export interface GalleryStats {
  totalMilestones: string;
  activeCampusLabs: string;
  studentsReached: string;
  competitionsWon: string;
}

export interface GalleryData {
  stats: GalleryStats;
  items: GalleryItem[];
  albums: CampusStoryAlbum[];
  transformations: TransformationMilestone[];
}
