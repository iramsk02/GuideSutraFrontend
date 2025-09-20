

// export default StudentLayout;
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Link,
  NavLink,
  useLocation,
  useInRouterContext,
} from "react-router-dom";
import {
  Bell,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  School,
  Sparkles,
  UsersRound,
  HeartHandshake,
  Brain,
  CalendarDays,
} from "lucide-react";
import Chatbot from "@/components/Chatbot";

type Profile = {
  name?: string;
  grade?: string;
  interests?: string[];
  role?: string;
};
const defaultInterests = ["AI", "Robotics", "Math", "Entrepreneurship"];

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/career-quiz", label: "Assessment", icon: Brain },

  { to: "/career-pathway", label: "Career Pathway", icon: GraduationCap },
  { to: "/colleges", label: "Colleges", icon: School },
  { to: "/timeline", label: "Timeline", icon: CalendarDays },
  { to: "/scholarships", label: "Scholarships", icon: BookOpen },
  { to: "/resources", label: "Resources", icon: BookOpen },
  { to: "/mentorship", label: "Mentorship", icon: UsersRound },
  { to: "/parents", label: "Parents", icon: HeartHandshake },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

export function StudentLayout({ children }: { children: ReactNode }) {
  const inRouter = useInRouterContext();
  const location = inRouter ? useLocation() : ({} as any);
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("novapath_profile");
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);
  const interests = (
    profile?.interests && profile.interests.length
      ? profile.interests
      : defaultInterests
  ).slice(0, 4);
  const title = useMemo(() => {
    if (!inRouter) return "Dashboard";
    const found = nav.find((n) => n.to === location.pathname);
    return found?.label ?? "Dashboard";
  }, [inRouter, (location as any).pathname]);

  if (!inRouter) {
    return <div className="px-6 py-6">{children}</div>;
  }

  const path = (location as any)?.pathname || "";
  const [bypass, setbypass] = useState();
  useEffect(() => {
    setbypass(path);
  }, [path]);
  // const bypass =
  //   path.startsWith("/") ||
  //   path.startsWith("/signup") ||
  //   path.startsWith("/signin");
  console.log(path, bypass);
  if (bypass == "/signup" || bypass == "/signin" || bypass == "/") {
    return (
      <>
        {children}
        {/* <Chatbot /> */}
      </>
    );
  }

  return (
    <>
      <SidebarProvider>
        <Sidebar className="border-r border-sidebar-border " collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-3 p-2">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                <AvatarImage src="/Profile.png" alt="Student" />
                <AvatarFallback>IS</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">
                    {profile?.name || "Guest"}
                  </span>
                  {profile?.grade ? (
                    <Badge variant="secondary" className="shrink-0">
                      {profile.grade}
                    </Badge>
                  ) : null}
                  {profile?.role ? (
                    <Badge variant="outline" className="shrink-0 capitalize">
                      {profile.role}
                    </Badge>
                  ) : null}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {interests.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-accent/40 border-transparent text-foreground/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wide text-muted-foreground/80">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.map(({ to, label, icon: Icon }) => {
                    const isAssessment = to === "/career-quiz";
                    return (
                      <SidebarMenuItem key={to}>
                        <NavLink to={to} className="block">
                          {({ isActive }) => (
                            <SidebarMenuButton
                              isActive={isActive}
                              className={
                                isAssessment
                                  ? "relative bg-amber-50/80 text-amber-900 border border-amber-200 ring-2 ring-amber-200 shadow-sm hover:bg-amber-100"
                                  : undefined
                              }
                            >
                              <Icon
                                className={
                                  isAssessment
                                    ? "text-amber-600"
                                    : "text-muted-foreground"
                                }
                              />
                              <span>{label}</span>
                              {isAssessment && (
                                <span className="ml-auto inline-flex items-center rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-medium text-amber-900 animate-pulse">
                                  Start here
                                </span>
                              )}
                            </SidebarMenuButton>
                          )}
                        </NavLink>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <div className="p-2">
              <Link to="/scholarships">
                <Button className="w-full" variant="default">
                  <Sparkles className="mr-2" /> Explore Scholarships
                </Button>
              </Link>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <div className="fixed  top-0 z-10 w-screen bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="flex h-14 items-center gap-3 px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-6" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-primary">
                  GuideSutra
                </span>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm text-foreground/80">{title}</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-6 lg:px-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <Chatbot />
    </>
  );
}

export default StudentLayout;