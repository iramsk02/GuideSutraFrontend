
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { GraduationCap, Landmark, Briefcase, Beaker } from "lucide-react";

// Types
type Branch = "degree" | "higher" | "govt" | "private";

type NodeMeta = {
  salary?: string;
  skills?: string[];
  opportunities?: string[];
};

type TreeNode = {
  id: string;
  label: string;
  branch: Branch;
  meta?: NodeMeta;
  children?: TreeNode[];
};

// Demo roadmap fallback
const DEMO_TREE: TreeNode = {
  id: "demo-degree",
  label: "B.Tech CSE",
  branch: "degree",
  meta: {
    salary: "₹6–12 LPA",
    skills: ["DSA", "Web", "DBMS"],
    opportunities: ["Internships", "Hackathons"],
  },
  children: [
    {
      id: "demo-college",
      label: "IIT Jammu",
      branch: "higher",
      meta: { opportunities: ["Clubs", "Labs"] },
      children: [
        {
          id: "demo-govt",
          label: "Govt IT Officer",
          branch: "govt",
          meta: { salary: "₹7–10 LPA" },
        },
        {
          id: "demo-private",
          label: "Software Engineer",
          branch: "private",
          meta: { salary: "₹10–30 LPA" },
        },
        {
          id: "demo-higher",
          label: "M.Tech AI",
          branch: "higher",
          meta: { opportunities: ["Research", "TAship"] },
        },
      ],
    },
  ],
};

function cloneWithPrefix(t: TreeNode, prefix: string): TreeNode {
  return {
    ...t,
    id: `${prefix}${t.id}`,
    children: t.children?.map((c) => cloneWithPrefix(c, prefix)),
  };
}

type PositionedNode = TreeNode & { x: number; y: number; depth: number };
type Edge = { from: PositionedNode; to: PositionedNode };

// Colors per branch
const BRANCH_COLORS: Record<
  Branch,
  { stroke: string; bg: string; text: string; border: string }
