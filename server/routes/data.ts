import { Router, RequestHandler } from "express";

// Basic types (keep minimal, align with prompt fields)
export type User = {
  id: number;
  email: string;
  name: string;
  dob?: string;
  gender?: string;
  location?: string;
  educationLevel?: string;
  interests?: string[];
  skills?: string[];
};

export type Career = {
  id: number;
  careerName: string;
  description?: string;
  requiredSkills?: string[];
  requiredStream?: string;
  futureScope?: string;
};

export type Course = {
  id: number;
  courseName: string;
  stream?: string;
  duration?: string;
  eligibility?: string;
  careerId?: number;
};

export type College = {
  id: number;
  collegeName: string;
  location?: string;
  affiliation?: string;
};

export type CollegeCourse = { id: number; collegeId: number; courseId: number };
export type Skill = { id: number; skillName: string };
export type CareerSkill = { id: number; careerId: number; skillId: number };
export type CourseSkill = { id: number; courseId: number; skillId: number };
export type Assessment = {
  id: number;
  userId: number;
  testType: string;
  score: number;
  strengths?: string[];
  weaknesses?: string[];
};
export type Recommendation = {
  id: number;
  userId: number;
  careerId: number;
  courseId: number;
  collegeId: number;
  score?: number;
};

// In-memory store (ephemeral)
const store = {
  users: [] as User[],
  careers: [] as Career[],
  courses: [] as Course[],
  colleges: [] as College[],
  collegeCourses: [] as CollegeCourse[],
  skills: [] as Skill[],
  careerSkills: [] as CareerSkill[],
  courseSkills: [] as CourseSkill[],
  assessments: [] as Assessment[],
  recommendations: [] as Recommendation[],
};

const counters: Record<string, number> = new Proxy({}, {
  get: (t, k: string) => (t[k] ??= 1),
  set: (t, k: string, v: number) => ((t[k] = v), true),
});

function upsertMany<T extends { id?: number }>(key: keyof typeof store, input: any[]): T[] {
  const arr = store[key] as any[];
  const out: T[] = [];
  for (const obj of input) {
    const copy: any = { ...obj };
    copy.id = counters[String(key)]++;
    arr.push(copy);
    out.push(copy as T);
  }
  return out;
}

function buildPost<T extends { id?: number }>(key: keyof typeof store): RequestHandler {
  return (req, res) => {
    const payload = Array.isArray(req.body) ? req.body : [req.body];
    if (!payload || payload.length === 0) return res.status(400).json({ error: "Empty payload" });
    const saved = upsertMany<T>(key, payload);
    res.status(201).json({ count: saved.length, data: saved });
  };
}

function buildGet(key: keyof typeof store): RequestHandler {
  return (_req, res) => {
    res.json({ count: (store[key] as any[]).length, data: store[key] });
  };
}

export function createDataRouter() {
  const r = Router();
  // POST endpoints as requested
  r.post("/users", buildPost<User>("users"));
  r.post("/careers", buildPost<Career>("careers"));
  r.post("/courses", buildPost<Course>("courses"));
  r.post("/colleges", buildPost<College>("colleges"));
  r.post("/college-courses", buildPost<CollegeCourse>("collegeCourses"));
  r.post("/skills", buildPost<Skill>("skills"));
  r.post("/career-skills", buildPost<CareerSkill>("careerSkills"));
  r.post("/course-skills", buildPost<CourseSkill>("courseSkills"));
  r.post("/assessments", buildPost<Assessment>("assessments"));
  r.post("/recommendations", buildPost<Recommendation>("recommendations"));

  // Minimal GET endpoints (useful for verification)
  r.get("/users", buildGet("users"));
  r.get("/careers", buildGet("careers"));
  r.get("/courses", buildGet("courses"));
  r.get("/colleges", buildGet("colleges"));
  r.get("/college-courses", buildGet("collegeCourses"));
  r.get("/skills", buildGet("skills"));
  r.get("/career-skills", buildGet("careerSkills"));
  r.get("/course-skills", buildGet("courseSkills"));
  r.get("/assessments", buildGet("assessments"));
  r.get("/recommendations", buildGet("recommendations"));

  return r;
}
