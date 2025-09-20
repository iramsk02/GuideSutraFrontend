import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CalendarDays, DollarSign, MapPin, Save, BookmarkPlus } from "lucide-react";

interface College {
  id: string;
  name: string;
  location: string;
  streams: string[];
  degrees: string[];
  courses: string[];
  eligibility: string;
  fees: number;
  deadline: string;
}

const LOCATION_OPTIONS = ["All", "Jammu", "Kashmir"];

const unique = (arr: string[]) => Array.from(new Set(arr)).sort();

export default function Colleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState<string>("All");
  const [stream, setStream] = useState<string | undefined>();
  const [degree, setDegree] = useState<string | undefined>();
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const perPage = 6;
  const apiUrl = import.meta.env.VITE_API_URL;


  // Fetch colleges from backend
  useEffect(() => {
    fetch(`${apiUrl}/colleges`)
      .then((res) => res.json())
      .then((data: any[]) => {
        const mapped = data.map((c) => ({
          id: c.id.toString(),
          name: c.collegeName,
          location: c.location,
          streams: c.collegeCourses.map((cc: any) => cc.course.name),
          degrees: c.degrees || [],
          courses: c.collegeCourses.map((cc: any) => cc.course.name),
          eligibility: c.eligibility || "Check college website",
          fees: c.fees || 0,
          deadline: c.deadline || new Date().toISOString(),
        }));
        setColleges(mapped);
      })
      .catch(console.error);
  }, []);

  const allStreams = useMemo(() => unique(colleges.flatMap((c) => c.streams)), [colleges]);
  const allDegrees = useMemo(() => unique(colleges.flatMap((c) => c.degrees)), [colleges]);

  const daysUntil = (dateISO: string) => {
    const now = new Date();
    const d = new Date(dateISO);
    return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const deadlineProgress = (dateISO: string) => {
    const d = new Date(dateISO);
    const start = new Date(d.getTime() - 1000 * 60 * 60 * 24 * 90);
    const now = new Date();
    const total = d.getTime() - start.getTime();
    const elapsed = Math.min(Math.max(now.getTime() - start.getTime(), 0), total);
    return Math.round((elapsed / total) * 100);
  };

const filtered = useMemo(() => {
  const query = q.trim().toLowerCase();
  return colleges.filter((c) => {
    const city = c.location?.split(", ").pop() || c.location;
    const matchLoc = loc === "All" || city?.toLowerCase().includes(loc.toLowerCase());

    const matchQ =
      !query ||
      (c.name?.toLowerCase().includes(query)) ||
      (c.courses?.some((x) => x?.toLowerCase().includes(query)));

    const matchStream = !stream || c.streams?.includes(stream);
    const matchDegree = !degree || c.degrees?.includes(degree);

    return matchLoc && matchQ && matchStream && matchDegree;
  });
}, [colleges, q, loc, stream, degree]);


  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageClamped = Math.min(page, totalPages);
  const paged = filtered.slice((pageClamped - 1) * perPage, pageClamped * perPage);

  return (
    <div className="space-y-6 mt-20">
      {/* Filters */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>College Directory</CardTitle>
          <CardDescription>Explore colleges in Jammu & Kashmir.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            {/* Location */}
            <div>
              <label className="mb-1 block text-sm font-medium">Location</label>
              <Select value={loc} onValueChange={(v) => setLoc(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATION_OPTIONS.map((l, idx) => (
                    <SelectItem key={`${l}-${idx}`} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stream */}
            <div>
              <label className="mb-1 block text-sm font-medium">Stream</label>
              <Select value={stream} onValueChange={(v) => setStream(v === "all" ? undefined : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="All streams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {Array.from(new Set(allStreams)).map((s, idx) => (
                    <SelectItem key={`${s}-${idx}`} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Degree */}
            <div>
              <label className="mb-1 block text-sm font-medium">Degree</label>
              <Select value={degree} onValueChange={(v) => setDegree(v === "all" ? undefined : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="All degrees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {Array.from(new Set(allDegrees)).map((d, idx) => (
                    <SelectItem key={`${d}-${idx}`} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div>
              <label className="mb-1 block text-sm font-medium">Search</label>
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by college or course" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* College Cards */}
      <div className="grid gap-4">
        {paged.map((c) => {
          const left = daysUntil(c.deadline);
          const pct = deadlineProgress(c.deadline);
          const isSaved = !!saved[c.id];
          return (
            <Card key={c.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold leading-tight">{c.name}</h3>
                      <Badge variant="secondary">{c.degrees.join(" · ")}</Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" /> {c.location}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {Array.from(new Set(c.courses)).map((course, i) => (
                        <Badge key={`${course}-${i}`} variant="outline">{course}</Badge>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-foreground/80"><span className="font-medium">Eligibility:</span> {c.eligibility}</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:items-center">
                      <div className="flex items-center gap-2 text-sm"><DollarSign className="h-4 w-4" /> Annual Fees: ${c.fees.toLocaleString()}</div>
                      <div className="flex items-center gap-2 text-sm"><CalendarDays className="h-4 w-4" /> Deadline: {new Date(c.deadline).toLocaleDateString()}
                        <Badge variant="outline" className={left <= 14 ? "border-transparent bg-red-500 text-white" : left <= 30 ? "border-transparent bg-amber-500 text-white" : ""}>{left > 0 ? `${left} days left` : "Closed"}</Badge>
                      </div>
                    </div>
                    <div className="mt-2"><Progress value={pct} /></div>
                  </div>
                  <div className="shrink-0">
                    <Button onClick={() => setSaved((s) => ({ ...s, [c.id]: !isSaved }))} variant={isSaved ? "secondary" : "default"} className="gap-2">
                      {isSaved ? <Save className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />} {isSaved ? "Saved" : "Save to Dashboard"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {paged.length === 0 && <Card><CardContent className="py-10 text-center text-muted-foreground">No results match your filters.</CardContent></Card>}
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
