export interface User {
  id: number;
  name: string;
  imageUrl: string;
  verified: boolean | "pending";
}

export const users: Record<number, User> = {
  1: {
    id: 1,
    name: "Sarah",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    verified: true
  },
  2: {
    id: 2,
    name: "Michael",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    verified: "pending"
  }
};
