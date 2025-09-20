import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  getProfile,
  getQuizResult,
  normalizeStream,
  profileGenderToFilter,
} from "../lib/user";
import {
  Banknote,
  GraduationCap,
  Medal,
  CalendarDays,
  BookmarkPlus,
  Save,
} from "lucide-react";

// Types
interface Scholarship {
  id: string;
  title: string;
  stream: string; // Science | Engineering | Arts | Any
  caste: "General" | "OBC" | "SC/ST" | "EWS" | "Any";
  gender: "Any" | "Female" | "Male";
  incomeMax?: number; // in INR lakhs per annum
  eligibility: string[];
  benefits: string[];
  deadline: string; // ISO date
  url?: string;
}

const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "tech-innovators",
    title: "Tech Innovators Merit Scholarship",
    stream: "Engineering",
    caste: "Any",
    gender: "Any",
    incomeMax: 25,
    eligibility: [
      "Grade 12 or undergraduate in Engineering",
      "CGPA ≥ 8.0 or 85%",
      "Strong project portfolio",
    ],
    benefits: ["₹1,20,000 stipend", "Laptop grant", "Mentorship"],
    deadline: "2025-01-20",
    url: "#",
  },
  {
    id: "women-in-stem",
    title: "Women in STEM Excellence Grant",
    stream: "Science",
    caste: "Any",
    gender: "Female",
    incomeMax: 30,
    eligibility: [
      "Female students in STEM majors",
      "GPA ≥ 3.0 / 75%",
      "Community leadership preferred",
    ],
    benefits: ["Tuition fee waiver up to 80%", "Research travel grant"],
    deadline: "2025-02-10",
  },
  {
    id: "ews-support",
    title: "EWS Support Scholarship",
    stream: "Any",
    caste: "EWS",
    gender: "Any",
    incomeMax: 8,
    eligibility: [
      "Family income below ₹8L p.a.",
      "Enrolled in recognized university",
    ],
    benefits: ["Full fee waiver", "Hostel subsidy"],
    deadline: "2024-12-15",
  },
  {
    id: "scst-research",
    title: "SC/ST Research Fellowship",
    stream: "Science",
    caste: "SC/ST",
    gender: "Any",
    incomeMax: 30,
    eligibility: [
      "SC/ST category",
      "Pursuing M.Sc/PhD in Physics/Chemistry/Math",
    ],
    benefits: ["₹35,000 monthly stipend", "Conference allowance"],
    deadline: "2025-03-05",
  },
  {
    id: "obc-achievers",
    title: "OBC Achievers Scholarship",
    stream: "Arts",
    caste: "OBC",
    gender: "Any",
    incomeMax: 8,
    eligibility: ["OBC category", "Score ≥ 75%"],
    benefits: ["₹50,000 stipend", "Book allowance"],
    deadline: "2025-01-30",
  },
  {
    id: "private-rnd",
    title: "R&D Excellence Grant",
    stream: "Engineering",
    caste: "Any",
    gender: "Any",
    incomeMax: 50,
    eligibility: ["Final-year undergrads", "Research project proposal"],
    benefits: ["₹2,00,000 project grant", "Industry mentorship"],
    deadline: "2025-02-25",
  },
];

const STREAMS = ["Any", "Science", "Engineering", "Arts"] as const;
const CASTES = ["Any", "General", "OBC", "SC/ST", "EWS"] as const;
const GENDERS = ["Any", "Female", "Male"] as const;
const INCOME = [
  { label: "All", value: Infinity },
  { label: "≤ ₹8L p.a.", value: 8 },
  { label: "≤ ₹15L p.a.", value: 15 },
  { label: "≤ ₹30L p.a.", value: 30 },
  { label: "≤ ���50L p.a.", value: 50 },
] as const;

