import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Banknote,
  BookOpenCheck,
  Briefcase,
  CalendarDays,
  GraduationCap,
  MapPin,
  School,
  Sparkles,
} from "lucide-react";

const colleges = [
  {
    name: "Stanford University",
    course: "B.S. in Computer Science",
    logo: "/placeholder.svg",
    location: "Stanford, CA",
  },
  {
    name: "MIT",
    course: "B.S. in AI & Decision Making",
    logo: "/placeholder.svg",
    location: "Cambridge, MA",
  },
  {
    name: "UC Berkeley",
    course: "B.A. in Data Science",
    logo: "/placeholder.svg",
    location: "Berkeley, CA",
  },
  {
    name: "Carnegie Mellon",
    course: "B.S. in Robotics",
    logo: "/placeholder.svg",
    location: "Pittsburgh, PA",
  },
];

const deadlines = [
  {
    title: "Stanford Early Action Deadline",
    date: "Nov 1",
    urgency: "high" as const,
  },
  {
    title: "CMU Scholarship Essay Due",
    date: "Nov 15",
    urgency: "medium" as const,
  },
  { title: "MIT Regular Decision", date: "Jan 1", urgency: "low" as const },
  {
    title: "Berkeley FAFSA Submission",
    date: "Mar 2",
    urgency: "medium" as const,
  },
];

const scholarships = [
  { name: "Tech Innovators Scholarship", deadline: "Dec 10" },
  { name: "Women in AI Grant", deadline: "Jan 20" },
  { name: "First-Gen Leaders Fund", deadline: "Feb 5" },
  { name: "STEM Excellence Award", deadline: "Mar 12" },
];

export default function Index() {
  return (
    <div className="space-y-6">
      {/* Career Pathway */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold">Career Pathway</h2>
            <p className="text-sm text-muted-foreground">
              Your personalized roadmap from degree to career outcomes
            </p>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3 items-stretch">
              <div className="relative rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <GraduationCap />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground tracking-wide">
                      Degree
                    </p>
                    <p className="font-medium">B.S. Computer Science</p>
                  </div>
                </div>
                <ul className="mt-3 list-disc pl-6 text-sm text-muted-foreground space-y-1">
                  <li>Focus: AI & Machine Learning</li>
                  <li>Minor: Entrepreneurship</li>
                </ul>
                <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 rounded-full bg-primary text-primary-foreground p-1 h-6 w-6 shadow" />
              </div>
              <div className="relative rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Briefcase />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground tracking-wide">
                      Jobs
                    </p>
                    <p className="font-medium">
                      AI Engineer, Robotics Engineer
                    </p>
                  </div>
                </div>
                <ul className="mt-3 list-disc pl-6 text-sm text-muted-foreground space-y-1">
                  <li>Internships: 2–3 during undergrad</li>
                  <li>Clubs: Robotics, AI Lab</li>
                </ul>
                <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 rounded-full bg-primary text-primary-foreground p-1 h-6 w-6 shadow" />
              </div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Banknote />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground tracking-wide">
                      Salary Range
                    </p>
                    <p className="font-medium">$95k – $180k</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge
                    variant="outline"
                    className="border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  >
                    Entry
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-transparent bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                  >
                    Mid
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-transparent bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
                  >
                    Senior
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Shortlisted Colleges */}
        <section className="lg:col-span-8 space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold">Shortlisted Colleges</h2>
              <p className="text-sm text-muted-foreground">
                Your curated list of colleges and programs
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {colleges.map((c) => (
              <Card key={c.name} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.logo}
                        alt="logo"
                        className="h-10 w-10 rounded-md"
                      />
                      <div>
                        <CardTitle className="text-base leading-tight">
                          {c.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {c.location}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">Top Fit</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-foreground/80">{c.course}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline">CS</Badge>
                      <Badge variant="outline">AI/ML</Badge>
                    </div>
                    <Button size="sm" className="gap-1">
                      View Details <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Deadlines & Notifications */}
        <aside className="lg:col-span-4 space-y-3">
          <div>
            <h2 className="text-xl font-semibold">Deadlines & Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Stay on top of upcoming events
            </p>
          </div>
          <Card>
            <CardContent className="pt-4">
              <ul className="space-y-3">
                {deadlines.map((d) => (
                  <li
                    key={d.title}
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-md bg-accent p-2 text-muted-foreground">
                        <CalendarDays />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {d.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Add to calendar
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-background">
                        {d.date}
                      </Badge>
                      {d.urgency === "high" && (
                        <Badge className="bg-red-500 text-white hover:bg-red-500">
                          High
                        </Badge>
                      )}
                      {d.urgency === "medium" && (
                        <Badge className="bg-amber-500 text-white hover:bg-amber-500">
                          Medium
                        </Badge>
                      )}
                      {d.urgency === "low" && (
                        <Badge className="bg-emerald-500 text-white hover:bg-emerald-500">
                          Low
                        </Badge>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Scholarships */}
      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recommended Scholarships</h2>
            <p className="text-sm text-muted-foreground">
              Based on your profile and interests
            </p>
          </div>
        </div>
        <div className="-mx-2 overflow-x-auto pb-2">
          <div className="flex gap-4 px-2 min-w-max">
            {scholarships.map((s) => (
              <Card
                key={s.name}
                className="w-[320px] shrink-0 hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary/10 p-2 text-primary">
                      <BookOpenCheck />
                    </div>
                    <div>
                      <CardTitle className="text-base leading-tight">
                        {s.name}
                      </CardTitle>
                      <CardDescription>Deadline: {s.deadline}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline">Merit</Badge>
                      <Badge variant="outline">STEM</Badge>
                    </div>
                    <Button size="sm" className="gap-1">
                      <Sparkles className="h-4 w-4" /> Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
