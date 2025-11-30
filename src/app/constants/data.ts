import { Tour, Category } from '@/app/types';
import { Globe, Calendar, Users } from '@/app/icons';

export const featuredTours: Tour[] = [
  {
    id: 1,
    title: "Bangkok's Hidden Temples",
    price: 150,
    duration: "3 Days",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Chiang Mai Mountain Trek",
    price: 299,
    duration: "5 Days",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Phuket Island Hopping",
    price: 99,
    duration: "1 Day",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1537996051806-82cb40b68cef?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Ayutthaya Historical Ruins",
    price: 120,
    duration: "2 Days",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
  }
];

export const categories: Category[] = [
  { name: "Day Trips", icon: Globe },
  { name: "Food & Culture", icon: Calendar },
  { name: "Water Sports", icon: Users },
  { name: "Nature Trails", icon: Globe },
  { name: "Cooking Classes", icon: Calendar },
  { name: "Photography", icon: Globe }
];

export const navLinks = ['Deals', 'Travel Products', 'Blog', 'About Us'];

// Top 20 Tourist Destinations in Thailand
export const thailandDestinations = [
  'Bangkok',
  'Phuket',
  'Chiang Mai',
  'Pattaya',
  'Krabi',
  'Koh Samui',
  'Ayutthaya',
  'Chiang Rai',
  'Koh Phangan',
  'Hua Hin',
  'Koh Tao',
  'Sukhothai',
  'Nan',
  'Railay Beach',
  'Phang Nga',
  'Isaan Region',
  'Kanchanaburi',
  'Lopburi',
  'Pai',
  'Khao Yai'
];

// Special Deals and Promotions
export const specialDeals = [
  {
    id: 1,
    title: 'Special For First Booking',
    description: 'Get exclusive discount on your first tour booking',
    discount: '20%',
    code: 'FIRSTBOOKING',
    validity: 'Until Dec 31, 2025',
    image: 'https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=500&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Second Purchase Get 15% off',
    description: 'Enjoy 15% discount on your second booking',
    discount: '15%',
    code: 'SECONDOFF15',
    validity: 'Until Dec 31, 2025',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Holiday Season Special',
    description: 'Limited time offer for holiday season bookings',
    discount: '25%',
    code: 'HOLIDAY25',
    validity: 'Until Jan 15, 2026',
    image: 'https://images.unsplash.com/photo-1537996051806-82cb40b68cef?w=500&h=300&fit=crop'
  },
  {
    id: 4,
    title: 'Group Booking Discount',
    description: 'Book for 5+ people and get special rates',
    discount: '30%',
    code: 'GROUPTRIP',
    validity: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop'
  },
  {
    id: 5,
    title: 'Weekend Getaway Special',
    description: 'Perfect for your weekend adventure',
    discount: '18%',
    code: 'WEEKEND18',
    validity: 'Until Mar 31, 2026',
    image: 'https://images.unsplash.com/photo-1488365871519-e21cc028cb29?w=500&h=300&fit=crop'
  },
  {
    id: 6,
    title: 'Adventure Bundle Deal',
    description: 'Book multiple tours and save more',
    discount: '35%',
    code: 'ADVENTURE35',
    validity: 'Until Feb 28, 2026',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&h=300&fit=crop'
  }
];

// Category to Cities Mapping
export const categoryCities: Record<string, { name: string; description: string; image: string }[]> = {
  'day-trips': [
    {
      name: 'Bangkok',
      description: 'Perfect for day trips with temples, markets, and street food',
      image: 'https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=400&h=300&fit=crop'
    },
    {
      name: 'Ayutthaya',
      description: 'Historical ruins and ancient temples just a short trip from Bangkok',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
    },
    {
      name: 'Kanchanaburi',
      description: 'Bridge over the River Kwai and WWII history',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    }
  ],
  'food-and-culture': [
    {
      name: 'Bangkok',
      description: 'World-famous street food and cultural experiences',
      image: 'https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=400&h=300&fit=crop'
    },
    {
      name: 'Chiang Mai',
      description: 'Northern Thai cuisine and hill tribe culture',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
      name: 'Phuket',
      description: 'Fusion of Thai and international cuisine with local markets',
      image: 'https://images.unsplash.com/photo-1537996051806-82cb40b68cef?w=400&h=300&fit=crop'
    }
  ],
  'water-sports': [
    {
      name: 'Phuket',
      description: 'World-class diving, snorkeling, and water activities',
      image: 'https://images.unsplash.com/photo-1537996051806-82cb40b68cef?w=400&h=300&fit=crop'
    },
    {
      name: 'Koh Samui',
      description: 'Island hopping and marine life exploration',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
    },
    {
      name: 'Krabi',
      description: 'Kayaking, rock climbing, and pristine beaches',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    }
  ],
  'nature-trails': [
    {
      name: 'Chiang Mai',
      description: 'Mountain trekking and elephant sanctuaries',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
      name: 'Pai',
      description: 'Scenic valley hikes and hot springs',
      image: 'https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=400&h=300&fit=crop'
    },
    {
      name: 'Khao Yai',
      description: 'National park with waterfalls and wildlife',
      image: 'https://images.unsplash.com/photo-1537996051806-82cb40b68cef?w=400&h=300&fit=crop'
    }
  ],
  'cooking-classes': [
    {
      name: 'Bangkok',
      description: 'Authentic Thai cooking schools and market tours',
      image: 'https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=400&h=300&fit=crop'
    },
    {
      name: 'Chiang Mai',
      description: 'Northern Thai cuisine and herb garden experiences',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
      name: 'Phuket',
      description: 'Seafood cooking and tropical ingredient classes',
      image: 'https://images.unsplash.com/photo-1537996051806-82cb40b68cef?w=400&h=300&fit=crop'
    }
  ],
  'photography': [
    {
      name: 'Chiang Mai',
      description: 'Golden Triangle photography and cultural portraits',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
      name: 'Bangkok',
      description: 'Street photography and architectural shots',
      image: 'https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=400&h=300&fit=crop'
    },
    {
      name: 'Ayutthaya',
      description: 'Historic ruins and landscape photography',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
    }
  ]
};

