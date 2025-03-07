
export type ChatPartner = {
  id: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  verification_status: "unverified" | "pending" | "verified";
};

export type Match = {
  id: string;
  profile_1_id: string;
  profile_2_id: string;
  created_at: string;
};

export type Conversation = {
  id: string;
  match_id: string;
  created_at: string;
  updated_at: string;
  last_message?: {
    content: string;
    created_at: string;
    sender_id: string;
  };
  chat_partner: ChatPartner;
};
