

// export default StudentLayout;
import type { ReactNode } from "react";
import {  useEffect, useMemo, useState } from "react";
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
} from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge"
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
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
import Chatbot from "../Chatbot";

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
    <div className="page-container">
      <SidebarProvider>
        <Sidebar className="border-r border-sidebar-border w-60 shadow-lg" collapsible="icon">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20 shadow-md">
                <AvatarImage src="/Profile.png" alt="Student" />
                <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                  {profile?.name?.split(' ').map(n => n[0]).join('') || 'GS'}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate text-foreground">
                    {profile?.name || "Guest"}
                  </span>
                  {profile?.grade && (
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {profile.grade}
                    </Badge>
                  )}
                  {profile?.role && (
                    <Badge variant="outline" className="shrink-0 capitalize text-xs">
                      {profile.role}
                    </Badge>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {interests.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-accent/40 border-transparent text-foreground/80 text-xs px-2 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wide text-muted-foreground/80 px-2 py-1">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {nav.map(({ to, label, icon: Icon }) => {
                    const isAssessment = to === "/career-quiz";
                    return (
                      <SidebarMenuItem key={to}>
                        <NavLink to={to} className="block z-10">
                          {({ isActive }) => (
                            <SidebarMenuButton
                              isActive={isActive}
                              className={`
                                group relative transition-all duration-200 hover:bg-accent/50
                                ${isAssessment
                                  ? "bg-amber-50/80 text-amber-900 border border-amber-200 ring-2 ring-amber-200 shadow-sm hover:bg-amber-100"
                                  : isActive
                                    ? "bg-primary/10 text-primary border-primary/20"
                                    : "hover:bg-accent/50"
                                }
                              `}
                            >
                              <Icon
                                className={`
                                  transition-colors duration-200
                                  ${isAssessment
                                    ? "text-amber-600"
                                    : isActive
                                      ? "text-primary"
                                      : "text-muted-foreground group-hover:text-foreground"
                                  }
                                `}
                              />
                              <span className="font-medium">{label}</span>
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
          <SidebarFooter className="p-4">
            <Link to="/scholarships" className="block">
              <Button className="w-full gradient-primary hover:opacity-90 transition-opacity duration-200 shadow-md">
                <Sparkles className="mr-2 h-4 w-4" />
                Explore Scholarships
              </Button>
            </Link>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <div className="fixed ml-60 top-0 z-10 w-screen glass-effect border-b shadow-sm">
            <div className="flex h-14 items-center gap-3 px-6">
              <Separator orientation="vertical" className="mr-2 h-6" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-primary">
                  GuideSutra
                </span>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm text-foreground/80 font-medium">{title}</span>
              </div>
            </div>
          </div>
          <div className="page-content animate-fade-in">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Chatbot />
    </div>
  );
}

export default StudentLayout;