
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
    // When the pathname or searchParams change, this means navigation has likely completed.
    NProgress.done();
    // NProgress.start() is now handled by individual link clicks in the Header.
  }, [pathname, searchParams]);

  return null;
}
