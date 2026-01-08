import { createApp } from "./app.js";
import { env } from "./infrastructure/config/env.js";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`API server running on port ${env.PORT}`);
  console.log(`Environment: ${env.NODE_ENV}`);
});
