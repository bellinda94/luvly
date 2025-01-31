export interface User {
  id: number;
  name: string;
  imageUrl: string;
  images?: string[];
  age: number;
  distance: string;
  bio: string;
  verified: boolean | "pending";
  preferences?: {
    interests?: string[];
    ageRange?: string;
    lookingFor?: string;
  };
}

export const users: Record<number, User> = {
  1: {
    id: 1,
    name: "Sarah",
    age: 25,
    distance: "5 km",
    bio: "Love hiking and photography. Always looking for new adventures and beautiful moments to capture through my lens.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    ],
    verified: true,
    preferences: {
      interests: ["Fotografie", "Wandern", "Reisen", "Kunst"]
    }
  },
  2: {
    id: 2,
    name: "Michael",
    age: 28,
    distance: "3 km",
    bio: "Coffee enthusiast and tech lover.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    verified: "pending"
  },
  3: {
    id: 3,
    name: "Marie",
    age: 27,
    distance: "4 km",
    bio: "Tech enthusiast and amateur chef. Love trying new recipes and exploring innovative technologies.",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    ],
    verified: false,
    preferences: {
      interests: ["Technologie", "Kochen", "Gaming", "Fitness"]
    }
  }
};
