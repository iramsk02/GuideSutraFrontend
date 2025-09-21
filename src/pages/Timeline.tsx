import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Calendar } from "../components/ui/calendar";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";
import { BellRing, CheckCircle, GraduationCap, Briefcase, Sparkles } from "lucide-react";

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
    <div className="space-y-8 px-4 md:px-8 mt-20">
      <Card className="rounded-3xl shadow-xl border-gray-200">
        <CardHeader className="p-8 pb-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <BellRing className="w-5 h-5" />
                </div>
                Timeline Tracker
              </CardTitle>
              <CardDescription className="text-base text-gray-600 mt-2">
                View admissions, exam dates, and scholarship windows
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium md:self-center">
              <span>Notifications</span>
              <Switch checked={enabled} onCheckedChange={setEnabled} className="data-[state=checked]:bg-blue-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-8 grid-cols-2  items-start">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl border border-gray-200 shadow-md p-4"
              />
            </div>
            <div className="md:border-l md:pl-8 border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                Events on selected date
              </h3>
              {dayEvents.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No events on this day.
                </p>
              ) : (
                <ul className="space-y-4">
                  {dayEvents.map((e) => {
                    let icon;
                    let badgeColor;
                    switch (e.type) {
                      case "admission":
                        icon = <GraduationCap className="h-4 w-4 text-blue-600" />;
                        badgeColor = "bg-blue-50 text-blue-700 border-blue-200";
                        break;
                      case "exam":
                        icon = <Briefcase className="h-4 w-4 text-orange-600" />;
                        badgeColor = "bg-orange-50 text-orange-700 border-orange-200";
                        break;
                      case "scholarship":
                        icon = <Sparkles className="h-4 w-4 text-purple-600" />;
                        badgeColor = "bg-purple-50 text-purple-700 border-purple-200";
                        break;
                    }

                    return (
                      <li
                        key={e.title}
                        className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
                      >
                        <div className="h-8 w-8 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 shadow-sm">
                          {icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 leading-tight">
                            {e.title}
                          </p>
                          <Badge
                            variant="outline"
                            className={`mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}
                          >
                            {e.type}
                          </Badge>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}