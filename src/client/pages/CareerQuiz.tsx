// // import { useEffect, useMemo, useRef, useState } from "react";
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// //   CardDescription,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Progress } from "@/components/ui/progress";
// // import { Badge } from "@/components/ui/badge";
// // import { toast } from "sonner";
// // import { ArrowLeft, ArrowRight, Brain } from "lucide-react";

// // // Types
// // type QType = "mcq" | "order";
// // interface Question {
// //   id: string;
// //   type: QType;
// //   prompt: string;
// //   options: string[];
// // }

// // const LIKERT = ["Strongly agree", "Agree", "Neutral", "Disagree"] as const;

// // const QUESTIONS: Question[] = [
// //   {
// //     id: "lab_work",
// //     type: "mcq",
// //     prompt: "You enjoy hands-on experiments and lab-based activities.",
// //     options: [...LIKERT],
// //   },
// //   {
// //     id: "scientific_knowledge",
// //     type: "mcq",
// //     prompt:
// //       "You like learning scientific concepts and reading science articles.",
// //     options: [...LIKERT],
// //   },
// //   {
// //     id: "analytical_thinking",
// //     type: "mcq",
// //     prompt: "You enjoy analyzing graphs/data to find patterns and insights.",
// //     options: [...LIKERT],
// //   },
// //   {
// //     id: "problem_solving",
// //     type: "mcq",
// //     prompt: "You like solving complex, multi-step problems.",
// //     options: [...LIKERT],
// //   },
// //   {
// //     id: "programming",
// //     type: "mcq",
// //     prompt: "You are interested in programming or have written code before.",
// //     options: [...LIKERT],
// //   },
// //   {
// //     id: "logical_thinking",
// //     type: "mcq",
// //     prompt: "You enjoy logic puzzles and structured thinking.",
// //     options: [...LIKERT],
// //   },
// // ];

// // function likertScore(choice: string): number {
// //   const idx = LIKERT.indexOf(choice as any);
// //   return idx === -1 ? 0 : Math.max(0, 3 - idx);
// // }

// // function mapToStream(answers: Record<string, string | string[]>): {
// //   stream: string;
// //   score: number;
// // } {
// //   const apiUrl = import.meta.env.VITE_API_URL;

// //   const skillScores = {
// //     lab_work: 0,
// //     scientific_knowledge: 0,
// //     analytical_thinking: 0,
// //     problem_solving: 0,
// //     programming: 0,
// //     logical_thinking: 0,
// //   } as Record<string, number>;

// //   Object.entries(answers).forEach(([qid, ans]) => {
// //     if (typeof ans === "string" && qid in skillScores)
// //       skillScores[qid] = likertScore(ans);
// //   });

// //   const weights: Record<string, Record<string, number>> = {
// //     Science: {
// //       lab_work: 0.35,
// //       scientific_knowledge: 0.35,
// //       analytical_thinking: 0.15,
// //       logical_thinking: 0.15,
// //       problem_solving: 0.15,
// //       programming: 0.15,
// //     },
// //     "Science with Biology": {
// //       lab_work: 0.45,
// //       scientific_knowledge: 0.45,
// //       problem_solving: 0.1,
// //       analytical_thinking: 0.1,
// //     },
// //     Commerce: {
// //       analytical_thinking: 0.4,
// //       problem_solving: 0.35,
// //       logical_thinking: 0.25,
// //     },
// //     Arts: { logical_thinking: 0.2 },
// //   };

// //   const scores: Record<string, number> = {};
// //   const maxPerStream: Record<string, number> = {};
// //   Object.entries(weights).forEach(([stream, w]) => {
// //     let s = 0,
// //       max = 0;
// //     Object.entries(w).forEach(([k, weight]) => {
// //       s += (skillScores[k] || 0) * weight;
// //       max += 3 * weight;
// //     });
// //     scores[stream] = s;
// //     maxPerStream[stream] = max;
// //   });

// //   const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
// //   const [topStream, topScore] = sorted[0];
// //   const percent = Math.round(
// //     Math.min(97, (topScore / Math.max(0.001, maxPerStream[topStream])) * 100),
// //   );
// //   return { stream: topStream, score: percent };
// // }

