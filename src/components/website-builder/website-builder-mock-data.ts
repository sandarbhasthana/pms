
import { WebsiteTemplate, WebsiteData, WebsiteSection } from '@/types/website-builder-types';

// Mock templates
export const getMockTemplates = async (): Promise<WebsiteTemplate[]> => {
  // Simulate loading delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: 'modern-luxury-1',
      name: 'Modern Luxury',
      description: 'Sleek and elegant design with large imagery and smooth animations. Perfect for luxury and boutique hotels.',
      thumbnail: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=300&h=200',
      style: 'luxury',
      features: ['Room Booking', 'Virtual Tour', 'Restaurant Menu', 'Reviews Integration']
    },
    {
      id: 'classic-charm-1',
      name: 'Classic Charm',
      description: 'Timeless design with rich typography and warm colors. Great for historic or traditional establishments.',
      thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=300&h=200',
      style: 'classic',
      features: ['Photo Gallery', 'Testimonials', 'Event Calendar', 'Contact Form']
    },
    {
      id: 'boutique-experience-1',
      name: 'Boutique Experience',
      description: 'Unique and artistic design focused on creating a memorable first impression for small luxury hotels.',
      thumbnail: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=300&h=200',
      style: 'boutique',
      features: ['Story Telling', 'Local Attractions', 'Personalized Service', 'Instagram Feed']
    },
    {
      id: 'minimalist-retreat-1',
      name: 'Minimalist Retreat',
      description: 'Clean and simple design with focus on whitespace and typography. Excellent for modern city hotels.',
      thumbnail: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&q=80&w=300&h=200',
      style: 'minimalist',
      features: ['Fast Loading', 'Direct Booking', 'Mobile Optimized', 'Weather Widget']
    },
    {
      id: 'resort-paradise-1',
      name: 'Resort Paradise',
      description: 'Vibrant and colorful design showcasing amenities and activities. Perfect for resorts and spa hotels.',
      thumbnail: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=300&h=200',
      style: 'modern',
      features: ['Activities Booking', 'Weather Forecast', 'Virtual Tours', 'Restaurant Reservations']
    },
    {
      id: 'corporate-stay-1',
      name: 'Corporate Stay',
      description: 'Professional and efficient design focused on business amenities and services for corporate travelers.',
      thumbnail: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=300&h=200',
      style: 'modern',
      features: ['Meeting Rooms', 'Business Center', 'Express Check-in', 'Transport Services']
    },
    {
      id: 'beach-getaway-1',
      name: 'Beach Getaway',
      description: 'Bright and airy design with ocean colors and full-width imagery. Ideal for beachfront properties.',
      thumbnail: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=300&h=200',
      style: 'modern',
      features: ['Beach Access Info', 'Water Activities', 'Sunset Gallery', 'Local Dining Guide']
    },
    {
      id: 'urban-escape-1',
      name: 'Urban Escape',
      description: 'Bold and trendy design for city center hotels focusing on local attractions and nightlife.',
      thumbnail: 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&q=80&w=300&h=200',
      style: 'boutique',
      features: ['City Guide', 'Public Transit Info', 'Nightlife Recommendations', 'Culture & Events']
    },
    {
      id: 'mountain-lodge-1',
      name: 'Mountain Lodge',
      description: 'Rustic and cozy design with natural elements and panoramic imagery. Perfect for mountain retreats.',
      thumbnail: 'https://images.unsplash.com/photo-1517320964276-a002fa203177?auto=format&fit=crop&q=80&w=300&h=200',
      style: 'classic',
      features: ['Trail Maps', 'Weather Alerts', 'Seasonal Activities', 'Fireplace Gallery']
    },
    {
      id: 'family-fun-1',
      name: 'Family Fun',
      description: 'Playful and colorful design highlighting activities and amenities for families with children.',
      thumbnail: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=300&h=200',
      style: 'modern',
      features: ['Kids Activities', 'Family Rooms', 'Special Offers', 'Nearby Attractions']
    }
  ];
};

