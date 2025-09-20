

import { Link, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { Loader } from "lucide-react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Load saved email if "remember me" was checked
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
    } catch (err) {
      console.error("Failed to load remembered email", err);
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Enter email and password");
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // ✅ include password
      });

      const data = await response.json();
      console.log("API response:", data);

      if (!response.ok) {
        return toast.error(data.error || "Signin failed");
      }

      // Save "remember me" info
      if (remember) {
        localStorage.setItem("novapath_remember", JSON.stringify({ email }));
      } else {
        localStorage.removeItem("novapath_remember");
      }

      // Save user profile locally
      localStorage.setItem("novapath_profile", JSON.stringify(data.user));

      toast.success("Welcome back! Redirecting...");
      navigate("/dashboard", { replace: true });

    } catch (err: any) {
      console.error(err);
      toast.error("Server error. Try again later.");
    } finally {
      setIsLoading(false); // stop loader
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="w-full glass-effect border-b shadow-sm">
        <div className="mx-auto max-w-6xl h-16 px-6 flex items-center justify-between">
          <Link to="/" className="font-bold text-2xl text-gradient">GuideSutra</Link>
          <p className="text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">Create an account</Link>
          </p>
        </div>
      </header>

      <main className="flex-1 grid place-items-center px-6 py-12">
        <div className="grid gap-12 md:grid-cols-2 max-w-6xl w-full items-center">
          {/* Illustration */}
          <div className="hidden md:block animate-fade-in">
            <div className="rounded-3xl border bg-white/80 backdrop-blur-sm p-8 shadow-lg">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                🎓
              </div>
              <h3 className="text-2xl font-bold text-center text-foreground mb-4">
                Your Career Journey Starts Here
              </h3>
              <p className="text-center text-muted-foreground leading-relaxed">
                Join thousands of students who have discovered their perfect career path with our personalized guidance and comprehensive resources.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/5">
                  <div className="text-2xl font-bold text-primary">70+</div>
                  <div className="text-sm text-muted-foreground">Colleges</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/5">
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Careers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-slide-up">
            <CardHeader className="pb-6 text-center">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription className="text-base">Sign in to continue your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-12 focus-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 focus-ring"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={remember}
                      onCheckedChange={(v) => setRemember(Boolean(v))}
                    />
                    <label htmlFor="remember" className="text-sm text-muted-foreground">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" className="w-full h-12 gradient-primary hover:opacity-90 font-semibold" disabled={isLoading}>
                  {isLoading ? <Loader className="animate-spin mr-2 h-4 w-4" /> : "Sign In"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="text-muted-foreground">© {new Date().getFullYear()} GuideSutra</div>
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
