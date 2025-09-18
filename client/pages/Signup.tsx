// import { Link, useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { useMemo, useState } from "react";
// import { toast } from "sonner";

// const INTERESTS = [
//   "Science",
//   "Commerce",
//   "Arts",
//   "Engineering",
//   "Medicine",
//   "Law",
//   "Design",
//   "Business",
//   "Computer Science",
// ];

// export default function Signup() {
//   const search = new URLSearchParams(window.location.search);
//   const initialRole = (search.get("role") || "student").toLowerCase();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [age, setAge] = useState<string>("");
//   const [gender, setGender] = useState<string>("");
//   const [location, setLocation] = useState<string>("");
//   const [language, setLanguage] = useState<string>("");
//   const [grade, setGrade] = useState<string>("");
//   const [role, setRole] = useState<string>(
//     ["student", "parent", "counselor"].includes(initialRole)
//       ? initialRole
//       : "student",
//   );
//   const [interests, setInterests] = useState<string[]>([]);
//   const [agree, setAgree] = useState(false);
//   const [childEmail, setChildEmail] = useState("");
//   const navigate = useNavigate();

//   const { percent } = useMemo(() => {
//     const baseDone =
//       Number(!!name) +
//       Number(!!email) +
//       Number(!!password) +
//       Number(!!confirm) +
//       Number(!!role);
//     let extraDone = 0;
//     let total = 5;

//     if (role === "student") {
//       extraDone =
//         Number(!!age) +
//         Number(!!gender) +
//         Number(!!grade) +
//         Number(!!location) +
//         Number(!!language) +
//         Number(interests.length > 0);
//       total = 11;
//     } else if (role === "parent") {
//       extraDone = Number(!!childEmail);
//       total = 6;
//     } else if (role === "counselor") {
//       extraDone = 0;
//       total = 5;
//     }

//     const done = baseDone + extraDone;
//     const pct = Math.round((done / total) * 100);
//     return { percent: pct };
//   }, [
//     name,
//     email,
//     password,
//     confirm,
//     role,
//     age,
//     gender,
//     grade,
//     location,
//     language,
//     interests,
//     childEmail,
//   ]);

//   function submit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!agree) return toast.error("Please agree to Terms & Privacy Policy");
//     if (!name || !email || !password || !confirm)
//       return toast.error("Please fill all required fields");
//     if (password !== confirm) return toast.error("Passwords do not match");
//     if (role === "parent") {
//       if (!childEmail) return toast.error("Enter your child's email ID");
//       const emailOk = /.+@.+\..+/.test(childEmail);
//       if (!emailOk) return toast.error("Enter a valid child email");
//     }

//     const profile: any = {
//       name,
//       email,
//       age: role === "student" && age ? Number(age) : undefined,
//       gender: role === "student" ? gender : undefined,
//       grade: role === "student" ? grade : undefined,
//       interests: role === "student" ? interests : undefined,
//       location: role === "student" ? location : undefined,
//       language: role === "student" ? language : undefined,
//       role,
//       childEmail: role === "parent" ? childEmail : undefined,
//     };
//     try {
//       localStorage.setItem("novapath_profile", JSON.stringify(profile));
//     } catch {}
//     toast.success("Account created! Redirecting...");
//     navigate("/dashboard", { replace: true });
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="w-full border-b bg-white/80 backdrop-blur">
//         <div className="mx-auto max-w-5xl h-14 px-4 flex items-center justify-between">
//           <Link to="/" className="font-semibold text-primary">
//             NovaPath
//           </Link>
//           <p className="text-sm text-muted-foreground">
//             Already have an account?{" "}
//             <Link to="/signin" className="text-primary hover:underline">
//               Sign In
//             </Link>
//           </p>
//         </div>
//       </header>

//       <main className="flex-1 grid place-items-center px-4 py-10 bg-gradient-to-b from-blue-50/40 to-emerald-50/20">
//         <div className="grid gap-8 md:grid-cols-2 max-w-5xl w-full">
//           <div className="order-2 md:order-1 hidden md:block">
//             <div className="rounded-3xl border bg-white p-6 shadow-sm">
//               <svg viewBox="0 0 500 320" className="w-full h-auto">
//                 <rect
//                   x="0"
//                   y="0"
//                   width="500"
//                   height="320"
//                   rx="20"
//                   fill="#eef2ff"
//                 />
//                 <circle cx="120" cy="160" r="40" fill="#93c5fd" />
//                 <rect
//                   x="180"
//                   y="130"
//                   width="120"
//                   height="16"
//                   rx="8"
//                   fill="#bbf7d0"
//                 />
//                 <rect
//                   x="180"
//                   y="154"
//                   width="90"
//                   height="12"
//                   rx="6"
//                   fill="#e5e7eb"
//                 />
//                 <polyline
//                   points="200,220 260,190 320,205 380,170"
//                   fill="none"
//                   stroke="#34d399"
//                   strokeWidth="5"
//                 />
//               </svg>
//               <p className="mt-3 text-sm text-muted-foreground">
//                 Plan your future with friendly guidance and tools.
//               </p>
//             </div>
//           </div>

