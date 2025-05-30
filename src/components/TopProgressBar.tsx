
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

export function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
  }, []);

  useEffect(() => {
    // When the pathname or searchParams change, the new page/route is rendering.
    // We call NProgress.done() here to signal that the navigation is complete
    // from NProgress's perspective.
    NProgress.done();

    return () => {
      // The cleanup function runs when the dependencies (pathname, searchParams) are about to change,
      // or when the component unmounts. This is where we start NProgress for the upcoming navigation.
      NProgress.start();
    };
  }, [pathname, searchParams]);

  return null;
}