// // function useConfetti(active: boolean) {
// //   const ref = useRef<HTMLDivElement | null>(null);
// //   useEffect(() => {
// //     if (!active || !ref.current) return;
// //     const colors = ["#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"];
// //     const el = ref.current;
// //     el.innerHTML = "";
// //     const N = 80;
// //     for (let i = 0; i < N; i++) {
// //       const span = document.createElement("span");
// //       span.className = "absolute block w-1.5 h-3";
// //       span.style.left = Math.random() * 100 + "%";
// //       span.style.top = "-10px";
// //       span.style.background = colors[Math.floor(Math.random() * colors.length)];
// //       span.style.opacity = String(0.7 + Math.random() * 0.3);
// //       span.style.transform = `rotate(${Math.random() * 360}deg)`;
// //       span.style.borderRadius = "2px";
// //       const dur = 3000 + Math.random() * 3000;
// //       span.animate(
// //         [
// //           { transform: span.style.transform, top: "-10px" },
// //           { transform: span.style.transform, top: "110%" },
// //         ],
// //         {
// //           duration: dur,
// //           easing: "cubic-bezier(.2,.6,.2,1)",
// //           iterations: 1,
// //           delay: Math.random() * 800,
// //         },
// //       ).onfinish = () => span.remove();
// //       el.appendChild(span);
// //     }
// //   }, [active]);
// //   return ref;
// // }

// // export default function CareerQuiz() {
// //   const apiUrl = import.meta.env.VITE_API_URL;

// //   const [index, setIndex] = useState(0);
// //   const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
// //   const [order, setOrder] = useState<string[]>(
// //     QUESTIONS.find((q) => q.type === "order")?.options || [],
// //   );
// //   const [recommendations, setRecommendations] = useState<
// //     { title: string; description: string; score: number }[]
// //   >([]);
// //   const [saving, setSaving] = useState(false);
// //   const [saved, setSaved] = useState(false);
// //   const total = QUESTIONS.length;
// //   const current = QUESTIONS[index];
// //   const percent = Math.round((index / total) * 100);
// //   const done = index >= total;

// //   const tips = [
// //     "Tip: There’s no wrong answer—go with your first instinct!",
// //     "Growth Mindset: Skills improve with practice.",
// //     "Explore: Try clubs or mini-projects to learn faster.",
// //   ];
// //   const tip = tips[index % tips.length];

// //   const profileData = useMemo(() => {
// //     try {
// //       const stored = localStorage.getItem("novapath_profile");
// //       return stored ? JSON.parse(stored) : null;
// //     } catch {
// //       return null;
// //     }
// //   }, []);

// //   const result = useMemo(
// //     () => (done ? mapToStream(answers) : null),
// //     [done, answers],
// //   );
// //   const confettiRef = useConfetti(!!done);

// //   useEffect(() => {
// //     if (!done) return;
// //     const recs: { title: string; description: string; score: number }[] = [];
// //     const ints = (profileData?.interests || []).map((s: string) =>
// //       s.toLowerCase(),
// //     );
// //     if (ints.includes("biology") || ints.includes("healthcare")) {
// //       recs.push({
// //         title: "Medical Path",
// //         description: "Explore MBBS, B.Pharm, and allied health sciences.",
// //         score: 88,
// //       });
// //     }
// //     if (
// //       ints.includes("computer science") ||
// //       ints.includes("mathematics") ||
// //       ints.includes("robotics")
// //     ) {
// //       recs.push({
// //         title: "Software & Engineering",
// //         description: "Consider B.Tech (CSE), AI/ML tracks, and internships.",
// //         score: 92,
// //       });
// //     }
// //     if (result?.stream === "Commerce") {
// //       recs.push({
// //         title: "Business & Finance",
// //         description: "Look into B.Com, CA/CS tracks, and analytics.",
// //         score: 85,
// //       });
// //     }
// //     setRecommendations(recs);
// //   }, [done, profileData, result]);

// //   function select(option: string) {
// //     if (current.type === "mcq")
// //       setAnswers((a) => ({ ...a, [current.id]: option }));
// //   }

// //   function next() {
// //     if (current && current.type === "mcq" && !answers[current.id]) {
// //       toast("Please select an answer to continue");
// //       return;
// //     }
// //     if (current && current.type === "order")
// //       setAnswers((a) => ({ ...a, [current.id]: order }));
// //     setIndex((i) => Math.min(i + 1, total));
// //   }
// //   function back() {
// //     setIndex((i) => Math.max(0, i - 1));
// //   }

