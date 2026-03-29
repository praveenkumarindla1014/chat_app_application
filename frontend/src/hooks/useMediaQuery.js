import { useState, useEffect } from "react";

/**
 * Checks if the current viewport matches a media query.
 * Useful for responsive behavior in JS.
 * Usage: const isMobile = useMediaQuery("(max-width: 768px)");
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
