// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
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

// export default function Signin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("novapath_remember");
//       if (saved) {
//         const { email: savedEmail } = JSON.parse(saved);
//         if (savedEmail) {
//           setEmail(savedEmail);
//           setRemember(true);
//         }
//       }
//     } catch {}
//   }, []);

//   function submit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!email || !password) return toast.error("Enter email and password");
//     let profile: any = null;
//     try {
//       const raw = localStorage.getItem("novapath_profile");
//       profile = raw ? JSON.parse(raw) : null;
//     } catch {}
//     if (!profile) return toast.error("No account found. Please sign up.");
//     if (profile.email !== email)
//       return toast.error("Email not found. Check or create an account.");

//     if (remember) {
//       try {
//         localStorage.setItem("novapath_remember", JSON.stringify({ email }));
//       } catch {}
//     } else {
//       try {
//         localStorage.removeItem("novapath_remember");
//       } catch {}
//     }

//     toast.success("Welcome back! Redirecting...");
//     navigate("/dashboard", { replace: true });
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="w-full border-b bg-white/80 backdrop-blur">
//         <div className="mx-auto max-w-5xl h-14 px-4 flex items-center justify-between">
//           <Link to="/" className="font-semibold text-primary">
//             NovaPath
//           </Link>
//           <p className="text-sm text-muted-foreground">
//             New here?{" "}
//             <Link to="/signup" className="text-primary hover:underline">
//               Create an account
//             </Link>
//           </p>
//         </div>
//       </header>

//       <main className="flex-1 grid place-items-center px-4 py-10 bg-gradient-to-b from-emerald-50/30 to-blue-50/20">
//         <div className="grid gap-8 md:grid-cols-2 max-w-5xl w-full items-center">
//           {/* Illustration */}
//           <div className="hidden md:block">
//             <div className="rounded-3xl border bg-white p-6 shadow-sm">
//               <svg viewBox="0 0 500 320" className="w-full h-auto">
//                 <rect
//                   x="0"
//                   y="0"
//                   width="500"
//                   height="320"
//                   rx="20"
//                   fill="#f0f9ff"
//                 />
//                 <g>
//                   <path
//                     d="M80 120 L150 90 L220 120 L150 150 Z"
//                     fill="#93c5fd"
//                   />
//                   <rect x="140" y="150" width="20" height="40" fill="#93c5fd" />
//                   <circle cx="300" cy="200" r="50" fill="#bbf7d0" />
//                   <polyline
//                     points="260,220 300,180 340,200"
//                     fill="none"
//                     stroke="#34d399"
//                     strokeWidth="6"
//                   />
//                 </g>
//               </svg>
//               <p className="mt-3 text-sm text-muted-foreground">
//                 Learn, plan, and track your journey to success.
//               </p>
//             </div>
//           </div>

//           {/* Form */}
//           <Card className="shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle>Welcome back</CardTitle>
//               <CardDescription>
//                 Sign in to continue your journey.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={submit} className="space-y-4">
//                 <div>
//                   <label className="mb-1 block text-sm font-medium">
//                     Email
//                   </label>
//                   <Input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="you@example.com"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-1 block text-sm font-medium">
//                     Password
//                   </label>
//                   <Input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Checkbox
//                       id="remember"
//                       checked={remember}
//                       onCheckedChange={(v) => setRemember(Boolean(v))}
//                     />
//                     <label
//                       htmlFor="remember"
//                       className="text-sm text-muted-foreground"
//                     >
//                       Remember me
//                     </label>
//                   </div>
//                   <Link to="#" className="text-sm text-primary hover:underline">
//                     Forgot Password?
//                   </Link>
//                 </div>
//                 <Button type="submit" className="w-full">
//                   Sign In
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
//             <a href="#privacy" className="hover:underline">
//               Privacy
//             </a>
//             <a href="#support" className="hover:underline">
//               Support
//             </a>
//             <a href="#faqs" className="hover:underline">
//               FAQs
//             </a>
//           </nav>
//         </div>
//       </footer>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { toast } from "sonner";
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

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("novapath_remember");
      if (saved) {
        const { email: savedEmail } = JSON.parse(saved);
        if (savedEmail) {
          setEmail(savedEmail);
          setRemember(true);
        }
      }
    } catch {}
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return toast.error("Enter email and password");

    let profile: any = null;
    try {
      const raw = localStorage.getItem("novapath_profile");
      profile = raw ? JSON.parse(raw) : null;
    } catch {}
    if (!profile) return toast.error("No account found. Please sign up.");
    if (profile.email !== email)
      return toast.error("Email not found. Check or create an account.");

    if (remember) {
      try {
        localStorage.setItem("novapath_remember", JSON.stringify({ email }));
      } catch {}
    } else {
      try {
        localStorage.removeItem("novapath_remember");
      } catch {}
    }

    toast.success("Welcome back! Redirecting...");
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-5xl h-14 px-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-primary">NovaPath</Link>
          <p className="text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
          </p>
        </div>
      </header>

      <main className="flex-1 grid place-items-center px-4 py-10 bg-gradient-to-b from-emerald-50/30 to-blue-50/20">
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl w-full items-center">
          {/* Illustration */}
          <div className="hidden md:block">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <svg viewBox="0 0 500 320" className="w-full h-auto">
                <rect x="0" y="0" width="500" height="320" rx="20" fill="#f0f9ff"/>
                <g>
                  <path d="M80 120 L150 90 L220 120 L150 150 Z" fill="#93c5fd"/>
                  <rect x="140" y="150" width="20" height="40" fill="#93c5fd"/>
                  <circle cx="300" cy="200" r="50" fill="#bbf7d0"/>
                  <polyline points="260,220 300,180 340,200" fill="none" stroke="#34d399" strokeWidth="6"/>
                </g>
              </svg>
              <p className="mt-3 text-sm text-muted-foreground">
                Learn, plan, and track your journey to success.
              </p>
            </div>
          </div>

          {/* Form */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>Sign in to continue your journey.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Email</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Password</label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                    <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
                  </div>
                  <Link to="#" className="text-sm text-primary hover:underline">Forgot Password?</Link>
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="text-muted-foreground">© {new Date().getFullYear()} NovaPath</div>
          <nav className="flex items-center gap-4">
            <a href="#privacy" className="hover:underline">Privacy</a>
            <a href="#support" className="hover:underline">Support</a>
            <a href="#faqs" className="hover:underline">FAQs</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
