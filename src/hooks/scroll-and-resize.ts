// Runs `listener` now and on every scroll and resize of the window; returns the cleanup of an effect.
export function listenToScrollAndResize(listener: () => void): () => void {
  window.addEventListener("scroll", listener, { passive: true });
  window.addEventListener("resize", listener);
  listener();
  return () => {
    window.removeEventListener("scroll", listener);
    window.removeEventListener("resize", listener);
  };
}
