
export interface WebsiteTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  style: 'modern' | 'classic' | 'luxury' | 'boutique' | 'minimalist';
  features: string[];
}

export interface RoomData {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  images: string[];
  price: number;
  capacity: number;
  bedType: string;
}

export interface HotelInfo {
  name: string;
  address: string;
  description: string;
  images: string[];
  facilities: string[];
  latitude?: number;
  longitude?: number;
}

export interface NearbyAttraction {
  name: string;
  type: 'restaurant' | 'attraction' | 'transit';
  distance: string;
  description?: string;
  link?: string;
}

export interface WebsiteSection {
  id: string;
  type: 'hero' | 'rooms' | 'about' | 'attractions' | 'contact' | 'gallery' | 'testimonials' | 'blog';
  title: string;
  content: any;
  order: number;
  aiGenerated?: boolean;
}

export interface ChatbotConfig {
  enabled: boolean;
  greetingMessage: string;
  avatarUrl: string;
  primaryColor: string;
  language: 'en' | 'es' | 'fr' | 'de' | 'it' | 'zh' | 'ja';
  fallbackEmail: string;
  commonQuestions: {
    question: string;
    answer: string;
  }[];
}

export interface WebsiteData {
  template: WebsiteTemplate | null;
  sections: WebsiteSection[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  customDomain?: string;
  defaultSubdomain?: string;
  published: boolean;
  lastPublished?: Date;
  chatbotConfig?: ChatbotConfig;
}

export type EditorMode = 'desktop' | 'mobile' | 'tablet';

export type EditorView = 'edit' | 'preview';
