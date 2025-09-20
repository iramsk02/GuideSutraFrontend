import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Bell } from "lucide-react";

// Custom Node Component to display icons and names
const NodeComponent = ({ label, icon }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md flex items-center gap-3 w-56">
    <div className="w-6 h-6 text-gray-800">{icon}</div>
    <div className="text-base font-semibold text-gray-800">{label}</div>
  </div>
);

type Profile = {
  id?: number;
  name?: string;
  interests?: string[];
  educationLevel?: string;
};

type QuizResult = {
  stream?: string;
  score?: number;
  strengths?: string[];
  weaknesses?: string[];
};

type RecommendationData = {
  careerRecommendations: any[];
  courseRecommendations: any[];
  collegeRecommendations: any[];
};

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quiz, setQuiz] = useState<QuizResult | null>(null);
  const [recsData, setRecsData] = useState<RecommendationData>({
    careerRecommendations: [],
    courseRecommendations: [],
    collegeRecommendations: [],
  });
  const [recsLoading, setRecsLoading] = useState(false);
  const [needsAssessment, setNeedsAssessment] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Static dashboard snippets
  const staticScholarships = [
    {
      title: "Women in STEM Excellence Grant",
      tag: "Science",
      deadline: new Date().toISOString(),
    },
    {
      title: "Tech Innovators Merit Scholarship",
      tag: "Engineering",
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(),
    },
    {
      title: "AI/ML Research Fellowship",
      tag: "Computer Science",
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 32).toISOString(),
    },
  ];
  const staticReminders = [
    {
      id: "r1",
      title: "Submit DU application",
      due: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    },
    {
      id: "r2",
      title: "Scholarship essay draft",
      due: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    },
    {
      id: "r3",
      title: "Parent-teacher meeting",
      due: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18).toISOString(),
    },
  ];
  const daysLeft = (iso: string) => {
    const d = new Date(iso).getTime() - Date.now();
    return Math.ceil(d / (1000 * 60 * 60 * 24));
  };

  const completion = useMemo(() => {
    const p = profile || {};
    const flags = [!!p.name, (p.interests || []).length > 0, !!quiz?.stream];
    const filled = flags.reduce((acc, v) => acc + (v ? 1 : 0), 0);
    return Math.round((filled / flags.length) * 100);
  }, [profile, quiz]);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("novapath_profile");
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);

        // Load quiz result from local storage
        try {
          const rawQuiz = localStorage.getItem("novapath_quiz_result");
          if (rawQuiz) setQuiz(JSON.parse(rawQuiz));
        } catch {}

        // Prepare simple local suggestions as fallback
        const ints = new Set(
          (parsedProfile.interests || []).map((s: string) => s.toLowerCase()),
        );
        const localRecs = {
          careerRecommendations: [] as any[],
          courseRecommendations: [] as any[],
          collegeRecommendations: [] as any[],
        };
        if (
          ints.has("computer science") ||
          ints.has("cse") ||
          ints.has("software") ||
          ints.has("mathematics") ||
          ints.has("robotics")
        ) {
          localRecs.careerRecommendations.push({
            careerName: "Software Engineer",
          });
          localRecs.courseRecommendations.push({ courseName: "B.Tech CSE" });
          localRecs.collegeRecommendations.push({ collegeName: "IIT Jammu" });
        } else if (
          ints.has("biology") ||
          ints.has("healthcare") ||
          ints.has("medical")
        ) {
          localRecs.careerRecommendations.push({ careerName: "Doctor" });
          localRecs.courseRecommendations.push({ courseName: "MBBS" });
          localRecs.collegeRecommendations.push({
            collegeName: "GMC Srinagar",
          });
        }

        // Fetch recommendations dynamically with graceful fallbacks
        if (parsedProfile?.id && apiUrl) {
          setRecsLoading(true);
          const controller = new AbortController();
          const userId = parsedProfile.id;

          const tryGenerate = () =>
            fetch(`${apiUrl}/generate-recommendations/${userId}`, {
              signal: controller.signal,
            }).then((res) =>
              res.ok ? res.json() : Promise.reject(new Error("bad response")),
            );

          const trySimple = () =>
            fetch(`${apiUrl}/recommendations/${userId}`, {
              signal: controller.signal,
            }).then((res) =>
              res.ok ? res.json() : Promise.reject(new Error("bad response")),
            );

          tryGenerate()
            .then((data) => {
              const recs = {
                careerRecommendations: Array.isArray(
                  data?.careerRecommendations,
                )
                  ? data.careerRecommendations
                  : [],
                courseRecommendations: Array.isArray(
                  data?.courseRecommendations,
                )
                  ? data.courseRecommendations
                  : [],
                collegeRecommendations: Array.isArray(
                  data?.collegeRecommendations,
                )
                  ? data.collegeRecommendations
                  : [],
              };
              if (
                !recs.careerRecommendations.length &&
                !recs.courseRecommendations.length &&
                !recs.collegeRecommendations.length
              ) {
                // If shape not provided by API, fallback to local suggestions
                setRecsData(localRecs);
                setNeedsAssessment(recs.careerRecommendations.length === 0);
              } else {
                setRecsData(recs);
                setNeedsAssessment(false);
              }
            })
            .catch(() =>
              // Fallback to simple recommendations endpoint
              trySimple()
                .then((data) => {
                  const hasAny =
                    Array.isArray(data?.recommendations) &&
                    data.recommendations.length > 0;
                  if (
                    !hasAny ||
                    data.recommendations[0]?.title === "No Assessment Yet"
                  ) {
                    setRecsData(localRecs);
                    setNeedsAssessment(true);
                  } else {
                    // We don't have structured career/course/college; keep local or placeholders
                    setRecsData(localRecs);
                    setNeedsAssessment(false);
                  }
                })
                .catch(() => {
                  setRecsData(localRecs);
                  setNeedsAssessment(
                    localRecs.careerRecommendations.length === 0,
                  );
                }),
            )
            .finally(() => setRecsLoading(false));
        } else {
          setRecsData(localRecs);
          setNeedsAssessment(localRecs.careerRecommendations.length === 0);
        }
      }
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
    console.log(recsData)
  }, []);

  // Build a simple roadmap using CSS Grid
  const topCareer = recsData.careerRecommendations[0];
  const topCourse = recsData.courseRecommendations[0];
  const topCollege = recsData.collegeRecommendations[0];

  // Updated roadmap rendering logic
  const roadMapItems = (
    <div className="flex justify-center items-center gap-4">
      {/* Career Node */}
      <NodeComponent
        label={topCareer?.careerName || "Software Engineer"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 16v-2.336c0-1.631-.47-3.262-1.41-4.636-.939-1.375-2.298-2.482-3.868-3.218-.328-.154-.672-.279-1.026-.388.006-.021.011-.04.017-.06.273-.615.421-1.282.421-1.962 0-2.485-2.015-4.5-4.5-4.5s-4.5 2.015-4.5 4.5c0 .68.148 1.347.421 1.962-.354.109-.698.234-1.026.388-1.57.736-2.929 1.843-3.868 3.218-.939 1.374-1.41 3.005-1.41 4.636v2.336h16zM8 20v-2h8v2h-8z" />
          </svg>
        }
      />

      {/* Arrow Connector */}
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      {/* Course Node */}
      <NodeComponent
        label={topCourse?.courseName || "Unknown Course"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21L21 12L12 3L3 12L12 21z" />
          </svg>
        }
      />

      {/* Arrow Connector */}
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      {/* College Node */}
      <NodeComponent
        label={topCollege?.collegeName || "Unknown College"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20s-8-4-8-12c0-4.418 3.582-8 8-8s8 3.582 8 8c0 8-8 12-8 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
      />
    </div>
  );

  return (
    <div className="mt-20 space-y-8">
      {/* Profile Card */}
      {profile && (
        <Card>
          <CardContent className="py-5 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-base font-semibold">
                Hi {profile.name?.split(" ")[0]} 👋
              </p>
              <p className="text-sm text-muted-foreground">
                Your career roadmap awaits
              </p>
            </div>
            <div className="min-w-[260px]">
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Profile Progress</span>
                <span>{completion}%</span>
              </div>
              <Progress value={completion} />
            </div>
            {profile.interests?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quiz Result Card */}
      {quiz && quiz.stream && (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Result</CardTitle>
            <CardDescription>
              Your career interests based on the assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <span>Recommended Stream:</span>
              <Badge variant="outline">{quiz.stream}</Badge>
            </div>
            <p>Score: {quiz.score}%</p>
            {quiz.strengths?.length > 0 && (
              <div>
                <span>Strengths: </span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {quiz.strengths.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {quiz.weaknesses?.length > 0 && (
              <div>
                <span>Areas to Improve: </span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {quiz.weaknesses.map((w) => (
                    <Badge key={w} variant="destructive">
                      {w}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <Button asChild className="mt-2">
              <Link to="/career-quiz">Retake Assessment</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Career Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Career Roadmap</CardTitle>
          <CardDescription>
            Interactive flowchart. Click a node to see details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recsLoading ? (
            <p className="text-muted-foreground text-center">
              Loading roadmap...
            </p>
          ) : (
            roadMapItems
          )}
        </CardContent>
      </Card>

      {/* Scholarships (static preview) */}
      <Card>
        <CardHeader>
          <CardTitle>Scholarships</CardTitle>
          <CardDescription>Handpicked opportunities for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {staticScholarships.map((s) => {
            const left = daysLeft(s.deadline);
            const urgent = left <= 7;
            return (
              <div
                key={s.title}
                className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="font-medium leading-tight truncate">
                    {s.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{s.tag}</Badge>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />{" "}
                      {new Date(s.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  <Badge
                    className={
                      urgent
                        ? "bg-red-500 text-white"
                        : "bg-amber-500 text-white"
                    }
                  >
                    {left > 0 ? `${left} days left` : "Closed"}
                  </Badge>
                </div>
              </div>
            );
          })}
          <Button asChild variant="outline" className="mt-2">
            <Link to="/scholarships">View all scholarships</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Reminders (static preview) */}
      <Card>
        <CardHeader>
          <CardTitle>Reminders</CardTitle>
          <CardDescription>Stay on top of deadlines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {staticReminders.map((r) => {
            const left = daysLeft(r.due);
            const urgent = left <= 7;
            return (
              <div
                key={r.id}
                className="flex items-center justify-between gap-3 border-b pb-3 last:border-b-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{r.title}</span>
                </div>
                <div className="text-sm">
                  <Badge
                    variant="outline"
                    className={
                      urgent ? "border-transparent bg-red-500 text-white" : ""
                    }
                  >
                    {left > 0 ? `${left} days` : "Today"}
                  </Badge>
                </div>
              </div>
            );
          })}
          <Button asChild variant="outline" className="mt-2">
            <Link to="/notifications">View all reminders</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
