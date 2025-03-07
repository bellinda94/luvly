
export interface User {
  id: number;
  name: string;
  imageUrl: string;
  images?: string[];
  age: number;
  distance: string;
  bio: string;
  verified: "unverified" | "pending" | "verified";
  preferences?: {
    interests?: string[];
    ageRange?: string;
    lookingFor?: string;
  };
}
