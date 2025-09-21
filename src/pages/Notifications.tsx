import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
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
  {
    id: "n1",
    kind: "admission",
    title: "B.Sc Admission Form Deadline",
    description: "Submit application and transcripts.",
    due: "2024-11-30",
  },
  {
    id: "n2",
    kind: "scholarship",
    title: "Women in STEM Grant closing soon",
    description: "Finish essay and upload documents.",
    due: "2025-02-10",
  },
  {
    id: "n3",
    kind: "webinar",
    title: "Webinar: How to Pick Your Major",
    description: "Join live Q&A with mentors.",
    due: "2024-12-05",
  },
  {
    id: "n4",
    kind: "scholarship",
    title: "EWS Scholarship verification",
    description: "Verify income certificate details.",
    due: "2024-12-15",
  },
  {
    id: "n5",
    kind: "admission",
    title: "MIT Regular Decision",
    description: "Finalize recommendation letters.",
    due: "2025-01-01",
  },
];

function daysLeft(iso: string) {
  const now = new Date();
  const d = new Date(iso);
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function iconFor(kind: Kind) {
  const cls = "h-5 w-5";
  const getIconColor = (kind: Kind) => {
    switch (kind) {
      case "admission": return "text-blue-600";
      case "scholarship": return "text-amber-600";
      case "webinar": return "text-emerald-600";
      default: return "text-gray-600";
    }
  };
  
  if (kind === "admission") return <CalendarDays className={`${cls} ${getIconColor(kind)}`} />;
  if (kind === "scholarship") return <Bell className={`${cls} ${getIconColor(kind)}`} />;
  return <Video className={`${cls} ${getIconColor(kind)}`} />;
}

export default function Notifications() {
  const [filter, setFilter] = useState<"all" | Kind>("all");
  const [read, setRead] = useState<Record<string, boolean>>({});

  const items = useMemo(
    () => NOTICES.filter((n) => filter === "all" || n.kind === filter),
    [filter],
  );

  function markAll() {
    const all: Record<string, boolean> = {};
    NOTICES.forEach((n) => (all[n.id] = true));
    setRead(all);
  }

  return (
    <div className="space-y-8 px-4 md:px-8 mt-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Your Reminders & Alerts</h1>
          <p className="text-lg text-gray-600 mt-2">
            Stay on top of forms, scholarships, and webinars.
          </p>
        </div>
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(v) => v && setFilter(v as any)}
          className="rounded-full bg-gray-100 p-1 shrink-0"
        >
          <ToggleGroupItem 
            value="all" 
            className="rounded-full px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:shadow-sm data-[state=on]:text-blue-600"
          >
            Show All
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="admission" 
            className="rounded-full px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:shadow-sm data-[state=on]:text-blue-600"
          >
            Admissions
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="scholarship" 
            className="rounded-full px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:shadow-sm data-[state=on]:text-blue-600"
          >
            Scholarships
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="webinar" 
            className="rounded-full px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:shadow-sm data-[state=on]:text-blue-600"
          >
            Webinars
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid gap-6">
        {items.map((n) => {
          const left = daysLeft(n.due);
          const urgent = left <= 7;
          const isRead = !!read[n.id];
          return (
            <Card
              key={n.id}
              className={`rounded-xl shadow-md border-gray-200 transition-all duration-200 hover:shadow-lg ${isRead ? "opacity-70" : ""}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-md p-3 bg-gray-100 flex items-center justify-center">
                    {iconFor(n.kind)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-semibold text-lg leading-tight text-gray-900">{n.title}</h3>
                      <Badge variant="secondary" className="capitalize bg-gray-100 text-gray-700 font-medium rounded-full px-2 py-0.5">
                        {n.kind}
                      </Badge>
                    </div>
                    <p className="mt-2 text-base text-gray-700">
                      {n.description}
                    </p>
                    <div className="mt-4 text-sm flex flex-wrap items-center gap-3">
                      <span
                        className={`font-medium ${urgent ? "text-red-600" : "text-gray-500"}`}
                      >
                        Due: {new Date(n.due).toLocaleDateString()}
                      </span>
                      {left > 0 && (
                        <Badge 
                          variant="outline" 
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${urgent ? "bg-red-500 text-white border-transparent" : "bg-gray-100 text-gray-700 border-gray-200"}`}
                        >
                          {left} days left
                        </Badge>
                      )}
                      {left <= 0 && (
                        <Badge className="bg-red-500 text-white border-transparent rounded-full px-2 py-0.5 text-xs font-semibold">
                          Past Due
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {!isRead && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full px-4"
                        onClick={() => setRead((r) => ({ ...r, [n.id]: true }))}
                      >
                        Mark Read
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button onClick={markAll} variant="secondary" className="rounded-full px-6 shadow-md bg-white hover:bg-gray-100 text-gray-700">
          Mark All as Read
        </Button>
      </div>
    </div>
  );
}