
-- Function to get conversations with details
CREATE OR REPLACE FUNCTION public.get_conversations_with_details(user_id UUID)
RETURNS TABLE (
  id UUID,
  match_id UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_message JSONB,
  chat_partner JSONB
) AS $$
BEGIN
  RETURN QUERY
  WITH last_messages AS (
    SELECT DISTINCT ON (conversation_id)
      conversation_id,
      jsonb_build_object(
        'content', content,
        'created_at', created_at,
        'sender_id', sender_id
      ) as message_data
    FROM messages
    ORDER BY conversation_id, created_at DESC
  )
  SELECT 
    c.id,
    c.match_id,
    c.created_at,
    c.updated_at,
    lm.message_data as last_message,
    (
      SELECT jsonb_build_object(
        'id', p.id,
        'username', p.username,
        'first_name', p.first_name,
        'last_name', p.last_name,
        'avatar_url', p.avatar_url,
        'verification_status', p.verification_status
      )
      FROM profiles p
      WHERE p.id = CASE 
        WHEN m.profile_1_id = user_id THEN m.profile_2_id
        ELSE m.profile_1_id
      END
    ) as chat_partner
  FROM conversations c
  JOIN matches m ON c.match_id = m.id
  LEFT JOIN last_messages lm ON lm.conversation_id = c.id
  WHERE m.profile_1_id = user_id OR m.profile_2_id = user_id
  ORDER BY COALESCE(lm.message_data->>'created_at', c.created_at::text) DESC;
END;
$$ LANGUAGE plpgsql;