function daysUntil(dateISO: string) {
  const now = new Date();
  const d = new Date(dateISO);
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function deadlineProgress(dateISO: string) {
  const d = new Date(dateISO);
  const start = new Date(d.getTime() - 1000 * 60 * 60 * 24 * 90);
  const now = new Date();
  const total = d.getTime() - start.getTime();
  const elapsed = Math.min(Math.max(now.getTime() - start.getTime(), 0), total);
  return Math.round((elapsed / total) * 100);
}

export default function Scholarships() {
  const [stream, setStream] = useState<(typeof STREAMS)[number] | undefined>();
  const [caste, setCaste] = useState<(typeof CASTES)[number] | undefined>();
  const [gender, setGender] = useState<(typeof GENDERS)[number] | undefined>();
  const [income, setIncome] = useState<number | undefined>();
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const p = getProfile();
    const q = getQuizResult();
    const s = normalizeStream(q?.stream);
    const g = profileGenderToFilter(p?.gender);
    if (s && (STREAMS as readonly string[]).includes(s as any))
      setStream(s as any);
    if (g) setGender(g as any);
  }, []);

  const filtered = useMemo(() => {
    return SCHOLARSHIPS.filter((s) => {
      const okStream =
        !stream ||
        stream === "Any" ||
        s.stream === stream ||
        s.stream === "Any";
      const okCaste = !caste || caste === "Any" || s.caste === caste;
      const okGender = !gender || gender === "Any" || s.gender === gender;
      const okIncome = !income || (s.incomeMax ?? Infinity) <= income;
      return okStream && okCaste && okGender && okIncome;
    });
  }, [stream, caste, gender, income]);

  const savedList = useMemo(
    () => SCHOLARSHIPS.filter((s) => saved[s.id]),
    [saved],
  );

  function apply(s: Scholarship) {
    toast.success(`Opening application for ${s.title}`);
    if (s.url) window.open(s.url, "_blank");
  }

  return (
    <div className="ml-60 grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Main */}
      <div className="space-y-6 mt-20">
        {/* Filters */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Scholarship Finder</CardTitle>
            <CardDescription>
              Find scholarships that match your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Stream</label>
                <Select
                  value={stream}
                  onValueChange={(v) => setStream(v as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {STREAMS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Caste</label>
                <Select value={caste} onValueChange={(v) => setCaste(v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {CASTES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Gender</label>
                <Select
                  value={gender}
                  onValueChange={(v) => setGender(v as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDERS.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Income</label>
                <Select
                  value={income?.toString()}
                  onValueChange={(v) => setIncome(v ? Number(v) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCOME.map((i) => (
                      <SelectItem key={i.label} value={i.value.toString()}>
                        {i.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid gap-4">
          {filtered.map((s) => {
            const left = daysUntil(s.deadline);
            const pct = deadlineProgress(s.deadline);
            const isSaved = !!saved[s.id];
            return (
              <Card key={s.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold leading-tight">
                          {s.title}
                        </h3>
                        <Badge variant="secondary" className="gap-1">
                          <GraduationCap className="h-3.5 w-3.5" /> {s.stream}
                        </Badge>
                      </div>
                      <div className="mt-3 grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium">Eligibility</p>
                          <ul className="mt-1 list-disc pl-5 text-sm text-foreground/80 space-y-1">
                            {s.eligibility.map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Benefits</p>
                          <ul className="mt-1 space-y-1 text-sm text-foreground/80">
                            {s.benefits.map((b, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Banknote className="h-4 w-4 text-emerald-600" />{" "}
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:items-center">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarDays className="h-4 w-4" /> Deadline:{" "}
                          {new Date(s.deadline).toLocaleDateString()}
                          <Badge
                            variant="outline"
                            className={
                              left <= 14
                                ? "border-transparent bg-red-500 text-white"
                                : left <= 30
                                  ? "border-transparent bg-amber-500 text-white"
                                  : "border-transparent bg-emerald-500 text-white"
                            }
                          >
                            {left > 0 ? `${left} days left` : "Closed"}
                          </Badge>
                        </div>
                        <div className="min-w-[160px]">
                          <Progress value={pct} />
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col gap-2">
                      <Button onClick={() => apply(s)} className="gap-2">
                        Apply Now
                      </Button>
                      <Button
                        variant={isSaved ? "secondary" : "outline"}
                        onClick={() =>
                          setSaved((x) => ({ ...x, [s.id]: !isSaved }))
                        }
                        className="gap-2"
                      >
                        {isSaved ? (
                          <Save className="h-4 w-4" />
                        ) : (
                          <BookmarkPlus className="h-4 w-4" />
                        )}{" "}
                        {isSaved ? "Saved" : "Save"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {filtered.length === 0 && (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                No scholarships match your filters.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-4 lg:sticky lg:top-16 h-max">
        <Card>
          <CardHeader>
            <CardTitle>Saved Scholarships</CardTitle>
            <CardDescription>Your pinned opportunities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedList.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nothing saved yet. Click “Save” on a scholarship to pin it here.
              </p>
            )}
            {savedList.map((s) => (
              <div key={s.id} className="rounded-md border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      {s.title}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" /> {s.stream}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast("Opening details…")}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Medal className="h-5 w-5" /> Tips
            </CardTitle>
            <CardDescription>Boost your chances</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>• Apply early; many grants are first-come-first-serve.</p>
            <p>
              • Prepare documents: income certificate, caste certificate,
              transcripts.
            </p>
            <p>• Write a concise statement highlighting impact and need.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
