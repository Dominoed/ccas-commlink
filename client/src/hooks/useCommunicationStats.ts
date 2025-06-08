import * as React from 'react';

interface CommunicationStats {
  sip: number;
  military_voip: number;
  teams: number;
  email: number;
}

export function useCommunicationStats() {
  const [stats, setStats] = React.useState<CommunicationStats>({
    sip: 0,
    military_voip: 0,
    teams: 0,
    email: 0
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch all communications and calculate stats
        const response = await fetch('/api/communications');
        if (response.ok) {
          const communications = await response.json();
          
          const newStats = communications.reduce((acc: CommunicationStats, comm: any) => {
            acc[comm.type] = (acc[comm.type] || 0) + 1;
            return acc;
          }, {
            sip: 0,
            military_voip: 0,
            teams: 0,
            email: 0
          });
          
          setStats(newStats);
        }
      } catch (error) {
        console.error('Error fetching communication stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
}