// //   // Auto-save on completion
// //   useEffect(() => {
// //     if (done && !saved) {
// //       void saveAssessment();
// //     }
// //   }, [done, saved]);

// //   async function saveAssessment() {
// //     if (!result) return;
// //     setSaving(true);

// //     const strengths = Object.entries(answers)
// //       .filter(([_, val]) => likertScore(val as string) >= 2)
// //       .map(([k]) => k);
// //     const weaknesses = Object.entries(answers)
// //       .filter(([_, val]) => likertScore(val as string) <= 1)
// //       .map(([k]) => k);

// //     try {
// //       localStorage.setItem("novapath_quiz_result", JSON.stringify(result));
// //       localStorage.setItem(
// //         "novapath_recommendations",
// //         JSON.stringify(recommendations),
// //       );
// //     } catch {}

// //     if (profileData?.id && apiUrl) {
// //       try {
// //         const res = await fetch(`${apiUrl}/assessments`, {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             userId: profileData.id,
// //             score: result.score,
// //             strengths,
// //             weaknesses,
// //           }),
// //         });
// //         if (!res.ok) throw new Error("Failed to save assessment");
// //         setSaved(true);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     }

// //     try {
// //       toast.success("Assessment saved!");
// //     } catch {}
// //     setSaving(false);
// //   }

// //   return (
// //     <div className="min-h-[calc(100vh-3.5rem)] mt-20">
// //       <div className="sticky top-0 z-10 mb-4 bg-background/80 backdrop-blur border rounded-md">
// //         <div className="flex items-center justify-between p-3">
// //           <div className="flex items-center gap-2">
// //             <Brain className="text-primary" />{" "}
// //             <span className="font-semibold">NovaPath Quiz</span>
// //           </div>
// //           <div className="min-w-[220px]">
// //             <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
// //               <span>Progress</span>
// //               <span>{percent}% Completed</span>
// //             </div>
// //             <Progress value={percent} />
// //           </div>
// //         </div>
// //       </div>

