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
import { BookOpen, Sparkles } from "lucide-react";
import { getProfile, getQuizResult } from "../lib/user";

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
    <div className="space-y-12 px-4 md:px-8 mt-20">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Learning Resources</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Access curated study materials, e-books, and skill courses tailored to your interests and career goals.
        </p>
      </div>
      
      <Card className="rounded-3xl shadow-xl border-gray-200">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="flex items-center gap-4 text-2xl font-bold text-gray-900">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            Recommended Resources
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            E-books, study materials, and skill courses tailored to your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {materials.map((m, index) => (
              <Card 
                key={m.title} 
                className="rounded-3xl shadow-md border-gray-200 transition-transform duration-300 hover:scale-[1.03]" 
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 font-medium rounded-full px-2 py-1">{m.tag}</Badge>
                    <Sparkles className="h-4 w-4 text-amber-500" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4 leading-tight">{m.title}</h3>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-full">
                    Open Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}