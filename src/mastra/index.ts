import { Mastra } from "@mastra/core/mastra";
import { testAgent } from './agents/test-agent';
import { LibSQLStore } from "@mastra/libsql";
 
export const mastra = new Mastra({
  // ...
  agents: { testAgent },
  storage: new LibSQLStore({
    url: "file:agent-memory.db"
  })
});