import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
 
export const testAgent = new Agent({
  name: "test-agent",
  instructions: "You are a helpful assistant.",
  model: openai("gpt-4o-mini"),
  memory: new Memory({
    options: {
      lastMessages: 10,
      workingMemory: {
        enabled: true
      }
    },
    storage: new LibSQLStore({
      url: "file:agent-memory.db"
    })
  }),
});