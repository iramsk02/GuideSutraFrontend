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
    <div className="space-y-6 mt-20 ml-60">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Resources</CardTitle>
          <CardDescription>
            E-books, study materials, and skill courses tailored to you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {materials.map((m) => (
              <Card key={m.title} className="hover:shadow-sm">
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline">{m.tag}</Badge>
                  </div>
                  <p className="font-medium">{m.title}</p>
                  <div className="mt-3">
                    <Button size="sm">Open</Button>
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