//           <Card className="order-1 md:order-2 shadow-sm">
//             <div className="px-6 pt-4">
//               <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
//                 <span>Profile completion</span>
//                 <span>{percent}%</span>
//               </div>
//               <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
//                 <div
//                   className="h-full bg-primary"
//                   style={{ width: `${percent}%` }}
//                 />
//               </div>
//             </div>
//             <CardHeader className="pb-2">
//               <CardTitle>Create your account</CardTitle>
//               <CardDescription>It takes less than 2 minutes.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-2 mb-4 sm:grid-cols-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => {
//                     toast.success("Signed up with Google (demo)");
//                     navigate("/dashboard", { replace: true });
//                   }}
//                 >
//                   Continue with Google
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => {
//                     toast.success("OTP sent to your mobile (demo)");
//                     navigate("/dashboard", { replace: true });
//                   }}
//                 >
//                   Continue with Mobile OTP
//                 </Button>
//               </div>
//               <form onSubmit={submit} className="space-y-4">
//                 <div className="grid gap-3">
//                   <div>
//                     <label className="mb-1 block text-sm font-medium">
//                       Full Name
//                     </label>
//                     <Input
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       placeholder="Your name"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="mb-1 block text-sm font-medium">
//                       Email
//                     </label>
//                     <Input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="you@example.com"
//                       required
//                     />
//                   </div>
//                   <div className="grid gap-3 sm:grid-cols-2">
//                     <div>
//                       <label className="mb-1 block text-sm font-medium">
//                         Password
//                       </label>
//                       <Input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1 block text-sm font-medium">
//                         Confirm Password
//                       </label>
//                       <Input
//                         type="password"
//                         value={confirm}
//                         onChange={(e) => setConfirm(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {role === "parent" ? (
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <label className="mb-1 block text-sm font-medium">
//                         Child's Email
//                       </label>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px] cursor-help">
//                             ?
//                           </span>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           Use your child's registered email to connect your
//                           account.
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                     <Input
//                       type="email"
//                       value={childEmail}
//                       onChange={(e) => setChildEmail(e.target.value)}
//                       placeholder="child@example.com"
//                       required={role === "parent"}
//                     />
//                   </div>
//                 ) : null}

//                 {role === "student" ? (
//                   <>
//                     <div className="grid gap-3 sm:grid-cols-3">
//                       <div>
//                         <label className="mb-1 block text-sm font-medium">
//                           Age
//                         </label>
//                         <Input
//                           type="number"
//                           min={8}
//                           max={60}
//                           value={age}
//                           onChange={(e) => setAge(e.target.value)}
//                           placeholder="16"
//                         />
//                       </div>
//                       <div>
//                         <label className="mb-1 block text-sm font-medium">
//                           Gender
//                         </label>
//                         <Select value={gender} onValueChange={setGender}>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="male">Male</SelectItem>
//                             <SelectItem value="female">Female</SelectItem>
//                             <SelectItem value="other">Other</SelectItem>
//                             <SelectItem value="na">
//                               Prefer not to say
//                             </SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div>
//                         <label className="mb-1 block text-sm font-medium">
//                           Class/Grade
//                         </label>
//                         <Select value={grade} onValueChange={setGrade}>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {[
//                               "Class 8",
//                               "Class 9",
//                               "Class 10",
//                               "Class 11",
//                               "Class 12",
//                               "UG",
//                               "PG",
//                             ].map((g) => (
//                               <SelectItem key={g} value={g}>
//                                 {g}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>

//                     <div className="grid gap-3 sm:grid-cols-2">
//                       <div>
//                         <label className="mb-1 block text-sm font-medium">
//                           Location
//                         </label>
//                         <Input
//                           value={location}
//                           onChange={(e) => setLocation(e.target.value)}
//                           placeholder="City, State"
//                         />
//                       </div>
//                       <div>
//                         <label className="mb-1 block text-sm font-medium">
//                           Preferred Language
//                         </label>
//                         <Select value={language} onValueChange={setLanguage}>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select language" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {[
//                               "English",
//                               "��िंदी (Hindi)",
//                               "বাংলা (Bengali)",
//                               "தமிழ் (Tamil)",
//                               "తెలుగు (Telugu)",
//                               "मराठी (Marathi)",
//                             ].map((l) => (
//                               <SelectItem key={l} value={l}>
//                                 {l}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>
//                   </>
//                 ) : null}

//                 <div>
//                   <label className="mb-2 block text-sm font-medium">Role</label>
//                   <ToggleGroup
//                     type="single"
//                     value={role}
//                     onValueChange={(v) => v && setRole(v)}
//                     className="flex flex-wrap gap-2"
//                   >
//                     {["student", "parent", "counselor"].map((r) => (
//                       <ToggleGroupItem
//                         key={r}
//                         value={r}
//                         className="rounded-full px-3 py-1 data-[state=on]:bg-primary/10 data-[state=on]:text-primary border capitalize"
//                       >
//                         {r}
//                       </ToggleGroupItem>
//                     ))}
//                   </ToggleGroup>
//                 </div>

//                 {role === "student" ? (
//                   <div>
//                     <label className="mb-2 block text-sm font-medium">
//                       Academic Interests
//                     </label>
//                     <ToggleGroup
//                       type="multiple"
//                       value={interests}
//                       onValueChange={setInterests}
//                       className="flex flex-wrap gap-2"
//                     >
//                       {INTERESTS.map((i) => (
//                         <ToggleGroupItem
//                           key={i}
//                           value={i}
//                           className="rounded-full px-3 py-1 data-[state=on]:bg-primary/10 data-[state=on]:text-primary border"
//                         >
//                           {i}
//                         </ToggleGroupItem>
//                       ))}
//                     </ToggleGroup>
//                   </div>
//                 ) : null}

//                 <div className="flex items-start gap-2">
//                   <Checkbox
//                     id="agree"
//                     checked={agree}
//                     onCheckedChange={(v) => setAgree(Boolean(v))}
//                   />
//                   <label
//                     htmlFor="agree"
//                     className="text-sm text-muted-foreground"
//                   >
//                     I agree to{" "}
//                     <a href="#" className="underline">
//                       Terms
//                     </a>{" "}
//                     &{" "}
//                     <a href="#" className="underline">
//                       Privacy Policy
//                     </a>
//                   </label>
//                 </div>

//                 <Button type="submit" className="w-full">
//                   Sign Up & Continue
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </main>

//       <footer className="border-t bg-white">
//         <div className="mx-auto max-w-5xl px-4 py-6 flex flex-wrap items-center justify-between gap-3 text-sm">
//           <div className="text-muted-foreground">
//             © {new Date().getFullYear()} NovaPath
//           </div>
//           <nav className="flex items-center gap-4">
//             <a href="#" className="hover:underline">
//               About
//             </a>
//             <a href="#" className="hover:underline">
//               Contact
//             </a>
//             <a href="#" className="hover:underline">
//               Privacy
//             </a>
//             <a href="#" className="hover:underline">
//               FAQs
//             </a>
//           </nav>
//         </div>
//       </footer>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      : "student"
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
      console.log(data)
      toast.success("Account created! Redirecting...");
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-5xl h-14 px-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-primary">
            NovaPath
          </Link>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </header>

      <main className="flex-1 grid place-items-center px-4 py-10 bg-gradient-to-b from-blue-50/40 to-emerald-50/20">
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl w-full">
          <div className="order-2 md:order-1 hidden md:block">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <p className="mt-3 text-sm text-muted-foreground">
                Plan your future with friendly guidance and tools.
              </p>
            </div>
          </div>

          <Card className="order-1 md:order-2 shadow-sm">
            <div className="px-6 pt-4">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Profile completion</span>
                <span>{percent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle>Create your account</CardTitle>
              <CardDescription>It takes less than 2 minutes.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-4">
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
                          <SelectItem value="na">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={grade} onValueChange={setGrade}>
                        <SelectTrigger>
                          <SelectValue placeholder="Grade/Class" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "UG", "PG"].map(
                            (g) => (
                              <SelectItem key={g} value={g}>
                                {g}
                              </SelectItem>
                            )
                          )}
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
                  <label htmlFor="agree" className="text-sm text-muted-foreground">
                    I agree to Terms & Privacy Policy
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Sign Up & Continue
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
