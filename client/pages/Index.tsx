
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Profile = {
  id?: number;
  name?: string;
  interests?: string[];
};

type QuizResult = {
  stream?: string;
  score?: number;
};

type Recommendation = {
  title: string;
  description: string;
  score: number;
};

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quiz, setQuiz] = useState<QuizResult | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

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

        // Load quiz result from local storage (avoid external fetch in client)
        try {
          const rawQuiz = localStorage.getItem("novapath_quiz_result");
          if (rawQuiz) setQuiz(JSON.parse(rawQuiz));
        } catch {}

        // Derive simple recommendations locally
        const recs: Recommendation[] = [];
        if (parsedProfile?.interests?.length) {
          const ints = parsedProfile.interests.map((s: string) =>
            s.toLowerCase(),
          );
          if (ints.includes("biology") || ints.includes("healthcare")) {
            recs.push({
              title: "Medical Path",
              description: "Explore MBBS, B.Pharm, and allied health sciences.",
              score: 88,
            });
          }
          if (
            ints.includes("computer science") ||
            ints.includes("mathematics") ||
            ints.includes("robotics")
          ) {
            recs.push({
              title: "Software & Engineering",
              description:
                "Consider B.Tech (CSE), AI/ML tracks, and internships.",
              score: 92,
            });
          }
        }
        setRecommendations(recs);
      }
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  }, []);

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

      {/* Recommendations Card */}
      <Card>
        <CardHeader>
          <CardTitle>Career Recommendations</CardTitle>
          <CardDescription>
            Based on your profile and assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No recommendations available yet.
            </p>
          ) : (
            recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-2 last:border-b-0"
              >
                <div>
                  <p className="font-medium">{rec.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {rec.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={rec.score} className="w-36" />
                  <span className="text-sm font-medium">{rec.score}%</span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
