
// // import { Badge } from "@/components/ui/badge";
// // import { useEffect, useMemo, useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// // import { Progress } from "@/components/ui/progress";
// // import { Briefcase, BookOpenCheck, CalendarDays, GraduationCap, School, Sparkles } from "lucide-react";

// // type Profile = {
// //   id?: number;
// //   name?: string;
// //   email?: string;
// //   dob?: string;
// //   gender?: string;
// //   location?: string;
// //   educationLevel?: string;
// //   interests?: string[];
// //   skills?: string[];
// // };

// // type QuizResult = {
// //   stream?: string;
// //   score?: number;
// //   strengths?: string[];
// //   weaknesses?: string[];
// // };

// // type College = {
// //   id: number;
// //   name: string;
// //   location?: string;
// //   courses?: string[];
// // };

// // type Deadline = {
// //   title: string;
// //   date: string;
// //   urgency: "high" | "medium" | "low";
// // };

// // type Scholarship = {
// //   name: string;
// //   deadline: string;
// // };

// // export default function Dashboard() {
// //   const [profile, setProfile] = useState<Profile | null>(null);
// //   const [quiz, setQuiz] = useState<QuizResult | null>(null);
// //   const [colleges, setColleges] = useState<College[]>([]);
// //   const [deadlines, setDeadlines] = useState<Deadline[]>([]);
// //   const [scholarships, setScholarships] = useState<Scholarship[]>([]);

// //   // Compute profile completion
// //   const completion = useMemo(() => {
// //     const p = profile || {};
// //     const flags = [
// //       !!p.name,
// //       !!p.email,
// //       !!p.gender,
// //       !!p.educationLevel,
// //       !!p.location,
// //       (p.interests || []).length > 0,
// //       !!quiz?.stream,
// //     ];
// //     const filled = flags.reduce((acc, v) => acc + (v ? 1 : 0), 0);
// //     return Math.round((filled / flags.length) * 100);
// //   }, [profile, quiz]);

// //   // Load profile and quiz data
// //   useEffect(() => {
// //     try {
// //       const storedProfile = localStorage.getItem("novapath_profile");
// //       if (storedProfile) setProfile(JSON.parse(storedProfile));

// //       // Fetch latest quiz result from backend if profile exists
// //       const fetchQuiz = async (userId?: number) => {
// //         if (!userId) return;
// //         try {
// //           const res = await fetch(`http://localhost:4000/quiz/result?userId=${userId}`);
// //           // console.log("res",res)
// //           if (!res.ok) throw new Error("Failed to fetch quiz result");
// //           const data = await res.json();
// //           console.log(data)
// //           setQuiz(data);
// //         } catch (err) {
// //           console.error("Failed to load quiz result:", err);
// //           // fallback to localStorage
// //           const storedQuiz = localStorage.getItem("novapath_quiz_result");
// //           if (storedQuiz) setQuiz(JSON.parse(storedQuiz));
// //         }
// //       };
// //       fetchQuiz(profile?.id);

// //       // Fetch colleges, deadlines, scholarships
// //       const fetchData = async () => {
// //         const [collegesRes, deadlinesRes, scholarshipsRes] = await Promise.all([
// //           fetch("http://localhost:4000/colleges"),
// //           fetch("http://localhost:4000/deadlines"),
// //           fetch("http://localhost:4000/scholarships"),
// //         ]);
// //         setColleges(await collegesRes.json());
// //         setDeadlines(await deadlinesRes.json());
// //         setScholarships(await scholarshipsRes.json());
// //       };
// //       fetchData();
// //     } catch (err) {
// //       console.error("Failed to load dashboard data:", err);
// //     }
// //   }, [profile?.id]);

