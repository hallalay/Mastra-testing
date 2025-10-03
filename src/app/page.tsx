import { Chat } from "@/components/Chat";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <header className="border-b border-black/10 dark:border-white/10 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="font-semibold tracking-tight">Mastra Chat</div>
        </div>
      </header>
      <Chat />
    </div>
  );
}
