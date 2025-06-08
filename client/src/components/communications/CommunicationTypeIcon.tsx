import * as React from 'react';
import { Phone, Users, MessageCircle, Mail } from 'lucide-react';

interface CommunicationTypeIconProps {
  type: 'sip' | 'military_voip' | 'teams' | 'email';
}

export function CommunicationTypeIcon({ type }: CommunicationTypeIconProps) {
  const getIcon = () => {
    switch (type) {
      case 'sip':
        return <Phone className="h-5 w-5 text-blue-500" />;
      case 'military_voip':
        return <Users className="h-5 w-5 text-green-500" />;
      case 'teams':
        return <MessageCircle className="h-5 w-5 text-purple-500" />;
      case 'email':
        return <Mail className="h-5 w-5 text-orange-500" />;
    }
  };

  return (
    <div className="flex-shrink-0 mt-1">
      {getIcon()}
    </div>
  );
}
