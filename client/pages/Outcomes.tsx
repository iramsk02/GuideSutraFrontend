import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Profile { name?: string; interests?: string[]; }

export default function Outcomes() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [result, setResult] = useState<{ stream?: string; score?: number } | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("novapath_profile");
      if (raw) setProfile(JSON.parse(raw));
      const rr = localStorage.getItem("novapath_quiz_result");
      if (rr) setResult(JSON.parse(rr));
    } catch {}
  }, []);

  return (
    <div className="space-y-6 mt-20">
      <Card>
        <CardHeader>
          <CardTitle>Student Outcomes</CardTitle>
          <CardDescription>Your personalized direction and saved progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="font-medium mb-1">Stream & Subjects</h3>
            <p className="text-sm">Suggested Stream: <span className="font-medium">{result?.stream || "Take the quiz"}</span> {result?.score ? <span className="text-muted-foreground">({result.score}% match)</span> : null}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["Mathematics", "Physics", "Economics", "Psychology"]).map((s) => (
                <Badge key={s} variant="outline">{s}</Badge>
              ))}
            </div>
            <div className="mt-3"><Link to="/career-quiz"><Button variant="outline">Retake Quiz</Button></Link></div>
          </section>

          <section>
            <h3 className="font-medium mb-1">College Shortlist</h3>
            <p className="text-sm text-muted-foreground">View and manage in your dashboard</p>
            <div className="mt-2"><Link to="/dashboard"><Button variant="outline">Open Dashboard</Button></Link></div>
          </section>

          <section>
            <h3 className="font-medium mb-1">Timeline of Important Dates</h3>
            <p className="text-sm text-muted-foreground">Track deadlines and exam dates</p>
            <div className="mt-2"><Link to="/timeline"><Button variant="outline">Open Timeline</Button></Link></div>
          </section>

          <section>
            <h3 className="font-medium mb-1">Career Roadmap</h3>
            <p className="text-sm text-muted-foreground">Visualize degree to jobs and milestones</p>
            <div className="mt-2"><Link to="/career-pathway"><Button>View Roadmap</Button></Link></div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
