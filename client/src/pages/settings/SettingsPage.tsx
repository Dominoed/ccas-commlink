import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function SettingsPage() {
  const [settings, setSettings] = React.useState({
    autoArchive: false,
    retentionDays: 30,
    notificationsEnabled: true,
    soundAlerts: true,
    sipEnabled: true,
    teamsEnabled: true,
    emailEnabled: true,
    militaryVoipEnabled: true
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // TODO: Implement settings save
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Communication Services</CardTitle>
            <CardDescription>
              Configure which communication services are active
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sip-enabled">SIP Service</Label>
                <p className="text-sm text-muted-foreground">
                  Enable SIP call monitoring and logging
                </p>
              </div>
              <Switch
                id="sip-enabled"
                checked={settings.sipEnabled}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, sipEnabled: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="military-voip-enabled">Military VOIP</Label>
                <p className="text-sm text-muted-foreground">
                  Enable military VOIP system integration
                </p>
              </div>
              <Switch
                id="military-voip-enabled"
                checked={settings.militaryVoipEnabled}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, militaryVoipEnabled: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="teams-enabled">MS Teams</Label>
                <p className="text-sm text-muted-foreground">
                  Enable Microsoft Teams message monitoring
                </p>
              </div>
              <Switch
                id="teams-enabled"
                checked={settings.teamsEnabled}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, teamsEnabled: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-enabled">Email Service</Label>
                <p className="text-sm text-muted-foreground">
                  Enable email monitoring and logging
                </p>
              </div>
              <Switch
                id="email-enabled"
                checked={settings.emailEnabled}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, emailEnabled: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications-enabled">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for new communications
                </p>
              </div>
              <Switch
                id="notifications-enabled"
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, notificationsEnabled: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound-alerts">Sound Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Play sounds for priority communications
                </p>
              </div>
              <Switch
                id="sound-alerts"
                checked={settings.soundAlerts}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, soundAlerts: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Configure data retention and archival settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-archive">Auto Archive</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically archive old communications
                </p>
              </div>
              <Switch
                id="auto-archive"
                checked={settings.autoArchive}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, autoArchive: checked })
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retention-days">Retention Period (days)</Label>
              <Input
                id="retention-days"
                type="number"
                value={settings.retentionDays}
                onChange={(e) => 
                  setSettings({ ...settings, retentionDays: parseInt(e.target.value) || 30 })
                }
                className="w-32"
              />
              <p className="text-sm text-muted-foreground">
                Communications older than this will be archived
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
