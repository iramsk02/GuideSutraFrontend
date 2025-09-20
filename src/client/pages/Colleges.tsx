import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination";
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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">College Directory</h1>
        <p className="page-description">
          Explore colleges in Jammu & Kashmir and find the perfect match for your career goals.
        </p>
      </div>

      {/* Filters */}
      <Card className="card-hover animate-slide-up">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-sm">🔍</span>
            </div>
            Search & Filter
          </CardTitle>
          <CardDescription>Find colleges that match your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Location</label>
              <Select value={loc} onValueChange={(v) => setLoc(v)}>
                <SelectTrigger className="h-11 focus-ring">
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Stream</label>
              <Select value={stream} onValueChange={(v) => setStream(v === "all" ? undefined : v)}>
                <SelectTrigger className="h-11 focus-ring">
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Degree</label>
              <Select value={degree} onValueChange={(v) => setDegree(v === "all" ? undefined : v)}>
                <SelectTrigger className="h-11 focus-ring">
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Search</label>
              <Input 
                value={q} 
                onChange={(e) => setQ(e.target.value)} 
                placeholder="Search by college or course" 
                className="h-11 focus-ring"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* College Cards */}
      <div className="grid gap-6">
        {paged.map((c, index) => {
          const left = daysUntil(c.deadline);
          const pct = deadlineProgress(c.deadline);
          const isSaved = !!saved[c.id];
          return (
            <Card key={c.id} className="card-hover animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-lg">
                        {c.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold leading-tight text-foreground mb-1">{c.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4" /> 
                          <span>{c.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {c.degrees.map((degree, i) => (
                            <Badge key={`${degree}-${i}`} variant="secondary" className="text-xs">{degree}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">Available Courses</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(c.courses)).slice(0, 4).map((course, i) => (
                          <Badge key={`${course}-${i}`} variant="outline" className="text-xs bg-accent/40">{course}</Badge>
                        ))}
                        {c.courses.length > 4 && (
                          <Badge variant="outline" className="text-xs">+{c.courses.length - 4} more</Badge>
                        )}
                      </div>
                    </div>

                    <div className="mb-4 p-4 rounded-lg bg-muted/30">
                      <p className="text-sm text-foreground/80">
                        <span className="font-medium">Eligibility:</span> {c.eligibility}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-green-600" /> 
                        <span className="font-medium">Annual Fees: ₹{c.fees.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-blue-600" /> 
                        <span className="font-medium">Deadline: {new Date(c.deadline).toLocaleDateString()}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            left <= 14 
                              ? "border-transparent bg-red-500 text-white" 
                              : left <= 30 
                                ? "border-transparent bg-amber-500 text-white" 
                                : "bg-muted text-foreground"
                          }`}
                        >
                          {left > 0 ? `${left} days left` : "Closed"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Application Progress</span>
                        <span>{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="shrink-0 flex flex-col gap-3">
                    <Button 
                      onClick={() => setSaved((s) => ({ ...s, [c.id]: !isSaved }))} 
                      variant={isSaved ? "secondary" : "default"} 
                      className="gap-2 min-w-[160px]"
                    >
                      {isSaved ? <Save className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />} 
                      {isSaved ? "Saved" : "Save to Dashboard"}
                    </Button>
                    <Button variant="outline" className="gap-2 min-w-[160px]">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {paged.length === 0 && (
          <Card className="animate-fade-in">
            <CardContent className="py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to find more colleges.</p>
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
