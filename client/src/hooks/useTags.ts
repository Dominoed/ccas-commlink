import * as React from 'react';

interface Tag {
  id: number;
  name: string;
  color: string;
  description?: string;
  created_at: string;
}

export function useTags() {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchTags = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tags');
      if (response.ok) {
        const data = await response.json();
        setTags(data);
      } else {
        console.error('Failed to fetch tags');
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return {
    tags,
    loading,
    refetch: fetchTags
  };
}

export function useCreateTag() {
  const [loading, setLoading] = React.useState(false);

  const createTag = async (data: any) => {
    try {
      setLoading(true);
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Tag created successfully');
        return true;
      } else {
        console.error('Failed to create tag');
        return false;
      }
    } catch (error) {
      console.error('Error creating tag:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createTag, loading };
}

export function useDeleteTag() {
  const deleteTag = async (id: number) => {
    try {
      const response = await fetch(`/api/tags/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Tag deleted successfully');
        return true;
      } else {
        console.error('Failed to delete tag');
        return false;
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
      return false;
    }
  };

  return { deleteTag };
}
