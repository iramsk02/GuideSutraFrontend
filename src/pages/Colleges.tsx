
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination";
import { CalendarDays, DollarSign, MapPin, Save, BookmarkPlus, Search, GraduationCap } from "lucide-react";

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
    <div className="space-y-12 py-12 px-4 md:px-8 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">College Directory</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore colleges in Jammu & Kashmir and find the perfect match for your career goals.
        </p>
      </div>

      {/* Filters */}
      <div className="rounded-3xl shadow-xl border border-gray-200 bg-white">
  {/* Header */}
  <div className="p-8 pb-4 border-b border-gray-100">
    <div className="flex items-center gap-4 text-2xl font-bold text-gray-900">
      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        <Search className="w-5 h-5" />
      </div>
      Search & Filter
    </div>
    <p className="mt-2 text-base text-gray-600">
      Find colleges that match your preferences
    </p>
  </div>

  {/* Content */}
  <div className="p-8 pt-4 ">
    <div className="grid gap-6 md:grid-cols-4">
      {/* Location */}
      <div className="space-y-2 ">
        <label className="text-sm font-medium text-gray-700">Location</label>
        <select
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          className="h-12 w-full rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {LOCATION_OPTIONS.map((l, idx) => (
            <option key={`${l}-${idx}`} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Stream */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Stream</label>
        <select
          value={stream}
          onChange={(e) =>
            setStream(e.target.value === "all" ? undefined : e.target.value)
          }
          className="h-12 w-full rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          {Array.from(new Set(allStreams)).map((s, idx) => (
            <option key={`${s}-${idx}`} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Degree */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Degree</label>
        <select
          value={degree}
          onChange={(e) =>
            setDegree(e.target.value === "all" ? undefined : e.target.value)
          }
          className="h-12 w-full rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          {Array.from(new Set(allDegrees)).map((d, idx) => (
            <option key={`${d}-${idx}`} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Search</label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by college or course"
          className="h-12 w-full rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
</div>


      {/* College Cards */}
      <div className="grid gap-8 grid-cols-1">
        {paged.map((c, index) => {
          const left = daysUntil(c.deadline);
          const pct = deadlineProgress(c.deadline);
          const isSaved = !!saved[c.id];
          return (
            <Card key={c.id} className="rounded-3xl shadow-lg border-gray-200 transition-transform duration-300 hover:scale-[1.01]">
              <CardContent className="p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                        <GraduationCap className="h-8 w-8" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-2xl font-bold leading-tight text-gray-900 mb-1">{c.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span>{c.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {c.degrees.map((degree, i) => (
                            <Badge key={`${degree}-${i}`} variant="secondary" className="text-xs bg-gray-100 text-gray-700 rounded-full">{degree}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Available Courses</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(c.courses)).slice(0, 4).map((course, i) => (
                          <Badge key={`${course}-${i}`} variant="outline" className="text-xs bg-gray-100 text-gray-700 rounded-full border-gray-200">{course}</Badge>
                        ))}
                        {c.courses.length > 4 && (
                          <Badge variant="outline" className="text-xs bg-gray-100 text-gray-500 rounded-full border-gray-200">+{c.courses.length - 4} more</Badge>
                        )}
                      </div>
                    </div>

                    <div className="mb-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-semibold text-blue-800">Eligibility:</span> {c.eligibility}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3 text-sm">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-gray-800">Annual Fees: ₹{c.fees.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CalendarDays className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-gray-800">Deadline: {new Date(c.deadline).toLocaleDateString()}</span>
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
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Application Progress</span>
                        <span>{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-2 bg-gray-200" />
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col gap-4 md:pl-6 md:border-l border-gray-200">
                    <Button
                      onClick={() => setSaved((s) => ({ ...s, [c.id]: !isSaved }))}
                      variant={isSaved ? "secondary" : "default"}
                      className="gap-2 min-w-[180px] rounded-full shadow-md transition-colors"
                    >
                      {isSaved ? <Save className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
                      {isSaved ? "Saved" : "Save to Dashboard"}
                    </Button>
                    <Button variant="outline" className="min-w-[180px] rounded-full">
                      View Details
                    </Button>
                    
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {paged.length === 0 && (
          <Card className="rounded-3xl shadow-lg border-gray-200 lg:col-span-2">
            <CardContent className="py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-500">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your filters to find more colleges.</p>
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