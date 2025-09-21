import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";
import { MessageCircle, Send, X, Bot } from "lucide-react";
import { Link } from "react-router-dom";

interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function replyFor(input: string): string {
  const text = input.toLowerCase();
  if (text.includes("scholar")) {
    return "You can find relevant scholarships and deadlines here: /scholarships";
  }
  if (text.includes("college")) {
    return "Explore colleges with filters by stream and location here: /colleges";
  }
  if (
    text.includes("quiz") ||
    text.includes("assessment") ||
    text.includes("test")
  ) {
    return "Take the career assessment to get your personalized roadmap: /career-quiz";
  }
  if (text.includes("mentor") || text.includes("guidance")) {
    return "Connect with mentors and book sessions here: /mentorship";
  }
  if (text.includes("roadmap") || text.includes("career")) {
    return "See your course-to-career roadmap here: /career-pathway";
  }
  return "I can help with Scholarships, Colleges, Mentorship, Career Quiz, and Roadmaps. Try asking about any of these!";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>(() => [
    {
      id: "m1",
      role: "assistant",
      content:
        "Hi! I'm Nova, your guide. Ask me about scholarships, colleges, or take the quiz!",
    },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const user: ChatMsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    const botText = replyFor(text);
    const bot: ChatMsg = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: botText,
    };
    setMessages((m) => [...m, user, bot]);
    setInput("");
  }

  const quick = useMemo(
    () => [
      { label: "Scholarships", to: "/scholarships" },
      { label: "Colleges", to: "/colleges" },
      { label: "Career Quiz", to: "/career-quiz" },
      { label: "Mentorship", to: "/mentorship" },
    ],
    [],
  );

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="h-14 w-14 rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 text-white transition-transform hover:scale-110"
              onClick={() => setOpen(true)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Chat with Nova</TooltipContent>
        </Tooltip>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[70vh] rounded-t-3xl bg-white/80 backdrop-blur-md border-t border-gray-200">
          <DrawerHeader className="flex items-center justify-between p-6 pb-2">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <DrawerTitle className="text-xl font-bold text-gray-900">Nova Assistant</DrawerTitle>
                <p className="text-sm text-gray-600">
                  Ask me anything about careers, colleges and scholarships.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </DrawerHeader>
          <div className="px-6 pb-6 pt-2">
            <div className="mb-4 flex flex-wrap gap-2">
              {quick.map((q) => (
                <Link key={q.to} to={q.to} onClick={() => setOpen(false)}>
                  <Button
                    variant="outline"
                    className="rounded-full h-8 px-4 text-xs bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                  >
                    {q.label}
                  </Button>
                </Link>
              ))}
            </div>
            <div className="border border-gray-200 rounded-2xl bg-white shadow-lg">
              <ScrollArea className="h-80 p-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-base ${
                        m.role === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {m.content.includes("/") ? (
                        <span>
                          {m.content.split(/(\/[a-z-]+)/gi).map((part, i) =>
                            /^\/[a-z-]+$/.test(part) ? (
                              <Link
                                key={i}
                                to={part}
                                className="underline text-blue-300"
                                onClick={() => setOpen(false)}
                              >
                                {part}
                              </Link>
                            ) : (
                              <span key={i}>{part}</span>
                            ),
                          )}
                        </span>
                      ) : (
                        <span>{m.content}</span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </ScrollArea>
              <div className="flex items-center gap-3 border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  className="flex-1 h-12 rounded-full px-4 border-gray-300"
                />
                <Button onClick={send} aria-label="Send" className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}