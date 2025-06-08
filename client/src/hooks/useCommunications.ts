import * as React from 'react';

interface Communication {
  id: number;
  type: 'sip' | 'military_voip' | 'teams' | 'email';
  from_address: string;
  to_address: string;
  subject?: string;
  content?: string;
  timestamp: string;
  status: 'active' | 'archived' | 'flagged';
  priority: 'low' | 'normal' | 'high' | 'critical';
  duration?: number;
  tags?: Array<{ id: number; name: string; color: string }>;
}

export function useCommunications(filters?: any) {
  const [communications, setCommunications] = React.useState<Communication[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchCommunications = React.useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters?.type) params.append('type', filters.type);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.priority) params.append('priority', filters.priority);
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await fetch(`/api/communications?${params}`);
      if (response.ok) {
        const data = await response.json();
        setCommunications(data);
      } else {
        console.error('Failed to fetch communications');
      }
    } catch (error) {
      console.error('Error fetching communications:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  React.useEffect(() => {
    fetchCommunications();
  }, [fetchCommunications]);

  return {
    communications,
    loading,
    refetch: fetchCommunications
  };
}

export function useCreateCommunication() {
  const [loading, setLoading] = React.useState(false);

  const createCommunication = async (data: any) => {
    try {
      setLoading(true);
      const response = await fetch('/api/communications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Communication created successfully');
        return true;
      } else {
        console.error('Failed to create communication');
        return false;
      }
    } catch (error) {
      console.error('Error creating communication:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createCommunication, loading };
}

export function useUpdateCommunication() {
  const updateCommunication = async (id: number, data: any) => {
    try {
      const response = await fetch(`/api/communications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Communication updated successfully');
        return true;
      } else {
        console.error('Failed to update communication');
        return false;
      }
    } catch (error) {
      console.error('Error updating communication:', error);
      return false;
    }
  };

  return { updateCommunication };
}

export function useDeleteCommunication() {
  const deleteCommunication = async (id: number) => {
    try {
      const response = await fetch(`/api/communications/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Communication deleted successfully');
        return true;
      } else {
        console.error('Failed to delete communication');
        return false;
      }
    } catch (error) {
      console.error('Error deleting communication:', error);
      return false;
    }
  };

  return { deleteCommunication };
}