> = {
  degree: {
    stroke: "#64748b",
    bg: "bg-slate-50",
    text: "text-slate-800",
    border: "border-slate-200",
  },
  higher: {
    stroke: "#3b82f6",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  govt: {
    stroke: "#10b981",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  private: {
    stroke: "#fb923c",
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
};

function branchIcon(b: Branch) {
  switch (b) {
    case "degree":
      return <GraduationCap className="h-4 w-4" />;
    case "higher":
      return <Beaker className="h-4 w-4" />;
    case "govt":
      return <Landmark className="h-4 w-4" />;
    case "private":
      return <Briefcase className="h-4 w-4" />;
  }
}

// Layout function (same as before)
function layoutTree(root: TreeNode) {
  const nodeSize = { w: 220, h: 64 };
  const xGap = 260,
    yGap = 90;

  type Tmp = Omit<TreeNode, "children"> & {
    depth: number;
    width: number;
    x?: number;
    y?: number;
    children?: Tmp[];
  };
  function annotate(n: TreeNode, depth = 0): Tmp {
    const nn: Tmp = { ...(n as any), depth, width: 1 };
    if (n.children?.length) {
      const kids = n.children.map((c) => annotate(c, depth + 1));
      nn.width = kids.reduce((acc, k) => acc + k.width, 0);
      nn.children = kids;
    }
    return nn;
  }
  const a = annotate(root);

  let currentY = 0;
  function position(n: Tmp) {
    if (!n.children || n.children.length === 0) {
      n.y = currentY * yGap;
      currentY++;
    } else {
      n.children.forEach(position);
      const ys = n.children.map((c) => c.y!);
      n.y = (Math.min(...ys) + Math.max(...ys)) / 2;
    }
    n.x = n.depth * xGap;
  }
  position(a);

  const nodes: PositionedNode[] = [];
  const edges: Edge[] = [];
  function flatten(n: Tmp) {
    nodes.push({ ...(n as any), x: n.x!, y: n.y!, depth: n.depth });
    n.children?.forEach((c) => {
      edges.push({ from: n as any, to: c as any });
      flatten(c);
    });
  }
  flatten(a);

  const minY = Math.min(...nodes.map((n) => n.y));
  nodes.forEach((n) => (n.y = n.y - minY + 20));
  const width = Math.max(...nodes.map((n) => n.x)) + nodeSize.w + 40;
  const height = Math.max(...nodes.map((n) => n.y)) + nodeSize.h + 40;

  return { nodes, edges, size: { width, height }, nodeSize };
}

// Node View Component
function NodeView({
  n,
  selected,
  onSelect,
}: {
  n: PositionedNode;
  selected?: boolean;
  onSelect: (n: PositionedNode) => void;
}) {
  const colors = BRANCH_COLORS[n.branch];
  return (
    <foreignObject x={n.x} y={n.y} width={220} height={64}>
      <div
        onClick={() => onSelect(n)}
        className={`cursor-pointer ${colors.bg} ${colors.border} border rounded-md shadow-sm px-3 py-2 flex items-start gap-2 hover:shadow-md transition-shadow ${selected ? "ring-2 ring-primary" : ""}`}
      >
        <div className={`rounded-md p-1.5 ${colors.text} bg-white/60`}>
          {branchIcon(n.branch)}
        </div>
        <div className="min-w-0">
          <p className={`text-sm font-medium leading-tight ${colors.text}`}>
            {n.label}
          </p>
          {n.meta?.salary && (
            <p className="text-xs text-muted-foreground truncate">{`Avg: ${n.meta.salary}`}</p>
          )}
        </div>
      </div>
    </foreignObject>
  );
}

// Main Component
export default function CareerPathway() {
  const [degreeTrees, setDegreeTrees] = useState<
    { id: string; label: string; tree: TreeNode }[]
  >([]);
  const [degreeId, setDegreeId] = useState<string | null>(null);
  const [selected, setSelected] = useState<PositionedNode | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch recommendation mapping from backend (gracefully fallback to demo)
  useEffect(() => {
    if (!apiUrl) return;
    const controller = new AbortController();

    fetch(`${apiUrl}/recommendation-mapping`, { signal: controller.signal })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error("Failed response")),
      )
      .then((data) => {
        const trees: typeof degreeTrees = Object.entries(data).map(
          ([careerName, courses]) => {
            const children = Object.entries(
              courses as Record<string, string[]>,
            ).map(([courseName, colleges]) => ({
              id: `${careerName}-${courseName}`,
              label: courseName,
              branch: "degree" as Branch,
              children: (colleges as string[]).map((col) => ({
                id: `${careerName}-${courseName}-${col}`,
                label: col,
                branch: "higher" as Branch,
                meta: { opportunities: ["Available here"] },
              })),
            }));
            return {
              id: careerName,
              label: careerName,
              tree: {
                id: careerName,
                label: careerName,
                branch: "degree",
                children,
              },
            };
          },
        );
        setDegreeTrees(trees);
        if (trees.length) setDegreeId(trees[0].id);
      })
      .catch(() => {
        // Silent fallback to demo roadmap
        setDegreeTrees([]);
        setDegreeId(null);
      });

    return () => controller.abort();
  }, [apiUrl]);

  const currentTree = useMemo(
    () => degreeTrees.find((d) => d.id === degreeId)?.tree,
    [degreeTrees, degreeId],
  );
  const demoLayout = useMemo(() => layoutTree(DEMO_TREE), []);
  const liveLayout = useMemo(
    () => (currentTree ? layoutTree(currentTree) : null),
    [currentTree],
  );

  return (
    <div className="ml-60 grid gap-6 lg:grid-cols-1 mt-20">
      {/* Left Filters */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Select Career → See Pathways</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Career</label>
              <Select value={degreeId || ""} onValueChange={setDegreeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose career" />
                </SelectTrigger>
                <SelectContent>
                  {degreeTrees.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Legend</p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Colleges
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />{" "}
                  Courses
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Center Diagram */}
      <Card className="w-full">
        <CardHeader className="pb-0">
          <CardTitle>Career Roadmap</CardTitle>
          <CardDescription>
            Interactive flowchart. Click a node to see details.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Demo Roadmap</h4>
            <div className="relative">
              <svg
                width={demoLayout.size.width}
                height={demoLayout.size.height}
                className="max-w-none"
              >
                {demoLayout.edges.map((e, idx) => {
                  const c = BRANCH_COLORS[e.to.branch];
                  const x1 = e.from.x + 220;
                  const y1 = e.from.y + demoLayout.nodeSize.h / 2;
                  const x2 = e.to.x;
                  const y2 = e.to.y + demoLayout.nodeSize.h / 2;
                  const mx = (x1 + x2) / 2;
                  return (
                    <path
                      key={`demo-edge-${idx}`}
                      d={`M ${x1},${y1} C ${mx},${y1} ${mx},${y2} ${x2},${y2}`}
                      stroke={c.stroke}
                      strokeWidth={2}
                      fill="none"
                    />
                  );
                })}
                {demoLayout.nodes.map((n) => (
                  <NodeView
                    key={`demo-${n.id}`}
                    n={n}
                    selected={selected?.id === n.id}
                    onSelect={setSelected}
                  />
                ))}
              </svg>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Live Roadmap</h4>
            {!liveLayout ? (
              <p className="text-sm text-muted-foreground">
                Choose a career to view the live roadmap.
              </p>
            ) : (
              <div className="relative">
                <svg
                  width={liveLayout.size.width}
                  height={liveLayout.size.height}
                  className="max-w-none"
                >
                  {liveLayout.edges.map((e, idx) => {
                    const c = BRANCH_COLORS[e.to.branch];
                    const x1 = e.from.x + 220;
                    const y1 = e.from.y + liveLayout.nodeSize.h / 2;
                    const x2 = e.to.x;
                    const y2 = e.to.y + liveLayout.nodeSize.h / 2;
                    const mx = (x1 + x2) / 2;
                    return (
                      <path
                        key={`live-edge-${idx}`}
                        d={`M ${x1},${y1} C ${mx},${y1} ${mx},${y2} ${x2},${y2}`}
                        stroke={c.stroke}
                        strokeWidth={2}
                        fill="none"
                      />
                    );
                  })}
                  {liveLayout.nodes.map((n) => (
                    <NodeView
                      key={`live-${n.id}`}
                      n={n}
                      selected={selected?.id === n.id}
                      onSelect={setSelected}
                    />
                  ))}
                </svg>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Right Details */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>
              Information about the selected node
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selected ? (
              <p className="text-sm text-muted-foreground">
                Select any node to see details.
              </p>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-md p-2 ${BRANCH_COLORS[selected.branch].bg} ${BRANCH_COLORS[selected.branch].border} border`}
                  >
                    {branchIcon(selected.branch)}
                  </div>
                  <div>
                    <p className="font-medium leading-tight">
                      {selected.label}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {selected.branch}
                    </p>
                  </div>
                </div>
                {selected.meta?.salary && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      Average salary:
                    </span>{" "}
                    {selected.meta.salary}
                  </div>
                )}
                {selected.meta?.skills && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {selected.meta.skills.map((s) => (
                        <Badge key={s} variant="outline">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selected.meta?.opportunities && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Opportunities:
                    </p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {selected.meta.opportunities.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