// Generate initial website data based on selected template
export const generateInitialWebsiteData = (template: WebsiteTemplate): WebsiteData => {
  const sections: WebsiteSection[] = [
    {
      id: 'hero-section',
      type: 'hero',
      title: 'Welcome to Our Hotel',
      content: {
        heading: 'Experience Luxury & Comfort',
        subheading: 'Your perfect getaway in the heart of the city',
        buttonText: 'Book Now',
        buttonLink: '#book',
        backgroundImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1470&h=800'
      },
      order: 1
    },
    {
      id: 'rooms-section',
      type: 'rooms',
      title: 'Our Rooms',
      content: {
        heading: 'Accommodations',
        description: 'Choose from our selection of thoughtfully designed rooms and suites'
      },
      order: 2
    },
    {
      id: 'about-section',
      type: 'about',
      title: 'About Us',
      content: {
        heading: 'Our Story',
        description: 'A tradition of hospitality excellence since 1995',
        text: 'Located in the heart of the city, our hotel combines luxury, comfort and convenience to create an unforgettable experience for all our guests. From our attentive staff to our world-class amenities, we strive to exceed expectations at every turn.',
        image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&q=80&w=1470&h=800'
      },
      order: 3
    },
    {
      id: 'gallery-section',
      type: 'gallery',
      title: 'Gallery',
      content: {
        heading: 'Experience Our Hotel',
        images: [
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800&h=600',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800&h=600',
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800&h=600',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800&h=600',
          'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&q=80&w=800&h=600',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800&h=600'
        ]
      },
      order: 4
    },
    {
      id: 'contact-section',
      type: 'contact',
      title: 'Contact',
      content: {
        heading: 'Get in Touch',
        address: '123 Hotel Street, City, Country',
        phone: '+1 (555) 123-4567',
        email: 'info@hotelname.com',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d-73.98765432109876!3d40.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA3JzI0LjQiTiA3M8KwNTknMTUuNiJX!5e0!3m2!1sen!2sus!4v1609459875642!5m2!1sen!2sus'
      },
      order: 5
    }
  ];

  // Add template-specific sections based on style
  if (template.style === 'luxury' || template.style === 'boutique') {
    sections.push({
      id: 'testimonials-section',
      type: 'testimonials',
      title: 'Guest Reviews',
      content: {
        heading: 'What Our Guests Say',
        testimonials: [
          {
            text: 'An outstanding experience from check-in to check-out. The attention to detail was impeccable.',
            author: 'Sarah J.',
            location: 'New York, USA',
            rating: 5
          },
          {
            text: 'The room exceeded our expectations. Spacious, elegant, and with a breathtaking view of the city.',
            author: 'Mark T.',
            location: 'London, UK',
            rating: 5
          },
          {
            text: 'The staff went above and beyond to make our anniversary special. We will definitely return!',
            author: 'Emily R.',
            location: 'Sydney, Australia',
            rating: 5
          }
        ]
      },
      order: 4
    });
  }

  if (template.features.includes('Local Attractions') || template.features.includes('City Guide')) {
    sections.push({
      id: 'attractions-section',
      type: 'attractions',
      title: 'Nearby Attractions',
      content: {
        heading: 'Explore The Area',
        description: 'Discover the best attractions, restaurants, and experiences near our hotel',
        attractions: [
          {
            name: 'City Museum',
            type: 'attraction',
            distance: '0.5 miles',
            description: 'Explore the rich history and culture of our city at this acclaimed museum.'
          },
          {
            name: 'Central Park',
            type: 'attraction',
            distance: '0.8 miles',
            description: 'A beautiful urban park perfect for morning jogs or afternoon picnics.'
          },
          {
            name: 'Fine Dining Restaurant',
            type: 'restaurant',
            distance: '0.3 miles',
            description: 'Award-winning cuisine featuring local and international dishes.'
          },
          {
            name: 'Shopping District',
            type: 'attraction',
            distance: '1.2 miles',
            description: 'Explore boutique shops and international brands in our city center.'
          }
        ]
      },
      order: 6
    });
  }

  return {
    template,
    sections,
    seo: {
      title: 'Your Hotel Name - Luxury Accommodations',
      description: 'Experience exceptional comfort and service at our hotel located in the heart of the city. Book your stay today for the best rates guaranteed.',
      keywords: ['hotel', 'luxury', 'accommodations', 'rooms', 'suites', template.style]
    },
    published: false
  };
};
