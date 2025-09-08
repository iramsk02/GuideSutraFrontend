import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CalendarClock, MessageSquareText, UsersRound } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  image?: string;
}

const MENTORS: Mentor[] = [
  { id: "aisha", name: "Aisha Kapoor", title: "AI Engineer @ DeepMind", expertise: ["AI/ML", "Grad Applications", "Interview Prep"], image: "/placeholder.svg" },
  { id: "rahul", name: "Rahul Verma", title: "Product @ Google", expertise: ["Product", "PM Interviews"], image: "/placeholder.svg" },
  { id: "meera", name: "Meera Iyer", title: "PhD Physics @ MIT", expertise: ["Higher Studies", "Research"], image: "/placeholder.svg" },
  { id: "arjun", name: "Arjun Nair", title: "Data Scientist @ Stripe", expertise: ["Data Science", "Career Switch"], image: "/placeholder.svg" },
  { id: "sana", name: "Sana Khan", title: "Counselor", expertise: ["Profile Building", "Scholarships"], image: "/placeholder.svg" },
  { id: "vivek", name: "Vivek Rao", title: "ISRO Scientist", expertise: ["Govt Exams", "ISRO"], image: "/placeholder.svg" },
];

interface Thread {
  id: string;
  author: string;
  question: string;
  replies: { author: string; text: string; mentor?: boolean }[];
}

const THREADS: Thread[] = [
  {
    id: "t1",
    author: "Priya (Grade 12)",
    question: "How do I balance school projects with preparing for AI internships?",
    replies: [
      { author: "Aisha (Mentor)", text: "Batch tasks using a weekly plan; target 2 LeetCode sets + 1 project feature per week.", mentor: true },
      { author: "Rahul (Mentor)", text: "Showcase 1 polished project on your resume; quality beats quantity.", mentor: true },
    ],
  },
  {
    id: "t2",
    author: "Rohit",
    question: "What matters more for PhD: GPA or Publications?",
    replies: [
      { author: "Meera (Mentor)", text: "Strong letters + research experience > raw GPA; aim for at least one workshop paper.", mentor: true },
    ],
  },
];

const TIMES = ["10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"] as const;

export default function Mentorship() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(MENTORS[0]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slot, setSlot] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MENTORS.filter((m) =>
      !q || m.name.toLowerCase().includes(q) || m.expertise.some((e) => e.toLowerCase().includes(q)),
    );
  }, [search]);

  function confirmBooking() {
    if (!selectedMentor || !date || !slot) {
      toast.error("Select a mentor, date, and time to continue");
      return;
    }
    toast.success(`Session booked with ${selectedMentor.name} on ${date.toDateString()} at ${slot}`);
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="flex flex-col gap-4 items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Get Guidance from Experts and Alumni</h1>
          <p className="text-muted-foreground">Book 1:1 sessions, ask questions, and learn from real experiences.</p>
        </div>
        <Button className="gap-2">
          <UsersRound className="h-4 w-4" /> Talk to Alumni / Counselors
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left: Mentors + Forum */}
        <div className="space-y-6">
          {/* Mentor search */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Find a Mentor</CardTitle>
              <CardDescription>Browse experts by domain and book a session.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input placeholder="Search mentors or expertise (e.g., AI, ISRO, Product)" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((m) => (
                  <Card key={m.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12 ring-2 ring-primary/15">
                          <AvatarImage src={m.image} alt={m.name} />
                          <AvatarFallback>{m.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-medium leading-tight">{m.name}</p>
                          <p className="text-sm text-muted-foreground">{m.title}</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {m.expertise.map((e) => (
                              <Badge key={e} variant="outline">{e}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Button size="sm" onClick={() => setSelectedMentor(m)} className="gap-2">
                          <CalendarClock className="h-4 w-4" /> Book Session
                        </Button>
                        <span className="text-xs text-muted-foreground">~30 min</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Forum */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageSquareText className="h-5 w-5" /> Community Forum</CardTitle>
              <CardDescription>Questions from students and replies from mentors.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {THREADS.map((t) => (
                <div key={t.id} className="rounded-lg border p-4 bg-card shadow-sm">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback>{t.author[0]}</AvatarFallback></Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm"><span className="font-medium">{t.author}</span>: {t.question}</p>
                      <div className="mt-3 space-y-3">
                        {t.replies.map((r, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <Avatar className="h-7 w-7"><AvatarFallback>{r.author[0]}</AvatarFallback></Avatar>
                            <div className="rounded-md bg-muted/40 p-2 text-sm">
                              <p>
                                <span className="font-medium">{r.author}</span>{" "}
                                {r.mentor && <Badge className="ml-1" variant="secondary">Mentor</Badge>}
                              </p>
                              <p className="text-foreground/90">{r.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Booking widget */}
        <div className="space-y-4 lg:sticky lg:top-16 h-max">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Book a Session</CardTitle>
              <CardDescription>Select a mentor, pick a date and time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10"><AvatarImage src={selectedMentor?.image} /><AvatarFallback>{selectedMentor?.name?.[0]}</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-medium leading-tight">{selectedMentor?.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedMentor?.title}</p>
                </div>
              </div>
              <Separator />
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              <div>
                <p className="mb-2 text-sm font-medium">Available time slots</p>
                <div className="grid grid-cols-3 gap-2">
                  {TIMES.map((t) => (
                    <Button key={t} variant={slot === t ? "default" : "outline"} onClick={() => setSlot(t)} size="sm">
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={confirmBooking}>Confirm Booking</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
