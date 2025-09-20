import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

interface Profile {
  interests?: string[];
}

export default function Resources() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quiz, setQuiz] = useState<{ stream?: string } | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("novapath_profile");
      if (raw) setProfile(JSON.parse(raw));
      const rr = localStorage.getItem("novapath_quiz_result");
      if (rr) setQuiz(JSON.parse(rr));
    } catch {}
  }, []);

  const materials = useMemo(() => {
    const tags = new Set([
      ...(profile?.interests || []).map((s) => s.toLowerCase()),
      (quiz?.stream || "").toLowerCase(),
    ]);
    const out: { title: string; tag: string }[] = [];
    if (tags.has("science") || tags.has("pcm"))
      out.push({ title: "Physics Crash Course (PDF)", tag: "Science" });
    if (tags.has("commerce") || tags.has("mba"))
      out.push({ title: "Accounting Basics (e-book)", tag: "Commerce" });
    if (tags.has("arts"))
      out.push({ title: "Design Thinking 101 (video)", tag: "Arts" });
    if (!out.length)
      out.push({ title: "Study Tips: Time Management", tag: "General" });
    return out;
  }, [profile, quiz]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Learning Resources</h1>
        <p className="page-description">
          Access curated study materials, e-books, and skill courses tailored to your interests and career goals.
        </p>
      </div>

      <Card className="card-hover animate-slide-up">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-sm">📚</span>
            </div>
            Recommended Resources
          </CardTitle>
          <CardDescription>
            E-books, study materials, and skill courses tailored to your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {materials.map((m, index) => (
              <Card key={m.title} className="card-hover animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs">{m.tag}</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-3 leading-tight">{m.title}</h3>
                  <div className="mt-4">
                    <Button size="sm" className="gradient-primary hover:opacity-90 w-full">
                      Open Resource
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
