
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const SettingsPage = () => {
  const { toast } = useToast();
  const [apiPath, setApiPath] = useState("http://localhost:5000");
  const [backupLocation, setBackupLocation] = useState("/var/backups/laptop-ledger");
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const handleSaveApiSettings = () => {
    toast({
      title: "API Settings Saved",
      description: "Your API settings have been updated successfully.",
    });
  };
  
  const handleSaveBackupSettings = () => {
    toast({
      title: "Backup Settings Saved",
      description: "Your backup settings have been updated successfully.",
    });
  };

  const handleTestBackup = () => {
    toast({
      title: "Backup Test Initiated",
      description: "Testing backup functionality. Check logs for results.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Initiated",
      description: "Your data is being exported. You'll be notified when it's ready.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        
        <Tabs defaultValue="api" className="space-y-4">
          <TabsList>
            <TabsTrigger value="api">API Configuration</TabsTrigger>
            <TabsTrigger value="backups">Backups & Data</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Configure the connection to your Flask backend
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-url">API URL</Label>
                  <Input 
                    id="api-url" 
                    value={apiPath} 
                    onChange={(e) => setApiPath(e.target.value)}
                    placeholder="http://localhost:5000" 
                  />
                  <p className="text-sm text-muted-foreground">
                    The base URL for your Flask API server
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-timeout">Request Timeout (seconds)</Label>
                  <Input 
                    id="api-timeout" 
                    type="number" 
                    defaultValue="30" 
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Test Connection</Button>
                <Button onClick={handleSaveApiSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="backups" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Backup Configuration</CardTitle>
                <CardDescription>
                  Manage database backups and data export settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-path">Backup Location</Label>
                  <Input 
                    id="backup-path" 
                    value={backupLocation}
                    onChange={(e) => setBackupLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-schedule">Backup Schedule</Label>
                  <select 
                    id="backup-schedule"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="daily"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleTestBackup}>Test Backup</Button>
                <Button onClick={handleSaveBackupSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Export</CardTitle>
                <CardDescription>
                  Export your data to various formats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="export-format">Export Format</Label>
                  <select 
                    id="export-format"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="json"
                  >
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                    <option value="sql">SQL Dump</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleExportData}>
                  Export Data
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="email-notifications" 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Administrator Email</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    placeholder="admin@company.com" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Notification Events</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="event-laptop-assigned" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked={true}
                      />
                      <Label htmlFor="event-laptop-assigned">Laptop Assignments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="event-laptop-returned" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked={true}
                      />
                      <Label htmlFor="event-laptop-returned">Laptop Returns</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="event-maintenance" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked={true}
                      />
                      <Label htmlFor="event-maintenance">Maintenance Updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="event-inventory" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked={false}
                      />
                      <Label htmlFor="event-inventory">Inventory Changes</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