// //   const courses = useMemo(() => {
// //     const i = new Set((profile?.interests || []).map((s) => s.toLowerCase()));
// //     const out: string[] = [];
// //     if (i.has("science")) out.push("B.Sc Physics", "B.Sc Biology");
// //     if (i.has("medicine")) out.push("MBBS", "B.Pharm");
// //     return out.length ? out : ["B.Sc Computer Science", "B.Com (Hons)"];
// //   }, [profile]);

// //   const careers = useMemo(() => {
// //     const i = new Set((profile?.interests || []).map((s) => s.toLowerCase()));
// //     const out: string[] = [];
// //     if (i.has("science")) out.push("Research Scientist", "Data Analyst");
// //     if (i.has("medicine")) out.push("Doctor", "Pharmacist");
// //     return out.length ? out : ["AI Engineer", "Business Analyst"];
// //   }, [profile]);

// //   const materials = useMemo(() => {
// //     const i = new Set((profile?.interests || []).map((s) => s.toLowerCase()));
// //     const out: { title: string }[] = [];
// //     if (i.has("science")) out.push({ title: "Physics Crash Course" });
// //     if (i.has("medicine")) out.push({ title: "Anatomy Basics" });
// //     if (!out.length) out.push({ title: "Study Tips: Time Management" });
// //     return out;
// //   }, [profile]);

// //   return (
// //     <div className="mt-20 space-y-8">
// //       {profile && (
// //         <Card>
// //           <CardContent className="py-5 flex flex-wrap items-center justify-between gap-6">
// //             <div>
// //               <p className="text-base font-semibold">Hi {profile.name?.split(" ")[0]} 👋</p>
// //               <p className="text-sm text-muted-foreground">Your career roadmap awaits</p>

// //               {/* Quiz Result */}
// //               {quiz?.stream && (
// //                 <div className="mt-2 space-y-1">
// //                   <p className="text-sm">
// //                     <span className="font-medium">Suggested Stream:</span> {quiz.stream} ·{" "}
// //                     <span className="text-muted-foreground">{quiz.score}% match</span>
// //                   </p>
// //                   {quiz.strengths && quiz.strengths.length > 0 && (
// //                     <p className="text-sm text-success">
// //                       <span className="font-medium">Strengths:</span> {quiz.strengths.join(", ")}
// //                     </p>
// //                   )}
// //                   {quiz.weaknesses && quiz.weaknesses.length > 0 && (
// //                     <p className="text-sm text-destructive">
// //                       <span className="font-medium">Weaknesses:</span> {quiz.weaknesses.join(", ")}
// //                     </p>
// //                   )}
// //                 </div>
// //               )}
// //             </div>

// //             <div className="min-w-[260px]">
// //               <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
// //                 <span>Profile Progress</span>
// //                 <span>{completion}%</span>
// //               </div>
// //               <Progress value={completion} />
// //             </div>

// //             {profile.interests?.length > 0 && (
// //               <div className="flex flex-wrap gap-2">
// //                 {profile.interests.slice(0, 5).map((t) => (
// //                   <Badge key={t} variant="outline">{t}</Badge>
// //                 ))}
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>
// //       )}

// //       {/* Quick Actions / Highlights can go here */}

// //     </div>
// //   );
// // }
// import { Badge } from "@/components/ui/badge";
// import { useEffect, useMemo, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Briefcase, BookOpenCheck, CalendarDays, GraduationCap, School, Sparkles } from "lucide-react";

// type Profile = {
//   id?: number;
//   name?: string;
//   email?: string;
//   dob?: string;
//   gender?: string;
//   location?: string;
//   educationLevel?: string;
//   interests?: string[];
//   skills?: string[];
// };

// type QuizResult = {
//   stream?: string;
//   score?: number;
//   strengths?: string[];
//   weaknesses?: string[];
// };

// type College = {
//   id: number;
//   name: string;
//   location?: string;
//   courses?: string[];
// };

// type Recommendation = {
//   careerId: number;
//   careerName: string;
//   score: number;
//   matchedSkills: string[];
// };

// type Deadline = {
//   title: string;
//   date: string;
//   urgency: "high" | "medium" | "low";
// };

