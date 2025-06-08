export interface DatabaseSchema {
  communication_logs: {
    id: number;
    type: 'sip' | 'military_voip' | 'teams' | 'email';
    from_address: string;
    to_address: string;
    subject: string | null;
    content: string | null;
    timestamp: string;
    status: 'active' | 'archived' | 'flagged';
    priority: 'low' | 'normal' | 'high' | 'critical';
    duration: number | null;
    file_path: string | null;
    metadata: string | null;
  };
  tags: {
    id: number;
    name: string;
    color: string;
    description: string | null;
    created_at: string;
  };
  communication_tags: {
    id: number;
    communication_id: number;
    tag_id: number;
  };
}