// //       {!done ? (
// //         <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
// //           <Card className="shadow-sm">
// //             <CardHeader className="pb-2">
// //               <CardTitle>
// //                 Question {index + 1} of {total}
// //               </CardTitle>
// //               <CardDescription>{tip}</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <p className="mb-4">{current.prompt}</p>
// //               {current.type === "mcq" && (
// //                 <div className="grid gap-2">
// //                   {current.options.map((opt) => (
// //                     <Button
// //                       key={opt}
// //                       variant={
// //                         answers[current.id] === opt ? "default" : "outline"
// //                       }
// //                       onClick={() => select(opt)}
// //                       className="justify-start"
// //                     >
// //                       {opt}
// //                     </Button>
// //                   ))}
// //                 </div>
// //               )}
// //             </CardContent>
// //             <div className="flex justify-between p-3">
// //               <Button variant="outline" onClick={back} disabled={index === 0}>
// //                 <ArrowLeft /> Back
// //               </Button>
// //               <Button onClick={next}>
// //                 Next <ArrowRight />
// //               </Button>
// //             </div>
// //           </Card>
// //         </div>
// //       ) : (
// //         <div className="relative text-center py-10">
// //           <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
// //           <div className="mb-4 flex justify-center items-center gap-2 flex-wrap">
// //             <span>
// //               You scored {result.score}% and your recommended stream is
// //             </span>
// //             <Badge variant="outline">{result.stream}</Badge>
// //           </div>
// //           <Button onClick={saveAssessment} disabled={saving || saved}>
// //             {saving ? "Saving..." : saved ? "Saved" : "Save Assessment"}
// //           </Button>
// //           <div className="mt-8 max-w-2xl mx-auto">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Career Recommendations</CardTitle>
// //                 <CardDescription>
// //                   Based on your answers and interests
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 {recommendations.length === 0 ? (
// //                   <p className="text-muted-foreground">
// //                     No recommendations available.
// //                   </p>
// //                 ) : (
// //                   recommendations.map((rec, idx) => (
// //                     <div
// //                       key={idx}
// //                       className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-2 last:border-b-0"
// //                     >
// //                       <div>
// //                         <p className="font-medium">{rec.title}</p>
// //                         <p className="text-sm text-muted-foreground">
// //                           {rec.description}
// //                         </p>
// //                       </div>
// //                       <div className="flex items-center gap-2">
// //                         <Progress value={rec.score} className="w-36" />
// //                         <span className="text-sm font-medium">
// //                           {rec.score}%
// //                         </span>
// //                       </div>
// //                     </div>
// //                   ))
// //                 )}
// //               </CardContent>
// //             </Card>
// //           </div>
// //           <div
// //             ref={confettiRef}
// //             className="absolute inset-0 pointer-events-none"
// //           ></div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import { useEffect, useMemo, useRef, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { toast } from "sonner";
// import { ArrowLeft, ArrowRight, Brain } from "lucide-react";

// // Types
// type QType = "mcq" | "order";
// interface Question {
//   id: string;
//   type: QType;
//   prompt: string;
//   options: string[];
// }

// const LIKERT = ["Strongly agree", "Agree", "Neutral", "Disagree"] as const;

// // Questions
// const QUESTIONS: Question[] = [
//   {
//     id: "lab_work",
//     type: "mcq",
//     prompt: "You enjoy hands-on experiments and lab-based activities.",
//     options: [...LIKERT],
//   },
//   {
//     id: "scientific_knowledge",
//     type: "mcq",
//     prompt: "You like learning scientific concepts and reading science articles.",
//     options: [...LIKERT],
//   },
//   {
//     id: "analytical_thinking",
//     type: "mcq",
//     prompt: "You enjoy analyzing graphs/data to find patterns and insights.",
//     options: [...LIKERT],
//   },
//   {
//     id: "problem_solving",
//     type: "mcq",
//     prompt: "You like solving complex, multi-step problems.",
//     options: [...LIKERT],
//   },
//   {
//     id: "programming",
//     type: "mcq",
//     prompt: "You are interested in programming or have written code before.",
//     options: [...LIKERT],
//   },
//   {
//     id: "logical_thinking",
//     type: "mcq",
//     prompt: "You enjoy logic puzzles and structured thinking.",
//     options: [...LIKERT],
//   },
// ];

// // Weighted streams
// const STREAMS = {
//   Engineering: {
//     problem_solving: 0.4,
//     programming: 0.4,
//     analytical_thinking: 0.2,
//   },
//   Medical: {
//     lab_work: 0.4,
//     scientific_knowledge: 0.4,
//     analytical_thinking: 0.2,
//   },
// };

// // Convert Likert choice to numeric score
// function likertScore(choice: string): number {
//   const idx = LIKERT.indexOf(choice as any);
//   return idx === -1 ? 0 : Math.max(0, 3 - idx);
// }

// // Map answers to a stream (Engineering or Medical)
// function mapToStream(answers: Record<string, string>): { stream: string; score: number } {
//   const skillScores: Record<string, number> = {};
//   Object.entries(answers).forEach(([qid, ans]) => {
//     skillScores[qid] = likertScore(ans);
//   });

//   const scores: Record<string, number> = {};
//   Object.entries(STREAMS).forEach(([stream, weights]) => {
//     let s = 0,
//       max = 0;
//     Object.entries(weights).forEach(([skill, weight]) => {
//       s += (skillScores[skill] || 0) * weight;
//       max += 3 * weight;
//     });
//     scores[stream] = Math.round((s / Math.max(0.001, max)) * 100);
//   });

//   const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
//   const [topStream, topScore] = sorted[0];
//   return { stream: topStream, score: topScore };
// }

// // Confetti effect
// function useConfetti(active: boolean) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   useEffect(() => {
//     if (!active || !ref.current) return;
//     const colors = ["#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"];
//     const el = ref.current;
//     el.innerHTML = "";
//     const N = 80;
//     for (let i = 0; i < N; i++) {
//       const span = document.createElement("span");
//       span.className = "absolute block w-1.5 h-3";
//       span.style.left = Math.random() * 100 + "%";
//       span.style.top = "-10px";
//       span.style.background = colors[Math.floor(Math.random() * colors.length)];
//       span.style.opacity = String(0.7 + Math.random() * 0.3);
//       span.style.transform = `rotate(${Math.random() * 360}deg)`;
//       span.style.borderRadius = "2px";
//       const dur = 3000 + Math.random() * 3000;
//       span.animate(
//         [
//           { transform: span.style.transform, top: "-10px" },
//           { transform: span.style.transform, top: "110%" },
//         ],
//         { duration: dur, easing: "cubic-bezier(.2,.6,.2,1)", iterations: 1, delay: Math.random() * 800 }
//       ).onfinish = () => span.remove();
//       el.appendChild(span);
//     }
//   }, [active]);
//   return ref;
// }

// export default function CareerQuiz() {
//   const apiUrl = import.meta.env.VITE_API_URL;

//   const [index, setIndex] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const total = QUESTIONS.length;
//   const current = QUESTIONS[index];
//   const percent = Math.round((index / total) * 100);
//   const done = index >= total;

//   const tips = [
//     "Tip: There’s no wrong answer—go with your first instinct!",
//     "Growth Mindset: Skills improve with practice.",
//     "Explore: Try clubs or mini-projects to learn faster.",
//   ];
//   const tip = tips[index % tips.length];

//   const profileData = useMemo(() => {
//     try {
//       const stored = localStorage.getItem("novapath_profile");
//       return stored ? JSON.parse(stored) : null;
//     } catch {
//       return null;
//     }
//   }, []);

//   const result = useMemo(() => (done ? mapToStream(answers) : null), [done, answers]);
//   const confettiRef = useConfetti(!!done);

//   function select(option: string) {
//     if (current.type === "mcq") setAnswers(a => ({ ...a, [current.id]: option }));
//   }

//   function next() {
//     if (!answers[current.id]) {
//       toast("Please select an answer to continue");
//       return;
//     }
//     setIndex(i => Math.min(i + 1, total));
//   }

//   function back() {
//     setIndex(i => Math.max(0, i - 1));
//   }

//   // Auto-save on completion
//   useEffect(() => {
//     if (done && !saved) {
//       void saveAssessment();
//     }
//   }, [done, saved]);

//   async function saveAssessment() {
//     if (!result || !profileData?.id) return;
//     setSaving(true);

//     const strengths = Object.entries(answers)
//       .filter(([_, val]) => likertScore(val) >= 2)
//       .map(([k]) => k);

//     const weaknesses = Object.entries(answers)
//       .filter(([_, val]) => likertScore(val) <= 1)
//       .map(([k]) => k);

//     try {
//       const res = await fetch(`${apiUrl}/assessments`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: profileData.id,
//           score: result.score,
//           stream: result.stream,
//           strengths,
//           weaknesses,
//         }),
//       });
//       if (!res.ok) throw new Error("Failed to save assessment");
//       setSaved(true);
//       toast.success("Assessment saved successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save assessment.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="min-h-[calc(100vh-3.5rem)] mt-20">
//       <div className="sticky top-0 z-10 mb-4 bg-background/80 backdrop-blur border rounded-md">
//         <div className="flex items-center justify-between p-3">
//           <div className="flex items-center gap-2">
//             <Brain className="text-primary" /> <span className="font-semibold">NovaPath Quiz</span>
//           </div>
//           <div className="min-w-[220px]">
//             <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
//               <span>Progress</span>
//               <span>{percent}% Completed</span>
//             </div>
//             <Progress value={percent} />
//           </div>
//         </div>
//       </div>

//       {!done ? (
//         <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
//           <Card className="shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle>
//                 Question {index + 1} of {total}
//               </CardTitle>
//               <CardDescription>{tip}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="mb-4">{current.prompt}</p>
//               <div className="grid gap-2">
//                 {current.options.map(opt => (
//                   <Button
//                     key={opt}
//                     variant={answers[current.id] === opt ? "default" : "outline"}
//                     onClick={() => select(opt)}
//                     className="justify-start"
//                   >
//                     {opt}
//                   </Button>
//                 ))}
//               </div>
//             </CardContent>
//             <div className="flex justify-between p-3">
//               <Button variant="outline" onClick={back} disabled={index === 0}>
//                 <ArrowLeft /> Back
//               </Button>
//               <Button onClick={next}>
//                 Next <ArrowRight />
//               </Button>
//             </div>
//           </Card>
//         </div>
//       ) : (
//         <div className="relative text-center py-10">
//           <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
//           <div className="mb-4 flex justify-center items-center gap-2 flex-wrap">
//             <span>
//               You scored {result.score}% and your recommended stream is
//             </span>
//             <Badge variant="outline">{result.stream}</Badge>
//           </div>
//           <Button onClick={saveAssessment} disabled={saving || saved}>
//             {saving ? "Saving..." : saved ? "Saved" : "Save Assessment"}
//           </Button>
//           <div ref={confettiRef} className="absolute inset-0 pointer-events-none"></div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Brain } from "lucide-react";

// Types
type QType = "mcq" | "order";
interface Question {
  id: string;
  type: QType;
  prompt: string;
  options: string[];
}

const LIKERT = ["Strongly agree", "Agree", "Neutral", "Disagree"] as const;

// Questions
const QUESTIONS: Question[] = [
  // Engineering / Logical
  {
    id: "lab_work",
    type: "mcq",
    prompt: "You enjoy hands-on experiments and lab-based activities.",
    options: [...LIKERT],
  },
  {
    id: "analytical_thinking",
    type: "mcq",
    prompt: "You enjoy analyzing graphs/data to find patterns and insights.",
    options: [...LIKERT],
  },
  {
    id: "problem_solving",
    type: "mcq",
    prompt: "You like solving complex, multi-step problems.",
    options: [...LIKERT],
  },
  {
    id: "programming",
    type: "mcq",
    prompt: "You are interested in programming or have written code before.",
    options: [...LIKERT],
  },
  {
    id: "logical_thinking",
    type: "mcq",
    prompt: "You enjoy logic puzzles and structured thinking.",
    options: [...LIKERT],
  },

  // Medical / Science
  {
    id: "scientific_knowledge",
    type: "mcq",
    prompt: "You like learning scientific concepts and reading science articles.",
    options: [...LIKERT],
  },
  {
    id: "helping_others",
    type: "mcq",
    prompt: "You are motivated by helping others and improving people's health.",
    options: [...LIKERT],
  },
  {
    id: "attention_to_detail",
    type: "mcq",
    prompt: "You pay close attention to small details and accuracy in your work.",
    options: [...LIKERT],
  },
  {
    id: "research_interest",
    type: "mcq",
    prompt: "You are interested in medical research or lab experiments.",
    options: [...LIKERT],
  },

  // Creative / Arts
  {
    id: "creative_expression",
    type: "mcq",
    prompt: "You enjoy creative activities such as drawing, writing, or designing.",
    options: [...LIKERT],
  },
  {
    id: "communication",
    type: "mcq",
    prompt: "You like communicating ideas clearly and presenting them to others.",
    options: [...LIKERT],
  },
  {
    id: "teamwork",
    type: "mcq",
    prompt: "You enjoy collaborating with others on creative projects.",
    options: [...LIKERT],
  },

  // Business / Management
  {
    id: "leadership",
    type: "mcq",
    prompt: "You like leading teams or organizing tasks for a group.",
    options: [...LIKERT],
  },
  {
    id: "strategic_thinking",
    type: "mcq",
    prompt: "You enjoy planning long-term strategies and solving business problems.",
    options: [...LIKERT],
  },
  {
    id: "finance_interest",
    type: "mcq",
    prompt: "You are interested in finance, budgeting, or managing resources.",
    options: [...LIKERT],
  },
];

// Weighted streams
const STREAMS = {
  Engineering: {
    problem_solving: 0.4,
    programming: 0.4,
    analytical_thinking: 0.2,
    logical_thinking: 0.2,
  },
  Medical: {
    lab_work: 0.3,
    scientific_knowledge: 0.3,
    research_interest: 0.2,
    helping_others: 0.2,
    attention_to_detail: 0.2,
  },
  Creative: {
    creative_expression: 0.4,
    communication: 0.3,
    teamwork: 0.3,
  },
  Business: {
    leadership: 0.4,
    strategic_thinking: 0.3,
    finance_interest: 0.3,
  },
};

// Convert Likert choice to numeric score
function likertScore(choice: string): number {
  const idx = LIKERT.indexOf(choice as any);
  return idx === -1 ? 0 : Math.max(0, 3 - idx);
}

// Map answers to a stream
function mapToStream(answers: Record<string, string>): { stream: string; score: number } {
  const skillScores: Record<string, number> = {};
  Object.entries(answers).forEach(([qid, ans]) => {
    skillScores[qid] = likertScore(ans);
  });

  const scores: Record<string, number> = {};
  Object.entries(STREAMS).forEach(([stream, weights]) => {
    let s = 0,
      max = 0;
    Object.entries(weights).forEach(([skill, weight]) => {
      s += (skillScores[skill] || 0) * weight;
      max += 3 * weight;
    });
    scores[stream] = Math.round((s / Math.max(0.001, max)) * 100);
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topStream, topScore] = sorted[0];
  return { stream: topStream, score: topScore };
}

// Confetti effect
function useConfetti(active: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const colors = ["#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"];
    const el = ref.current;
    el.innerHTML = "";
    const N = 80;
    for (let i = 0; i < N; i++) {
      const span = document.createElement("span");
      span.className = "absolute block w-1.5 h-3";
      span.style.left = Math.random() * 100 + "%";
      span.style.top = "-10px";
      span.style.background = colors[Math.floor(Math.random() * colors.length)];
      span.style.opacity = String(0.7 + Math.random() * 0.3);
      span.style.transform = `rotate(${Math.random() * 360}deg)`;
      span.style.borderRadius = "2px";
      const dur = 3000 + Math.random() * 3000;
      span.animate(
        [
          { transform: span.style.transform, top: "-10px" },
          { transform: span.style.transform, top: "110%" },
        ],
        { duration: dur, easing: "cubic-bezier(.2,.6,.2,1)", iterations: 1, delay: Math.random() * 800 }
      ).onfinish = () => span.remove();
      el.appendChild(span);
    }
  }, [active]);
  return ref;
}

export default function CareerQuiz() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const total = QUESTIONS.length;
  const current = QUESTIONS[index];
  const percent = Math.round((index / total) * 100);
  const done = index >= total;

  const tips = [
    "Tip: There’s no wrong answer—go with your first instinct!",
    "Growth Mindset: Skills improve with practice.",
    "Explore: Try clubs or mini-projects to learn faster.",
  ];
  const tip = tips[index % tips.length];

  const profileData = useMemo(() => {
    try {
      const stored = localStorage.getItem("GuideSutra_profile");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const result = useMemo(() => (done ? mapToStream(answers) : null), [done, answers]);
  const confettiRef = useConfetti(!!done);

  function select(option: string) {
    if (current.type === "mcq") setAnswers(a => ({ ...a, [current.id]: option }));
  }

  function next() {
    if (!answers[current.id]) {
      toast("Please select an answer to continue");
      return;
    }
    setIndex(i => Math.min(i + 1, total));
  }

  function back() {
    setIndex(i => Math.max(0, i - 1));
  }

  // Auto-save on completion
  useEffect(() => {
    if (done && !saved) {
      void saveAssessment();
    }
  }, [done, saved]);

  async function saveAssessment() {
    if (!result || !profileData?.id) return;
    setSaving(true);

    const strengths = Object.entries(answers)
      .filter(([_, val]) => likertScore(val) >= 2)
      .map(([k]) => k);

    const weaknesses = Object.entries(answers)
      .filter(([_, val]) => likertScore(val) <= 1)
      .map(([k]) => k);

    try {
      const res = await fetch(`${apiUrl}/assessments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: profileData.id,
          score: result.score,
          stream: result.stream,
          strengths,
          weaknesses,
        }),
      });
      if (!res.ok) throw new Error("Failed to save assessment");
      setSaved(true);
      toast.success("Assessment saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save assessment.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] mt-20">
      <div className="sticky top-0 z-10 mb-4 bg-background/80 backdrop-blur border rounded-md">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Brain className="text-primary" /> <span className="font-semibold">GuideSutra Quiz</span>
          </div>
          <div className="min-w-[220px]">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{percent}% Completed</span>
            </div>
            <Progress value={percent} />
          </div>
        </div>
      </div>

      {!done ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>
                Question {index + 1} of {total}
              </CardTitle>
              <CardDescription>{tip}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{current.prompt}</p>
              <div className="grid gap-2">
                {current.options.map(opt => (
                  <Button
                    key={opt}
                    variant={answers[current.id] === opt ? "default" : "outline"}
                    onClick={() => select(opt)}
                    className="justify-start"
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </CardContent>
            <div className="flex justify-between p-3">
              <Button variant="outline" onClick={back} disabled={index === 0}>
                <ArrowLeft /> Back
              </Button>
              <Button onClick={next}>
                Next <ArrowRight />
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="relative text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
          <div className="mb-4 flex justify-center items-center gap-2 flex-wrap">
            <span>
              You scored {result!.score}% and your recommended stream is
            </span>
            <Badge variant="outline">{result!.stream}</Badge>
          </div>
          <Button onClick={saveAssessment} disabled={saving || saved}>
            {saving ? "Saving..." : saved ? "Saved" : "Save Assessment"}
          </Button>
          <div ref={confettiRef} className="absolute inset-0 pointer-events-none"></div>
        </div>
      )}
    </div>
  );
}
