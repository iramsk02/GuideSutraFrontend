import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Brain, Compass, Lightbulb, MousePointer2 } from "lucide-react";
import { Link } from "react-router-dom";

// Types
 type QType = "mcq" | "order";
 interface Question {
  id: string;
  type: QType;
  prompt: string;
  options: string[];
 }

 const QUESTIONS: Question[] = [
  { id: "q1", type: "mcq", prompt: "Which activity sounds most exciting?", options: ["Building robots", "Designing posters", "Analyzing data", "Helping a community project"] },
  { id: "q2", type: "mcq", prompt: "Pick a favorite subject:", options: ["Physics", "Economics", "Biology", "History"] },
  { id: "q3", type: "order", prompt: "Rank what matters most to you (drag to reorder)", options: ["Innovation", "Stability", "Creativity", "Impact"] },
  { id: "q4", type: "mcq", prompt: "You prefer working:", options: ["With machines", "With numbers", "With people", "With ideas"] },
  { id: "q5", type: "mcq", prompt: "Choose a project:", options: ["App to track habits", "School magazine", "Science fair experiment", "Fundraising campaign"] },
 ];

 function mapToStream(answers: Record<string, string | string[]>): { stream: string; score: number } {
  // naive scoring across streams
  const scores: Record<string, number> = { "Science": 0, "Commerce": 0, "Arts": 0, "Science with Biology": 0 };
  const add = (k: string, n = 1) => (scores[k] = (scores[k] || 0) + n);

  Object.entries(answers).forEach(([qid, ans]) => {
    const a = Array.isArray(ans) ? ans.join(" ") : ans;
    if (/robot|physics|experiment|machines|biology/i.test(a)) add("Science", 2);
    if (/biology/i.test(a)) add("Science with Biology", 2);
    if (/economics|numbers|data|commerce|business|stability/i.test(a)) add("Commerce", 2);
    if (/design|poster|magazine|creativity|history|people/i.test(a)) add("Arts", 2);
    if (/impact|community|fundraising/i.test(a)) add("Arts", 1);
  });
  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = entries[0];
  const maxScore = Math.max(1, entries[0][1] || 1);
  const percent = Math.min(97, Math.round((top[1] / (maxScore + 4)) * 100));
  return { stream: top[0], score: percent };
 }

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
        { duration: dur, easing: "cubic-bezier(.2,.6,.2,1)", iterations: 1, delay: Math.random() * 800 },
      ).onfinish = () => span.remove();
      el.appendChild(span);
    }
  }, [active]);
  return ref;
 }

 export default function CareerQuiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [order, setOrder] = useState<string[]>(QUESTIONS.find(q => q.type === "order")?.options || []);
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

  const result = useMemo(() => (done ? mapToStream(answers) : null), [done, answers]);
  const confettiRef = useConfetti(!!done);

  function select(option: string) {
    if (current.type === "mcq") {
      setAnswers((a) => ({ ...a, [current.id]: option }));
    }
  }

  function onDrag(e: React.DragEvent<HTMLDivElement>, from: number) {
    e.dataTransfer.setData("text/plain", String(from));
  }
  function onDrop(e: React.DragEvent<HTMLDivElement>, to: number) {
    const from = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(from)) return;
    setOrder((arr) => {
      const copy = [...arr];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    });
  }

  function next() {
    if (current && current.type === "mcq" && !answers[current.id]) {
      toast("Please select an answer to continue");
      return;
    }
    if (current && current.type === "order") {
      setAnswers((a) => ({ ...a, [current.id]: order }));
    }
    setIndex((i) => Math.min(i + 1, total));
  }
  function back() {
    setIndex((i) => Math.max(0, i - 1));
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">{/* layout padding handled by StudentLayout */}
      {/* Header with progress */}
      <div className="sticky top-0 z-10 mb-4 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-md">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Brain className="text-primary" /> <span className="font-semibold">NovaPath Quiz</span>
          </div>
          <div className="min-w-[220px]">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span><span>{percent}% Completed</span>
            </div>
            <Progress value={percent} />
          </div>
        </div>
      </div>

      {!done ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          {/* Left: Question */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Question {index + 1} of {total}</CardTitle>
              <CardDescription>{current.prompt}</CardDescription>
            </CardHeader>
            <CardContent>
              {current.type === "mcq" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {current.options.map((opt) => {
                    const selected = answers[current.id] === opt;
                    return (
                      <button key={opt} onClick={() => select(opt)} className={`text-left rounded-xl border p-4 transition-all hover:shadow-sm focus:outline-none ${selected ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "hover:border-primary/30"}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{opt}</span>
                          {selected && <Badge variant="secondary">Selected</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Click to choose</p>
                      </button>
                    );
                  })}
                </div>
              )}
              {current.type === "order" && (
                <div className="grid gap-2">
                  {order.map((item, i) => (
                    <div key={item} draggable onDragStart={(e) => onDrag(e, i)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, i)} className="flex items-center justify-between rounded-lg border bg-accent/40 p-3">
                      <div className="flex items-center gap-2"><MousePointer2 className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{item}</span></div>
                      <span className="text-xs text-muted-foreground">Drag to reorder</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <Button variant="outline" onClick={back} disabled={index === 0}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button onClick={next}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>

          {/* Right: Illustration / Tip */}
          <Card className="bg-gradient-to-b from-blue-50 to-emerald-50 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="text-amber-500" /> Pro Tip</CardTitle>
              <CardDescription>Motivation for your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80">{tip}</p>
              <div className="mt-4 rounded-xl border bg-white p-4">
                <svg viewBox="0 0 400 160" className="w-full h-auto">
                  <rect x="0" y="0" width="400" height="160" rx="12" fill="#eff6ff" />
                  <circle cx="70" cy="80" r="26" fill="#93c5fd" />
                  <rect x="110" y="60" width="120" height="14" rx="7" fill="#bbf7d0" />
                  <rect x="110" y="82" width="80" height="10" rx="5" fill="#e5e7eb" />
                  <polyline points="210,120 260,90 320,100 360,70" fill="none" stroke="#34d399" strokeWidth="4" />
                </svg>
                <p className="mt-2 text-xs text-muted-foreground">Keep going—each step clarifies your path.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Result view
        <div className="relative">
          <div ref={confettiRef} className="pointer-events-none absolute inset-0 overflow-hidden" />
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Compass className="text-primary" /> Your Suggested Stream</CardTitle>
              <CardDescription>Based on your responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-2xl font-bold">{result?.stream}</p>
                  <p className="text-sm text-muted-foreground">Match Score</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="min-w-[220px]"><Progress value={result?.score || 0} /></div>
                    <span className="text-sm font-medium">{result?.score}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to="/career-pathway"><Button>View Career Pathway</Button></Link>
                  <Button variant="outline" onClick={() => toast.success("Saved to dashboard")}>Save to Dashboard</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step indicators */}
      {!done && (
        <div className="mt-6 flex justify-center gap-2">
          {QUESTIONS.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i <= index ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
      )}
    </div>
  );
 }
