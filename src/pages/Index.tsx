import { Badge } from "../components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { CalendarDays, Bell } from "lucide-react";

// Trendy Node Component
const NodeComponent = ({ label, icon }: any) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4 min-w-[200px] hover:scale-105 transition-transform duration-300 cursor-pointer">
    <div className="w-10 h-10 text-blue-600">{icon}</div>
    <div className="text-lg font-semibold text-gray-800 text-center truncate w-full">
      {label}
    </div>
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

        const rawQuiz = localStorage.getItem("novapath_quiz_result");
        if (rawQuiz) setQuiz(JSON.parse(rawQuiz));

        const ints = new Set(
          (parsedProfile.interests || []).map((s: string) => s.toLowerCase())
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
          localRecs.careerRecommendations.push({ careerName: "Software Engineer" });
          localRecs.courseRecommendations.push({ courseName: "B.Tech CSE" });
          localRecs.collegeRecommendations.push({ collegeName: "IIT Jammu" });
        } else if (
          ints.has("biology") ||
          ints.has("healthcare") ||
          ints.has("medical")
        ) {
          localRecs.careerRecommendations.push({ careerName: "Doctor" });
          localRecs.courseRecommendations.push({ courseName: "MBBS" });
          localRecs.collegeRecommendations.push({ collegeName: "GMC Srinagar" });
        }

        if (parsedProfile?.id && apiUrl) {
          setRecsLoading(true);
          const controller = new AbortController();
          const userId = parsedProfile.id;

          const tryGenerate = () =>
            fetch(`${apiUrl}/generate-recommendations/${userId}`, { signal: controller.signal }).then((res) =>
              res.ok ? res.json() : Promise.reject(new Error("bad response"))
            );

          const trySimple = () =>
            fetch(`${apiUrl}/recommendations/${userId}`, { signal: controller.signal }).then((res) =>
              res.ok ? res.json() : Promise.reject(new Error("bad response"))
            );

          tryGenerate()
            .then((data) => {
              const recs = {
                careerRecommendations: Array.isArray(data?.careerRecommendations) ? data.careerRecommendations : [],
                courseRecommendations: Array.isArray(data?.courseRecommendations) ? data.courseRecommendations : [],
                collegeRecommendations: Array.isArray(data?.collegeRecommendations) ? data.collegeRecommendations : [],
              };
              if (
                !recs.careerRecommendations.length &&
                !recs.courseRecommendations.length &&
                !recs.collegeRecommendations.length
              ) {
                setRecsData(localRecs);
                setNeedsAssessment(true);
              } else {
                setRecsData(recs);
                setNeedsAssessment(false);
              }
            })
            .catch(() =>
              trySimple()
                .then((data) => {
                  setRecsData(localRecs);
                  setNeedsAssessment(true);
                })
                .catch(() => {
                  setRecsData(localRecs);
                  setNeedsAssessment(localRecs.careerRecommendations.length === 0);
                })
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
  }, []);

  const topCareer = recsData.careerRecommendations[0];
  const topCourse = recsData.courseRecommendations[0];
  const topCollege = recsData.collegeRecommendations[0];

  const roadMapItems = (
    <div className="flex flex-wrap justify-center items-center gap-6">
      <NodeComponent
        label={topCareer?.careerName || "Software Engineer"}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16v-2.336c0-1.631-.47-3.262-1.41-4.636-.939-1.375-2.298-2.482-3.868-3.218-.328-.154-.672-.279-1.026-.388.006-.021.011-.04.017-.06.273-.615.421-1.282.421-1.962 0-2.485-2.015-4.5-4.5-4.5s-4.5 2.015-4.5 4.5c0 .68.148 1.347.421 1.962-.354.109-.698.234-1.026.388-1.57.736-2.929 1.843-3.868 3.218-.939 1.374-1.41 3.005-1.41 4.636v2.336h16zM8 20v-2h8v2h-8z"/></svg>
        }
      />
      <div className="flex items-center justify-center text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
      <NodeComponent
        label={topCourse?.courseName || "Unknown Course"}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21L21 12L12 3L3 12L12 21z"/></svg>
        }
      />
      <div className="flex items-center justify-center text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
      <NodeComponent
        label={topCollege?.collegeName || "Unknown College"}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-8-4-8-12c0-4.418 3.582-8 8-8s8 3.582 8 8c0 8-8 12-8 12z"/><circle cx="12" cy="12" r="3"/></svg>
        }
      />
    </div>
  );

  return (
    <div className="mt-20 space-y-8 px-4 md:px-8">
      {/* Profile Card */}
      {profile && (
        <Card className="rounded-3xl bg-white border-gray-200 shadow-lg transition-transform duration-300 hover:scale-[1.01]">
          <CardContent className="py-8 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xl font-bold text-gray-900">
                Hi {profile.name?.split(" ")[0]} 👋
              </p>
              <p className="text-sm text-gray-500">
                Your career roadmap awaits
              </p>
            </div>
            <div className="min-w-[260px]">
              <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
                <span>Profile Progress</span>
                <span className="font-semibold text-blue-600">{completion}%</span>
              </div>
              <Progress value={completion} className="h-2 rounded-full bg-blue-100" />
            </div>
            {profile.interests?.length! > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.interests!.map((t) => (
                  <Badge key={t} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 rounded-full px-3 py-1 text-sm">
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
        <Card className="rounded-3xl border-gray-200 shadow-md transition-transform duration-300 hover:scale-[1.01]">
          <CardHeader className="p-8">
            <CardTitle className="text-xl font-bold text-gray-900">Assessment Result</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Your career interests based on the assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Recommended Stream:</span>
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 rounded-full px-3 py-1 text-sm">
                {quiz.stream}
              </Badge>
            </div>
            <p className="text-gray-600 font-medium">Score: <span className="text-gray-900 font-bold">{quiz.score}%</span></p>
            {quiz.strengths?.length! > 0 && (
              <div>
                <span className="font-medium text-gray-700">Strengths: </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {quiz.strengths!.map((s) => (
                    <Badge key={s} variant="secondary" className="bg-green-50 text-green-700 border-green-200 rounded-full">{s}</Badge>
                  ))}
                </div>
              </div>
            )}
            {quiz.weaknesses?.length! > 0 && (
              <div>
                <span className="font-medium text-gray-700">Areas to Improve: </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {quiz.weaknesses!.map((w) => (
                    <Badge key={w} variant="destructive" className="bg-red-50 text-red-700 border-red-200 rounded-full">{w}</Badge>
                  ))}
                </div>
              </div>
            )}
            <Button asChild className="mt-4 rounded-full px-6 py-2 text-sm">
              <Link to="/career-quiz">Retake Assessment</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Career Roadmap */}
      <Card className="rounded-3xl border-gray-200 shadow-md transition-transform duration-300 hover:scale-[1.01]">
        <CardHeader className="p-8">
          <CardTitle className="text-xl font-bold text-gray-900">Career Roadmap</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Interactive flowchart. Click a node to see details.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          {recsLoading ? (
            <p className="text-gray-400 text-center">Loading roadmap...</p>
          ) : (
            roadMapItems
          )}
        </CardContent>
      </Card>

      {/* Scholarships */}
      <Card className="rounded-3xl border-gray-200 shadow-md transition-transform duration-300 hover:scale-[1.01]">
        <CardHeader className="p-8">
          <CardTitle className="text-xl font-bold text-gray-900">Scholarships</CardTitle>
          <CardDescription className="text-sm text-gray-500">Handpicked opportunities for you</CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8 space-y-4">
          {staticScholarships.map((s) => {
            const left = daysLeft(s.deadline);
            const urgent = left <= 7;
            return (
              <div key={s.title} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight truncate text-gray-800">{s.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <Badge variant="outline" className="rounded-full px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200">{s.tag}</Badge>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />{" "}
                      {new Date(s.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  <Badge className={urgent ? "bg-red-500 text-white rounded-full px-3 py-1 text-xs font-semibold" : "bg-amber-500 text-white rounded-full px-3 py-1 text-xs font-semibold"}>
                    {left > 0 ? `${left} days left` : "Closed"}
                  </Badge>
                </div>
              </div>
            );
          })}
          <Button asChild variant="outline" className="mt-4 w-full rounded-full px-6 py-2">
            <Link to="/scholarships">View all scholarships</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Reminders */}
      <Card className="rounded-3xl border-gray-200 shadow-md transition-transform duration-300 hover:scale-[1.01]">
        <CardHeader className="p-8">
          <CardTitle className="text-xl font-bold text-gray-900">Reminders</CardTitle>
          <CardDescription className="text-sm text-gray-500">Stay on top of deadlines</CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8 space-y-4">
          {staticReminders.map((r) => {
            const left = daysLeft(r.due);
            const urgent = left <= 7;
            return (
              <div key={r.id} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-2 rounded-full bg-gray-100 text-gray-500">
                    <Bell className="h-5 w-5" />
                  </div>
                  <span className="truncate text-gray-800 font-medium">{r.title}</span>
                </div>
                <div className="text-sm">
                  <Badge variant="outline" className={urgent ? "bg-red-500 text-white rounded-full px-3 py-1 text-xs font-semibold" : "bg-gray-500 text-white rounded-full px-3 py-1 text-xs font-semibold"}>
                    {left > 0 ? `${left} days` : "Today"}
                  </Badge>
                </div>
              </div>
            );
          })}
          <Button asChild variant="outline" className="mt-4 w-full rounded-full px-6 py-2">
            <Link to="/notifications">View all reminders</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}