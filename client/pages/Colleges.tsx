import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  CalendarDays,
  DollarSign,
  GraduationCap,
  MapPin,
  Save,
  BookmarkPlus,
} from "lucide-react";

// Types
interface College {
  id: string;
  name: string;
  location: string;
  streams: string[]; // e.g., "Science", "Engineering"
  degrees: string[]; // e.g., "B.Sc", "B.Tech"
  courses: string[]; // tags
  eligibility: string;
  fees: number; // annual fees in USD
  deadline: string; // ISO date
}

const COLLEGES: College[] = [
  {
    id: "stanford",
    name: "Stanford University",
    location: "Stanford, CA",
    streams: ["Engineering", "Science"],
    degrees: ["B.S", "M.S", "PhD"],
    courses: ["Computer Science", "Data Science", "Robotics"],
    eligibility: "SAT/ACT optional, strong academics & activities",
    fees: 56700,
    deadline: "2025-01-05",
  },
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    streams: ["Engineering", "Science"],
    degrees: ["B.S", "M.S", "PhD"],
    courses: ["AI & Decision Making", "Aerospace", "Mathematics"],
    eligibility: "Holistic review with strong STEM background",
    fees: 55500,
    deadline: "2025-01-01",
  },
  {
    id: "berkeley",
    name: "UC Berkeley",
    location: "Berkeley, CA",
    streams: ["Engineering", "Science", "Arts"],
    degrees: ["B.A", "B.S", "M.S"],
    courses: ["Data Science", "EECS", "Economics"],
    eligibility: "UC a-g requirements, high GPA",
    fees: 18700,
    deadline: "2024-11-30",
  },
  {
    id: "cmu",
    name: "Carnegie Mellon University",
    location: "Pittsburgh, PA",
    streams: ["Engineering", "Science", "Design"],
    degrees: ["B.S", "M.S"],
    courses: ["Robotics", "Computer Science", "Design"],
    eligibility: "Strong math & CS background",
    fees: 59864,
    deadline: "2025-01-03",
  },
  {
    id: "ucla",
    name: "UCLA",
    location: "Los Angeles, CA",
    streams: ["Science", "Arts"],
    degrees: ["B.A", "B.S"],
    courses: ["Biology", "Statistics", "Psychology"],
    eligibility: "UC a-g requirements, PIQs",
    fees: 13990,
    deadline: "2024-11-30",
  },
  {
    id: "umich",
    name: "University of Michigan",
    location: "Ann Arbor, MI",
    streams: ["Engineering", "Science", "Business"],
    degrees: ["B.S", "BBA", "M.S"],
    courses: ["Mechanical", "CS", "Business"],
    eligibility: "High academic rigor, essays",
    fees: 26200,
    deadline: "2025-02-01",
  },
  {
    id: "gatech",
    name: "Georgia Tech",
    location: "Atlanta, GA",
    streams: ["Engineering"],
    degrees: ["B.S", "M.S"],
    courses: ["Aerospace", "Industrial", "CS"],
    eligibility: "STEM coursework, essays",
    fees: 12552,
    deadline: "2025-01-04",
  },
  {
    id: "ut-austin",
    name: "UT Austin",
    location: "Austin, TX",
    streams: ["Engineering", "Business"],
    degrees: ["B.S", "BBA"],
    courses: ["CS", "Business Honors", "ECE"],
    eligibility: "Top 6% auto admit for TX residents",
    fees: 11500,
    deadline: "2024-12-01",
  },
  {
    id: "uci",
    name: "UC Irvine",
    location: "Irvine, CA",
    streams: ["Science", "Engineering"],
    degrees: ["B.S", "B.A"],
    courses: ["Informatics", "Biomedical", "Physics"],
    eligibility: "UC a-g requirements",
    fees: 13700,
    deadline: "2024-11-30",
  },
  {
    id: "nyu",
    name: "New York University",
    location: "New York, NY",
    streams: ["Arts", "Business"],
    degrees: ["B.S", "BFA", "MBA"],
    courses: ["Film", "Business", "Data Science"],
    eligibility: "Holistic review",
    fees: 56800,
    deadline: "2025-01-05",
  },
  {
    id: "purdue",
    name: "Purdue University",
    location: "West Lafayette, IN",
    streams: ["Engineering", "Science"],
    degrees: ["B.S", "M.S"],
    courses: ["Computer Engineering", "Ag Engg", "Physics"],
    eligibility: "STEM readiness",
    fees: 10411,
    deadline: "2024-11-01",
  },
  {
    id: "asu",
    name: "Arizona State University",
    location: "Tempe, AZ",
    streams: ["Engineering", "Business"],
    degrees: ["B.S", "BBA"],
    courses: ["Software Eng", "Supply Chain"],
    eligibility: "Test optional",
    fees: 11200,
    deadline: "2025-02-15",
  },
];

