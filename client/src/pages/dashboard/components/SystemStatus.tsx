import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export function SystemStatus() {
  const [status, setStatus] = React.useState({
    sip: 'online',
    military_voip: 'online',
    teams: 'warning',
    email: 'online'
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'offline':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge variant="outline" className="text-green-700 border-green-300">Online</Badge>;
      case 'warning':
        return <Badge variant="outline" className="text-yellow-700 border-yellow-300">Warning</Badge>;
      case 'offline':
        return <Badge variant="destructive">Offline</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(status.sip)}
            <span>SIP Service</span>
          </div>
          {getStatusBadge(status.sip)}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(status.military_voip)}
            <span>Military VOIP</span>
          </div>
          {getStatusBadge(status.military_voip)}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(status.teams)}
            <span>MS Teams</span>
          </div>
          {getStatusBadge(status.teams)}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(status.email)}
            <span>Email Service</span>
          </div>
          {getStatusBadge(status.email)}
        </div>
      </CardContent>
    </Card>
  );
}