// type Scholarship = {
//   name: string;
//   deadline: string;
// };

// export default function Dashboard() {
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [quiz, setQuiz] = useState<QuizResult | null>(null);
//   const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
//   const [colleges, setColleges] = useState<College[]>([]);
//   const [deadlines, setDeadlines] = useState<Deadline[]>([]);
//   const [scholarships, setScholarships] = useState<Scholarship[]>([]);

//   // Compute profile completion
//   const completion = useMemo(() => {
//     const p = profile || {};
//     const flags = [
//       !!p.name,
//       !!p.email,
//       !!p.gender,
//       !!p.educationLevel,
//       !!p.location,
//       (p.interests || []).length > 0,
//       !!quiz?.stream,
//     ];
//     const filled = flags.reduce((acc, v) => acc + (v ? 1 : 0), 0);
//     return Math.round((filled / flags.length) * 100);
//   }, [profile, quiz]);

//   useEffect(() => {
//     try {
//       const storedProfile = localStorage.getItem("novapath_profile");
//       if (storedProfile) setProfile(JSON.parse(storedProfile));

//       const fetchData = async (userId?: number) => {
//         if (!userId) return;

//         // Fetch quiz result
//         try {
//           const res = await fetch(`http://localhost:4000/quiz/result?userId=${userId}`);
//           if (res.ok) {
//             const data = await res.json();
//             setQuiz(data);
//           }
//         } catch (err) {
//           console.error("Failed to fetch quiz result:", err);
//         }

//         // Fetch recommendations
//         try {
//           const recRes = await fetch(`http://localhost:4000/recommendations/${userId}`);
//         console.log(recRes)
//           if (recRes.ok) {
//             const data = await recRes.json();
//             console.log(data)
//             setRecommendations(data.recommendations);
//           }
//         } catch (err) {
//           console.error("Failed to fetch recommendations:", err);
//         }

//         // Fetch other dashboard data
//         try {
//           const [collegesRes, deadlinesRes, scholarshipsRes] = await Promise.all([
//             fetch("http://localhost:4000/colleges"),
//             fetch("http://localhost:4000/deadlines"),
//             fetch("http://localhost:4000/scholarships"),
//           ]);
//           setColleges(await collegesRes.json());
//           setDeadlines(await deadlinesRes.json());
//           setScholarships(await scholarshipsRes.json());
//         } catch (err) {
//           console.error("Failed to fetch dashboard data:", err);
//         }
//       };

//       fetchData(JSON.parse(storedProfile || "{}")?.id);
//     } catch (err) {
//       console.error("Dashboard load error:", err);
//     }
//   }, []);

//   return (
//     <div className="mt-20 space-y-8">
//       {/* Profile Card */}
//       {profile && (
//         <Card>
//           <CardContent className="py-5 flex flex-wrap items-center justify-between gap-6">
//             <div>
//               <p className="text-base font-semibold">Hi {profile.name?.split(" ")[0]} 👋</p>
//               <p className="text-sm text-muted-foreground">Your career roadmap awaits</p>

//               {/* Quiz Result */}
//               {quiz?.stream && (
//                 <div className="mt-2 space-y-1">
//                   <p className="text-sm">
//                     <span className="font-medium">Suggested Stream:</span> {quiz.stream} ·{" "}
//                     <span className="text-muted-foreground">{quiz.score}% match</span>
//                   </p>
//                   {quiz.strengths?.length > 0 && (
//                     <p className="text-sm text-success">
//                       <span className="font-medium">Strengths:</span> {quiz.strengths.join(", ")}
//                     </p>
//                   )}
//                   {quiz.weaknesses?.length > 0 && (
//                     <p className="text-sm text-destructive">
//                       <span className="font-medium">Weaknesses:</span> {quiz.weaknesses.join(", ")}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="min-w-[260px]">
//               <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
//                 <span>Profile Progress</span>
//                 <span>{completion}%</span>
//               </div>
//               <Progress value={completion} />
//             </div>

