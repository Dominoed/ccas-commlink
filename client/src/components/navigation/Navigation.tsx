import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Tags, 
  Settings,
  Radio
} from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Radio className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">CommLink</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                asChild
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                className="h-9"
              >
                <Link to="/">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              
              <Button
                asChild
                variant={isActive('/communications') ? 'default' : 'ghost'}
                size="sm"
                className="h-9"
              >
                <Link to="/communications">
                  <MessageSquare className="h-4 w-4" />
                  Communications
                </Link>
              </Button>
              
              <Button
                asChild
                variant={isActive('/tags') ? 'default' : 'ghost'}
                size="sm"
                className="h-9"
              >
                <Link to="/tags">
                  <Tags className="h-4 w-4" />
                  Tags
                </Link>
              </Button>
              
              <Button
                asChild
                variant={isActive('/settings') ? 'default' : 'ghost'}
                size="sm"
                className="h-9"
              >
                <Link to="/settings">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
