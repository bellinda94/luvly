
export interface User {
  id: string; // Changed from number to string to match UUID format
  name: string;
  imageUrl: string;
  images?: string[];
  age: number | null; // Made optional with null
  distance: string | null; // Made optional with null
  bio: string;
  verified: "unverified" | "pending" | "verified";
  preferences?: {
    interests?: string[];
    ageRange?: string;
    lookingFor?: string;
  };
}
