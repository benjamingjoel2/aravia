"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * State mirrored to the query string, without suspending server rendering:
 * the page renders with `initial`, then adopts the URL after mount. Updates use history.replaceState.
 */
export function useUrlState<T>(parse: (params: URLSearchParams) => T, serialize: (value: T) => URLSearchParams, initial: T) {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    setValue(parse(new URLSearchParams(window.location.search)));
    // Parse once on mount; later changes come from this hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback(
    (next: T) => {
      setValue(next);
      // Keep commas readable in shared links.
      const qs = serialize(next).toString().replace(/%2C/g, ",");
      window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
    },
    [serialize],
  );

  return [value, update] as const;
}
