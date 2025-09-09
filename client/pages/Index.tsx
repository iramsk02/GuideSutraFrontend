import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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

type Profile = {
  name?: string;
  email?: string;
  age?: number;
  gender?: string;
  grade?: string;
  interests?: string[];
  location?: string;
  language?: string;
  role?: string;
};

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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quiz, setQuiz] = useState<{ stream?: string; score?: number } | null>(
    null,
  );
  const completion = useMemo(() => {
    const p = (profile || {}) as Profile;
    const flags = [
      !!p.name,
      !!p.email,
      typeof p.age === "number" && !Number.isNaN(p.age),
      !!p.gender,
      !!p.grade,
      !!p.location,
      !!p.language,
      (p.interests || []).length > 0,
      !!p.role,
      !!quiz?.stream,
    ];
    const filled = flags.reduce((acc, v) => acc + (v ? 1 : 0), 0);
    return Math.round((filled / flags.length) * 100);
  }, [profile, quiz]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("novapath_profile");
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const rr = localStorage.getItem("novapath_quiz_result");
      if (rr) setQuiz(JSON.parse(rr));
    } catch {}
  }, []);

  const courses = useMemo(() => {
    const i = new Set((profile?.interests || []).map((s) => s.toLowerCase()));
    const out: string[] = [];
    if (i.has("science")) out.push("B.Sc Physics", "B.Sc Biology");
    if (i.has("engineering") || i.has("computer science"))
      out.push("B.Tech CSE", "B.Tech ECE");
    if (i.has("commerce") || i.has("business")) out.push("B.Com (Hons)", "BBA");
    if (i.has("arts")) out.push("B.A Psychology", "B.A Economics");
    if (i.has("medicine")) out.push("MBBS", "B.Pharm");
    if (i.has("law")) out.push("B.A LL.B");
    if (i.has("design")) out.push("B.Des Communication");
    return out.length
      ? out.slice(0, 6)
      : ["B.Sc Computer Science", "B.Com (Hons)", "B.A Economics"];
  }, [profile]);

  const careers = useMemo(() => {
    const i = new Set((profile?.interests || []).map((s) => s.toLowerCase()));
    const out: string[] = [];
    if (i.has("science")) out.push("Research Scientist", "Data Analyst");
    if (i.has("engineering") || i.has("computer science"))
      out.push("Software Engineer", "AI Engineer");
    if (i.has("commerce")) out.push("Chartered Accountant", "Business Analyst");
    if (i.has("arts")) out.push("UX Designer", "Journalist");
    if (i.has("law")) out.push("Lawyer");
    if (i.has("design")) out.push("Product Designer");
    return out.length
      ? out
      : ["AI Engineer", "Business Analyst", "UX Designer"];
  }, [profile]);

  const materials = useMemo(() => {
    const i = new Set((profile?.interests || []).map((s) => s.toLowerCase()));
    const out: { title: string }[] = [];
    if (i.has("science")) out.push({ title: "Physics Crash Course" });
    if (i.has("engineering") || i.has("computer science"))
      out.push({ title: "Intro to Programming with Python" });
    if (i.has("commerce")) out.push({ title: "Accounting Basics" });
    if (i.has("arts")) out.push({ title: "Design Thinking 101" });
    if (!out.length) out.push({ title: "Study Tips: Time Management" });
    return out;
  }, [profile]);
  return (
    <div className="space-y-6 mt-20">
      {/* Personalized header */}
      {profile && (
        <Card>
          <CardContent className="py-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-base font-semibold">
                Hi {profile.name?.split(" ")[0]} 👋
              </p>
              <p className="text-sm text-muted-foreground">
                Your career roadmap awaits
              </p>
              {quiz?.stream ? (
                <p className="mt-1 text-sm">
                  <span className="font-medium">Suggested Stream:</span>{" "}
                  {quiz.stream} ·{" "}
                  <span className="text-muted-foreground">
                    {quiz.score}% match
                  </span>
                </p>
              ) : null}
            </div>
            <div className="min-w-[240px]">
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Profile Progress</span>
                <span>{completion}%</span>
              </div>
              <Progress value={completion} />
            </div>
            <div className="flex flex-wrap gap-2">
              {(profile.interests || []).slice(0, 4).map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick actions */}
      <div className="grid gap-4 md:grid-cols-5">
        {[
          {
            title: "Take Aptitude Test",
            icon: <GraduationCap />,
            to: "/career-quiz",
          },
          {
            title: "Courses & Careers",
            icon: <Briefcase />,
            to: "/career-pathway",
          },
          { title: "Nearby Colleges", icon: <School />, to: "/colleges" },
          { title: "Track Deadlines", icon: <CalendarDays />, to: "/timeline" },
          {
            title: "Recommendations",
            icon: <Sparkles />,
            to: "/recommendations",
          },
        ].map((c) => (
          <Card key={c.title} className="hover:shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="rounded-md bg-accent p-2 text-muted-foreground">
                  {c.icon}
                </div>
                <a href={c.to} className="hover:underline">
                  {c.title}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick suggestions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Courses to apply</CardTitle>
            <CardDescription>Based on your interests</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {courses.map((c) => (
              <Badge key={c} variant="secondary" className="rounded-full">
                {c}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card className="hover:shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Career paths</CardTitle>
            <CardDescription>Aligned with your aptitude</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {careers.map((c) => (
              <div key={c} className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4" /> {c}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="hover:shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Study materials</CardTitle>
            <CardDescription>Tailored to your choices</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {materials.map((m) => (
              <div key={m.title} className="flex items-center gap-2 text-sm">
                <BookOpenCheck className="h-4 w-4" /> {m.title}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Career Pathway */}
      <section>
        <div className="mb-3 mt-20 flex items-end justify-between">
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

      {/* Suggested Next Steps */}
      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold">Suggested Next Steps</h2>
            <p className="text-sm text-muted-foreground">
              Personalized actions to continue
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            quiz?.stream
              ? { title: "Explore career roadmap", to: "/career-pathway" }
              : { title: "Take the Aptitude Quiz", to: "/career-quiz" },
            { title: "Browse nearby colleges", to: "/colleges" },
            { title: "Open your timeline", to: "/timeline" },
          ].map((s) => (
            <Card key={s.title} className="hover:shadow-md">
              <CardContent className="p-4">
                <a href={s.to} className="text-sm font-medium hover:underline">
                  {s.title}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

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
