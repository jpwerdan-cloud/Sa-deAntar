export type Language = 'BR' | 'EN' | 'ES';

export type Subcategory =
  | 'EACF'
  | 'Navio'
  | 'Acampamento'
  | 'Paisagens'
  | 'Rotina da missão'
  | 'Fauna antártica'
  | 'Expedições externas'
  | 'Retratos';

export type MediaType = 'photo' | 'video' | 'publication' | 'interview' | 'blog';

export interface GalleryItem {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  imageUrl: string;
  operation: number;
  subcategory: Subcategory;
  tags: string[];
  photographer: string;
  year: number;
  location: Record<Language, string>;
}

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  duration: string;
  operation: number;
  subcategory: Subcategory;
  tags: string[];
  director: string;
  year: number;
  thumbnail: string;
  isFilm?: boolean;
}

export interface PublicationItem {
  id: string;
  title: Record<Language, string>;
  abstract: Record<Language, string>;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  tags: string[];
  pdfUrl?: string;
  category: Record<Language, string>;
}

export interface InterviewItem {
  id: string;
  name: string;
  role: Record<Language, string>;
  quote: Record<Language, string>;
  fullTranscript: Record<Language, string>;
  imageUrl: string;
  operation: number;
  duration?: string;
  youtubeId?: string;
  tags: string[];
  location: Record<Language, string>;
}

export interface BlogItem {
  id: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string>;
  imageUrl: string;
  author: string;
  date: string;
  tags: string[];
  readTime: string;
}

export interface MapMarker {
  id: string;
  title: Record<Language, string>;
  lat: number;
  lng: number;
  type: 'base' | 'camp' | 'ship' | 'point';
  operation?: number;
  associatedPhotos: string[]; // gallery item IDs
  associatedVideos: string[];
  associatedPublications: string[];
}
