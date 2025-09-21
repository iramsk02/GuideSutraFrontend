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
  Search,
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
  { label: "≤ ₹50L p.a.", value: 50 },
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
    <div className="space-y-12 px-4 md:px-8 mt-20">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Scholarship Finder</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover scholarships that match your profile and unlock funding opportunities for your education.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <div className="space-y-6">
       {/* Filters */}
<div className="rounded-3xl shadow-xl border border-gray-200 bg-white">
  {/* Header */}
  <div className="p-8 pb-4 border-b border-gray-100">
    <h2 className="flex items-center gap-4 text-2xl font-bold text-gray-900">
      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        <Search className="w-5 h-5" />
      </div>
      Filter Scholarships
    </h2>
    <p className="text-base text-gray-600 mt-2">
      Find scholarships that match your profile and preferences.
    </p>
  </div>

  {/* Content */}
  <div className="p-8 pt-4">
    <div className="grid gap-4 md:grid-cols-4">
      {/* Stream */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Stream
        </label>
        <select
          value={stream ?? ""}
          onChange={(e) => setStream(e.target.value as any)}
          className="w-full h-12 rounded-xl border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          {STREAMS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Caste */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Caste
        </label>
        <select
          value={caste ?? ""}
          onChange={(e) => setCaste(e.target.value as any)}
          className="w-full h-12 rounded-xl border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          {CASTES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          value={gender ?? ""}
          onChange={(e) => setGender(e.target.value as any)}
          className="w-full h-12 rounded-xl border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          {GENDERS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Income */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Income
        </label>
        <select
          value={income?.toString() ?? ""}
          onChange={(e) =>
            setIncome(e.target.value ? Number(e.target.value) : undefined)
          }
          className="w-full h-12 rounded-xl border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          {INCOME.map((i) => (
            <option key={i.label} value={i.value.toString()}>
              {i.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
</div>


          {/* Results */}
          <div className="grid gap-4">
            {filtered.map((s) => {
              const left = daysUntil(s.deadline);
              const pct = deadlineProgress(s.deadline);
              const isSaved = !!saved[s.id];
              return (
                <Card key={s.id} className="rounded-3xl shadow-lg border-gray-200 transition-transform duration-300 hover:scale-[1.01]">
                  <CardContent className="p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-4">
                          <h3 className="text-2xl font-bold leading-tight text-gray-900">
                            {s.title}
                          </h3>
                          <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700 font-medium">
                            <GraduationCap className="h-4 w-4" /> {s.stream}
                          </Badge>
                        </div>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Eligibility</p>
                            <ul className="mt-1 list-disc pl-5 text-sm text-gray-600 space-y-1">
                              {s.eligibility.map((e, i) => (
                                <li key={i}>{e}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Benefits</p>
                            <ul className="mt-1 space-y-2 text-sm text-gray-700">
                              {s.benefits.map((b, i) => (
                                <li key={i} className="flex items-center gap-3">
                                  <Banknote className="h-5 w-5 text-emerald-600" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:items-center">
                          <div className="flex items-center gap-3 text-sm">
                            <CalendarDays className="h-5 w-5 text-blue-600" /> <span className="font-medium text-gray-800">Deadline: {new Date(s.deadline).toLocaleDateString()}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                left <= 14
                                  ? "border-transparent bg-red-500 text-white"
                                  : left <= 30
                                    ? "border-transparent bg-amber-500 text-white"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {left > 0 ? `${left} days left` : "Closed"}
                            </Badge>
                          </div>
                          <div className="min-w-[160px]">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                              <span>Application Progress</span>
                              <span>{pct}%</span>
                            </div>
                            <Progress value={pct} className="h-2 bg-gray-200" />
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 flex flex-col gap-4">
                        <Button onClick={() => apply(s)} className="gap-2 rounded-full px-6 shadow-md transition-colors">
                          Apply Now
                        </Button>
                        <Button
                          variant={isSaved ? "secondary" : "outline"}
                          onClick={() =>
                            setSaved((x) => ({ ...x, [s.id]: !isSaved }))
                          }
                          className="gap-2 rounded-full px-6"
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
              <Card className="rounded-3xl shadow-lg border-gray-200">
                <CardContent className="py-10 text-center text-gray-500">
                  No scholarships match your filters.
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-16 h-max">
          <Card className="rounded-3xl shadow-xl border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Saved Scholarships</CardTitle>
              <CardDescription className="text-sm text-gray-500">Your pinned opportunities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedList.length === 0 && (
                <p className="text-sm text-gray-500">
                  Nothing saved yet. Click “Save” on a scholarship to pin it here.
                </p>
              )}
              {savedList.map((s) => (
                <div key={s.id} className="rounded-xl border border-gray-200 p-4 bg-gray-50 hover:bg-white transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-tight text-gray-900 truncate">
                        {s.title}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <GraduationCap className="h-3 w-3" /> {s.stream}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full h-8"
                      onClick={() => toast("Opening details…")}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-blue-200 bg-blue-50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 text-xl font-bold">
                <Medal className="h-5 w-5" /> Tips
              </CardTitle>
              <CardDescription className="text-blue-600">Boost your chances</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-blue-800 space-y-2">
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
    </div>
  );
}