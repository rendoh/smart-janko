import { useEffect, useMemo, useState } from 'react';

/**
 * Client side only.
 */
export function useMediaQuery(query: string) {
  const mediaQueryList = useMemo(() => window.matchMedia(query), [query]);
  const [isMatch, setIsMatch] = useState(mediaQueryList.matches);
  useEffect(() => {
    const handleMediaQueryChange = ({ matches }: MediaQueryListEvent) =>
      setIsMatch(matches);
    mediaQueryList.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, [mediaQueryList]);

  return isMatch;
}
