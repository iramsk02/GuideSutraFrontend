import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";

export default function Admin() {
  const [message, setMessage] = useState("");
  return (
    <div className="space-y-6 mt-20">
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel</CardTitle>
          <CardDescription>
            Manage users, quizzes, streams, courses, colleges, and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="analytics">
            <TabsList>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Streams & Courses</TabsTrigger>
              <TabsTrigger value="colleges">Colleges</TabsTrigger>
              <TabsTrigger value="notify">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="analytics" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm">Total Users</p>
                    <p className="text-2xl font-bold">1,245</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm">Active Today</p>
                    <p className="text-2xl font-bold">312</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm">Popular Stream</p>
                    <p className="text-2xl font-bold">Science</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="users" className="mt-4">
              <p className="text-sm text-muted-foreground">
                List and manage users (mock data)
              </p>
            </TabsContent>
            <TabsContent value="content" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Manage streams and courses (mock UI)
              </p>
            </TabsContent>
            <TabsContent value="colleges" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Manage college database (mock UI)
              </p>
            </TabsContent>
            <TabsContent value="notify" className="mt-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Broadcast message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  onClick={() => {
                    toast.success("Notification sent to all users (demo)");
                    setMessage("");
                  }}
                >
                  Send
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
