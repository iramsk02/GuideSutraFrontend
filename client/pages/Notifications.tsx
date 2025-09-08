import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bell, CalendarDays, Video } from "lucide-react";

 type Kind = "admission" | "scholarship" | "webinar";

 interface Notice {
  id: string;
  kind: Kind;
  title: string;
  description: string;
  due: string; // ISO date
  read?: boolean;
 }

 const NOTICES: Notice[] = [
  { id: "n1", kind: "admission", title: "B.Sc Admission Form Deadline", description: "Submit application and transcripts.", due: "2024-11-30" },
  { id: "n2", kind: "scholarship", title: "Women in STEM Grant closing soon", description: "Finish essay and upload documents.", due: "2025-02-10" },
  { id: "n3", kind: "webinar", title: "Webinar: How to Pick Your Major", description: "Join live Q&A with mentors.", due: "2024-12-05" },
  { id: "n4", kind: "scholarship", title: "EWS Scholarship verification", description: "Verify income certificate details.", due: "2024-12-15" },
  { id: "n5", kind: "admission", title: "MIT Regular Decision", description: "Finalize recommendation letters.", due: "2025-01-01" },
 ];

 function daysLeft(iso: string) {
  const now = new Date();
  const d = new Date(iso);
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
 }

 function iconFor(kind: Kind) {
  const cls = "h-5 w-5";
  if (kind === "admission") return <CalendarDays className={cls} />;
  if (kind === "scholarship") return <Bell className={cls} />;
  return <Video className={cls} />;
 }

 export default function Notifications() {
  const [filter, setFilter] = useState<"all" | Kind>("all");
  const [read, setRead] = useState<Record<string, boolean>>({});

  const items = useMemo(() =>
    NOTICES.filter((n) => filter === "all" || n.kind === filter),
  [filter]);

  function markAll() {
    const all: Record<string, boolean> = {};
    NOTICES.forEach((n) => (all[n.id] = true));
    setRead(all);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Your Reminders & Alerts</h1>
          <p className="text-sm text-muted-foreground">Stay on top of forms, scholarships, and webinars.</p>
        </div>
        <ToggleGroup type="single" value={filter} onValueChange={(v) => v && setFilter(v as any)}>
          <ToggleGroupItem value="all">Show All</ToggleGroupItem>
          <ToggleGroupItem value="admission">Admissions</ToggleGroupItem>
          <ToggleGroupItem value="scholarship">Scholarships</ToggleGroupItem>
          <ToggleGroupItem value="webinar">Webinars</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid gap-4">
        {items.map((n) => {
          const left = daysLeft(n.due);
          const urgent = left <= 7;
          const isRead = !!read[n.id];
          return (
            <Card key={n.id} className={`transition-shadow hover:shadow-md ${isRead ? "opacity-70" : ""}`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-accent p-2 text-muted-foreground">{iconFor(n.kind)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium leading-tight">{n.title}</h3>
                      <Badge variant="secondary" className="capitalize">{n.kind}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-foreground/80">{n.description}</p>
                    <div className="mt-2 text-sm">
                      <span className={`mr-2 ${urgent ? "font-semibold text-red-600" : "text-muted-foreground"}`}>
                        Due: {new Date(n.due).toLocaleDateString()}
                      </span>
                      {left > 0 && <Badge variant="outline">{left} days left</Badge>}
                      {left <= 0 && <Badge className="bg-red-500 text-white">Past Due</Badge>}
                    </div>
                  </div>
                  {!isRead && (
                    <Button size="sm" variant="outline" onClick={() => setRead((r) => ({ ...r, [n.id]: true }))}>Mark Read</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button onClick={markAll} variant="secondary">Mark All as Read</Button>
      </div>
    </div>
  );
 }
