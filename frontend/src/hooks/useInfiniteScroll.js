import { useCallback, useRef } from "react";

/**
 * Infinite scroll hook — returns a ref callback that triggers
 * loadMore when the observed element enters the viewport.
 */
export function useInfiniteScroll(loadMore, hasMore, isLoading) {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadMore, hasMore, isLoading]
  );

  return lastElementRef;
}
