import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface EventItem {
  title: string;
  date: string;
  type: "admission" | "exam" | "scholarship";
}

const DEFAULT_EVENTS: EventItem[] = [
  { title: "MIT Regular Decision", date: "2025-01-01", type: "admission" },
  { title: "Stanford EA Deadline", date: "2024-11-01", type: "admission" },
  {
    title: "STEM Excellence Scholarship",
    date: "2025-03-12",
    type: "scholarship",
  },
];

export default function Timeline() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [enabled, setEnabled] = useState(false);
  const [events, setEvents] = useState<EventItem[]>(DEFAULT_EVENTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("novapath_notifications_enabled");
      if (raw) setEnabled(raw === "true");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("novapath_notifications_enabled", String(enabled));
    } catch {}
  }, [enabled]);

  const selectedISO = date?.toISOString().slice(0, 10);
  const dayEvents = events.filter((e) => e.date === selectedISO);

  return (
    <div className="space-y-6 mt-20">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>Timeline Tracker</CardTitle>
              <CardDescription>
                View admissions, exam dates, and scholarship windows
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>Notifications</span>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div>
              <h3 className="font-medium mb-2">Events on selected date</h3>
              {dayEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No events on this day.
                </p>
              ) : (
                <ul className="space-y-3">
                  {dayEvents.map((e) => (
                    <li
                      key={e.title}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Badge variant="outline">{e.type}</Badge>
                      <span className="font-medium">{e.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
