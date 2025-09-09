export type Profile = {
  name?: string;
  email?: string;
  age?: number;
  gender?: string; // male|female|other|na
  grade?: string;
  interests?: string[];
  location?: string;
  language?: string;
  role?: string; // student|parent|counselor
};

export type QuizResult = { stream?: string; score?: number } | null;

export function getProfile(): Profile | null {
  try {
    const raw = localStorage.getItem("novapath_profile");
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

export function getQuizResult(): QuizResult {
  try {
    const raw = localStorage.getItem("novapath_quiz_result");
    return raw ? (JSON.parse(raw) as QuizResult) : null;
  } catch {
    return null;
  }
}

export function normalizeStream(s?: string): string | undefined {
  if (!s) return undefined;
  const t = s.toLowerCase();
  if (t.includes("science")) return "Science";
  if (t.includes("engineering") || t.includes("tech")) return "Engineering";
  if (t.includes("commerce") || t.includes("business")) return "Business";
  if (t.includes("arts")) return "Arts";
  return undefined;
}

export function profileGenderToFilter(
  g?: string,
): "Male" | "Female" | "Any" | undefined {
  if (!g) return undefined;
  const t = g.toLowerCase();
  if (t === "female") return "Female";
  if (t === "male") return "Male";
  return "Any";
}
