// Standard return shape of every Server Action. `E` narrows `error` to a closed list of codes.
export type ActionResult<T, E extends string = string> =
  | { success: true; data: T }
  | { success: false; error: E; fieldErrors?: Record<string, string[]> };
