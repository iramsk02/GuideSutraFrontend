import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Brain, Check } from "lucide-react";

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
      const stored = localStorage.getItem("novapath_profile");
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
    <div className="space-y-12 px-4 md:px-8 mt-20">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Career Assessment</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover your ideal career path through our comprehensive assessment.
        </p>
      </div>

      <div className="sticky top-16 z-10 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <span className="font-bold text-lg text-gray-900">GuideSutra Quiz</span>
              <p className="text-sm text-gray-600">Question {index + 1} of {total}</p>
            </div>
          </div>
          <div className="min-w-[240px]">
            <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Progress</span>
              <span className="text-blue-600">{percent}% Completed</span>
            </div>
            <Progress value={percent} className="h-2 bg-gray-200" />
          </div>
        </div>
      </div>

      {!done ? (
        <div className="grid gap-8 ">
          <Card className="rounded-3xl shadow-xl border-gray-200 transition-transform duration-300 hover:scale-[1.01]">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="flex items-center gap-4 text-2xl font-bold text-gray-900">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
                Question {index + 1} of {total}
              </CardTitle>
              <CardDescription className="text-base text-gray-600 mt-2">{tip}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <p className="text-xl font-semibold text-gray-800 leading-relaxed">{current.prompt}</p>
              <div className="grid gap-4">
                {current.options.map(opt => (
                  <Button
                    key={opt}
                    variant={answers[current.id] === opt ? "default" : "outline"}
                    onClick={() => select(opt)}
                    className={`h-14 justify-start text-left font-medium rounded-xl transition-colors ${answers[current.id] === opt ? "bg-blue-600 hover:bg-blue-700 text-white" : "border-gray-300 hover:bg-gray-100 text-gray-800"}`}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </CardContent>
            <div className="flex justify-between p-8 border-t border-gray-200">
              <Button variant="outline" onClick={back} disabled={index === 0} className="rounded-full px-6 gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={next} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
          
        </div>
      ) : (
        <div className="relative text-center py-20">
          <div className="animate-scale-in">
            <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              <Check className="h-10 w-10" />
            </div>
            <h2 className="text-5xl font-bold mb-6 text-gray-900">Congratulations!</h2>
            <div className="mb-8 flex justify-center items-center gap-3 flex-wrap">
              <span className="text-2xl text-gray-600">
                You scored <span className="text-4xl font-bold text-blue-600">{result!.score}%</span> and your recommended stream is
              </span>
              <Badge variant="secondary" className="text-2xl px-6 py-3 rounded-full bg-blue-50 text-blue-700 border-blue-200 font-bold">{result!.stream}</Badge>
            </div>
            <Button onClick={saveAssessment} disabled={saving || saved} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg">
              {saving ? "Saving..." : saved ? "Saved" : "Save Assessment"}
            </Button>
          </div>
          <div ref={confettiRef} className="absolute inset-0 pointer-events-none"></div>
        </div>
      )}
    </div>
  );
}