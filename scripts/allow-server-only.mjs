/**
 * Preload for CLI scripts that import server code outside Next.js.
 *
 * `server-only` throws unless resolved with the "react-server" condition, but enabling that
 * condition globally breaks react-dom/server (React Email rendering) and the next-intl entry.
 * This hook applies it to `server-only` alone.
 */
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "server-only") {
      return nextResolve(specifier, {
        ...context,
        conditions: [...context.conditions, "react-server"],
      });
    }
    return nextResolve(specifier, context);
  },
});
