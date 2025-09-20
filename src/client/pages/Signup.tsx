
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const INTERESTS = [
  "Science",
  "Commerce",
  "Arts",
  "Engineering",
  "Medicine",
  "Law",
  "Design",
  "Business",
  "Computer Science",
];

export default function Signup() {
  const search = new URLSearchParams(window.location.search);
  const initialRole = (search.get("role") || "student").toLowerCase();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [role, setRole] = useState<string>(
    ["student", "parent", "counselor"].includes(initialRole)
      ? initialRole
      : "student",
  );
  const [interests, setInterests] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);
  const [childEmail, setChildEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { percent } = useMemo(() => {
    const baseDone =
      Number(!!name) +
      Number(!!email) +
      Number(!!password) +
      Number(!!confirm) +
      Number(!!role);
    let extraDone = 0;
    let total = 5;

    if (role === "student") {
      extraDone =
        Number(!!age) +
        Number(!!gender) +
        Number(!!grade) +
        Number(!!location) +
        Number(!!language) +
        Number(interests.length > 0);
      total = 11;
    } else if (role === "parent") {
      extraDone = Number(!!childEmail);
      total = 6;
    } else if (role === "counselor") {
      extraDone = 0;
      total = 5;
    }

    const done = baseDone + extraDone;
    const pct = Math.round((done / total) * 100);
    return { percent: pct };
  }, [
    name,
    email,
    password,
    confirm,
    role,
    age,
    gender,
    grade,
    location,
    language,
    interests,
    childEmail,
  ]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!agree) return toast.error("Please agree to Terms & Privacy Policy");
    if (!name || !email || !password || !confirm)
      return toast.error("Please fill all required fields");
    if (password !== confirm) return toast.error("Passwords do not match");

    let dob: string | undefined;
    if (role === "student" && age) {
      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - Number(age);
      dob = new Date(`${birthYear}-01-01`).toISOString();
    }

    const userData: any = {
      name,
      email,
      dob,
      // password,
      gender: role === "student" ? gender : undefined,
      location: role === "student" ? location : undefined,
      educationLevel: role === "student" ? grade : undefined,
      interests: role === "student" ? interests : undefined,
      skills: [], // optional: can add skill inputs later
    };

    try {
      const res = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create user");
      }

      const data = await res.json();
      console.log(data);
      toast.success("Account created! Redirecting...");
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <header className="w-full glass-effect border-b shadow-sm">
        <div className="mx-auto max-w-6xl h-16 px-6 flex items-center justify-between">
          <Link to="/" className="font-bold text-2xl text-gradient">
            GuideSutra
          </Link>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </header>

      <main className="flex-1 grid place-items-center px-6 py-12">
        <div className="grid gap-12 md:grid-cols-2 max-w-6xl w-full">
          <div className="order-2 md:order-1 hidden md:block animate-fade-in">
            <div className="rounded-3xl border bg-white/80 backdrop-blur-sm p-8 shadow-lg">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                🚀
              </div>
              <h3 className="text-2xl font-bold text-center text-foreground mb-4">
                Start Your Career Journey
              </h3>
              <p className="text-center text-muted-foreground leading-relaxed mb-6">
                Join thousands of students who have discovered their perfect career path with our personalized guidance and comprehensive resources.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <span className="text-sm font-medium">Personalized career assessment</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <span className="text-sm font-medium">College and course recommendations</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <span className="text-sm font-medium">Scholarship opportunities</span>
                </div>
              </div>
            </div>
          </div>

          <Card className="order-1 md:order-2 shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-slide-up">
            <div className="px-6 pt-6">
              <div className="mb-4 flex items-center justify-between text-sm font-medium text-foreground">
                <span>Profile completion</span>
                <span className="text-primary">{percent}%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-gradient-primary transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
            <CardHeader className="pb-6 text-center">
              <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
              <CardDescription className="text-base">It takes less than 2 minutes.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit}>
                <fieldset
                  disabled={loading}
                  aria-busy={loading}
                  className="space-y-4"
                >
                  <div className="grid gap-3">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      required
                    />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                    <Input
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Confirm Password"
                      required
                    />
                  </div>

                  {role === "student" && (
                    <>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <Input
                          type="number"
                          min={8}
                          max={60}
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="Age"
                        />
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger>
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="na">
                              Prefer not to say
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={grade} onValueChange={setGrade}>
                          <SelectTrigger>
                            <SelectValue placeholder="Grade/Class" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Class 8",
                              "Class 9",
                              "Class 10",
                              "Class 11",
                              "Class 12",
                              "UG",
                              "PG",
                            ].map((g) => (
                              <SelectItem key={g} value={g}>
                                {g}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location"
                      />

                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Academic Interests
                        </label>
                        <ToggleGroup
                          type="multiple"
                          value={interests}
                          onValueChange={setInterests}
                          className="flex flex-wrap gap-2"
                        >
                          {INTERESTS.map((i) => (
                            <ToggleGroupItem
                              key={i}
                              value={i}
                              className="rounded-full px-3 py-1 data-[state=on]:bg-primary/10 data-[state=on]:text-primary border"
                            >
                              {i}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </div>
                    </>
                  )}

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="agree"
                      checked={agree}
                      onCheckedChange={(v) => setAgree(Boolean(v))}
                    />
                    <label
                      htmlFor="agree"
                      className="text-sm text-muted-foreground"
                    >
                      I agree to Terms & Privacy Policy
                    </label>
                  </div>

                  <Button type="submit" className="w-full h-12 gradient-primary hover:opacity-90 font-semibold" disabled={loading}>
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Creating
                        account...
                      </span>
                    ) : (
                      "Sign Up & Continue"
                    )}
                  </Button>
                </fieldset>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
