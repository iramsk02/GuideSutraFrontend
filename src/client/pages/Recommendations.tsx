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
import { Link } from "react-router-dom";

interface Profile {
  interests?: string[];
  location?: string;
}

export default function Recommendations() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("novapath_profile");
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);

  const courses = useMemo(() => {
    const i = new Set((profile?.interests || []).map((s) => s.toLowerCase()));
    const out: string[] = [];
    if (i.has("science")) out.push("B.Sc Physics", "B.Sc Biology");
    if (i.has("engineering") || i.has("computer science"))
      out.push("B.Tech CSE", "B.Tech ECE");
    if (i.has("commerce") || i.has("business")) out.push("B.Com (Hons)", "BBA");
    if (i.has("arts")) out.push("B.A Psychology", "B.A Economics");
    if (!out.length) out.push("B.Sc Computer Science");
    return out;
  }, [profile]);

  return (
    <div className="space-y-6 mt-20">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>Based on your profile and interests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="font-medium mb-2">Suggested Courses</h3>
            <div className="flex flex-wrap gap-2">
              {courses.map((c) => (
                <Badge key={c} variant="secondary" className="rounded-full">
                  {c}
                </Badge>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-medium mb-2">Colleges near you</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Location: {profile?.location || "Not set"}
            </p>
            <Link to="/colleges">
              <Button variant="outline">Browse Colleges</Button>
            </Link>
          </section>

          <section>
            <h3 className="font-medium mb-2">Career Paths</h3>
            <div className="flex flex-wrap gap-2">
              {["AI Engineer", "Business Analyst", "UX Designer"].map((c) => (
                <Badge key={c} variant="outline">
                  {c}
                </Badge>
              ))}
            </div>
            <div className="mt-3">
              <Link to="/career-pathway">
                <Button>Explore Paths</Button>
              </Link>
            </div>
          </section>

          <section>
            <h3 className="font-medium mb-2">Study Materials</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Physics Crash Course</li>
              <li>Intro to Programming with Python</li>
              <li>Design Thinking 101</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