const unique = (arr: string[]) => Array.from(new Set(arr)).sort();
const allLocations = unique(
  COLLEGES.map((c) => c.location.split(", ").pop() || c.location),
);
const allStreams = unique(COLLEGES.flatMap((c) => c.streams));
const allDegrees = unique(COLLEGES.flatMap((c) => c.degrees));

function daysUntil(dateISO: string) {
  const now = new Date();
  const d = new Date(dateISO);
  const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

function deadlineProgress(dateISO: string) {
  const d = new Date(dateISO);
  const start = new Date(d.getTime() - 1000 * 60 * 60 * 24 * 90); // 90 day window
  const now = new Date();
  const total = d.getTime() - start.getTime();
  const elapsed = Math.min(Math.max(now.getTime() - start.getTime(), 0), total);
  return Math.round((elapsed / total) * 100);
}

export default function Colleges() {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState<string | undefined>();
  const [stream, setStream] = useState<string | undefined>();
  const [degree, setDegree] = useState<string | undefined>();
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return COLLEGES.filter((c) => {
      const matchQ =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.courses.some((x) => x.toLowerCase().includes(query));
      const city = c.location.split(", ").pop() || c.location;
      const matchLoc = !loc || city === loc;
      const matchStream = !stream || c.streams.includes(stream);
      const matchDegree = !degree || c.degrees.includes(degree);
      return matchQ && matchLoc && matchStream && matchDegree;
    });
  }, [q, loc, stream, degree]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageClamped = Math.min(page, totalPages);
  const paged = filtered.slice(
    (pageClamped - 1) * perPage,
    pageClamped * perPage,
  );

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>College Directory</CardTitle>
          <CardDescription>
            Filter and explore colleges. Save ones you like to your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Location</label>
              <Select
                value={loc}
                onValueChange={(v) => {
                  setLoc(v === "all" ? undefined : v);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {allLocations.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Stream</label>
              <Select
                value={stream}
                onValueChange={(v) => {
                  setStream(v === "all" ? undefined : v);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All streams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {allStreams.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Degree</label>
              <Select
                value={degree}
                onValueChange={(v) => {
                  setDegree(v === "all" ? undefined : v);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All degrees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {allDegrees.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Search</label>
              <Input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by college or course"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-4">
        {paged.map((c) => {
          const city = c.location.split(", ").pop() || c.location;
          const left = daysUntil(c.deadline);
          const pct = deadlineProgress(c.deadline);
          const isSaved = !!saved[c.id];
          return (
            <Card key={c.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold leading-tight">
                        {c.name}
                      </h3>
                      <Badge variant="secondary">{c.degrees.join(" · ")}</Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" /> {c.location}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.courses.map((course) => (
                        <Badge key={course} variant="outline">
                          {course}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-foreground/80">
                      <span className="font-medium">Eligibility:</span>{" "}
                      {c.eligibility}
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:items-center">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4" /> Annual Fees: $
                        {c.fees.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4" /> Deadline:{" "}
                        {new Date(c.deadline).toLocaleDateString()}
                        <Badge
                          variant="outline"
                          className={
                            left <= 14
                              ? "border-transparent bg-red-500 text-white"
                              : left <= 30
                                ? "border-transparent bg-amber-500 text-white"
                                : ""
                          }
                        >
                          {left > 0 ? `${left} days left` : "Closed"}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={pct} />
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Button
                      onClick={() =>
                        setSaved((s) => ({ ...s, [c.id]: !isSaved }))
                      }
                      variant={isSaved ? "secondary" : "default"}
                      className="gap-2"
                    >
                      {isSaved ? (
                        <Save className="h-4 w-4" />
                      ) : (
                        <BookmarkPlus className="h-4 w-4" />
                      )}{" "}
                      {isSaved ? "Saved" : "Save to Dashboard"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {paged.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No results match your filters.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(1, p - 1));
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === pageClamped}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(totalPages, p + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