//             {profile.interests?.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {profile.interests.slice(0, 5).map((t) => (
//                   <Badge key={t} variant="outline">{t}</Badge>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       {/* Recommendations */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Career Recommendations</CardTitle>
//           <CardDescription>Based on your profile, interests, and skills</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {recommendations.length === 0 && (
//             <CardContent className="text-center text-muted-foreground">
//               No recommendations available.
//             </CardContent>
//           )}
//           {recommendations.map((rec) => (
//             <div key={rec.careerId} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-2 last:border-b-0">
//               <div>
//                 <p className="font-medium">{rec.careerName}</p>
//                 {rec.matchedSkills.length > 0 && (
//                   <p className="text-sm text-muted-foreground">
//                     Matched Skills: {rec.matchedSkills.join(", ")}
//                   </p>
//                 )}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Progress value={rec.score} className="w-36" />
//                 <span className="text-sm font-medium">{rec.score}%</span>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Colleges */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Colleges</CardTitle>
//           <CardDescription>Explore available colleges</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {colleges.length === 0 && (
//             <CardContent className="text-center text-muted-foreground">
//               No colleges found.
//             </CardContent>
//           )}
//           {colleges.map((c) => (
//             <div key={c.id} className="flex justify-between items-center gap-2 border-b pb-2 last:border-b-0">
//               <p className="font-medium">{c.name}</p>
//               <Badge>{c.location}</Badge>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Deadlines */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Deadlines</CardTitle>
//           <CardDescription>Upcoming important dates</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {deadlines.length === 0 && (
//             <CardContent className="text-center text-muted-foreground">
//               No deadlines available.
//             </CardContent>
//           )}
//           {deadlines.map((d, i) => (
//             <div key={i} className="flex justify-between items-center gap-2 border-b pb-2 last:border-b-0">
//               <p>{d.title}</p>
//               <span>{new Date(d.date).toLocaleDateString()}</span>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Scholarships */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Scholarships</CardTitle>
//           <CardDescription>Available scholarships</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {scholarships.length === 0 && (
//             <CardContent className="text-center text-muted-foreground">
//               No scholarships available.
//             </CardContent>
//           )}
//           {scholarships.map((s, i) => (
//             <div key={i} className="flex justify-between items-center gap-2 border-b pb-2 last:border-b-0">
//               <p>{s.name}</p>
//               <span>{new Date(s.deadline).toLocaleDateString()}</span>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    const flags = [
      !!p.name,
      (p.interests || []).length > 0,
      !!quiz?.stream,
    ];
    const filled = flags.reduce((acc, v) => acc + (v ? 1 : 0), 0);
    return Math.round((filled / flags.length) * 100);
  }, [profile, quiz]);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("novapath_profile");
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);

        const userId = parsedProfile.id;

        // Fetch quiz result
        fetch(`http://localhost:4000/quiz/result?userId=${userId}`)
          .then(res => res.json())
          .then(data => setQuiz(data))
          .catch(err => console.error(err));

        // Fetch recommendations
        fetch(`http://localhost:4000/recommendations/${userId}`)
          .then(res => res.json())
          .then(data => setRecommendations(data.recommendations || []))
          .catch(err => console.error(err));
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
              <p className="text-base font-semibold">Hi {profile.name?.split(" ")[0]} 👋</p>
              <p className="text-sm text-muted-foreground">Your career roadmap awaits</p>
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
                {profile.interests.map(t => (
                  <Badge key={t} variant="outline">{t}</Badge>
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
          <CardDescription>Based on your profile and assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.length === 0 ? (
            <p className="text-muted-foreground text-center">No recommendations available yet.</p>
          ) : (
            recommendations.map((rec, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-2 last:border-b-0">
                <div>
                  <p className="font-medium">{rec.title}</p>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
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
