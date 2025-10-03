"use server";

import { mastra } from "../mastra";

export async function chat(prompt: string, threadId?: string) {
  const agent = mastra.getAgent("testAgent");
  const result = await agent.generate(prompt, {
    memory: {
      resource: "user",
      thread: "preference_thread"
    }
  });
  const text = await result.text;
  return { text };
}
