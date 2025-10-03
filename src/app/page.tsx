"use client";

import { useEffect, useRef, useState } from "react";
import { chat } from "./actions";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! Ask me anything.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  async function handleSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const prompt = input.trim();
    if (!prompt || loading) return;
    setInput("");
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    try {
      const data = await chat(prompt);
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.text ?? "",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="border-b border-black/10 dark:border-white/10 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="font-semibold tracking-tight">Mastra Chat</div>
        </div>
      </header>

      <main className="px-6">
        <div ref={listRef} className="max-w-3xl mx-auto h-[calc(100dvh-200px)] overflow-y-auto py-6 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.role === "user"
                    ? "bg-foreground text-background px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] whitespace-pre-wrap"
                    : "bg-black/5 dark:bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] whitespace-pre-wrap"
                }
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-black/5 dark:bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm">Thinking…</div>
            </div>
          )}
        </div>
      </main>

      <form onSubmit={handleSend} className="px-6 pb-6">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message…"
            className="flex-1 h-12 px-4 rounded-full border border-black/10 dark:border-white/10 bg-background focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
          />
          <button
            type="submit"
            disabled={loading || input.trim().length === 0}
            className="h-12 px-5 rounded-full bg-foreground text-background disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
