import * as React from 'react';
import { StatsOverview } from './components/StatsOverview';
import { RecentCommunications } from './components/RecentCommunications';
import { SystemStatus } from './components/SystemStatus';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Communications Dashboard</h1>
      </div>
      
      <StatsOverview />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentCommunications />
        <SystemStatus />
      </div>
    </div>
  );
}
