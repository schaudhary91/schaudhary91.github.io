'use client';

import { Suspense } from 'react';

// Assuming your 404 page component is structured like this
// Replace 'Your404Content' with the actual component or JSX
function Your404Content() {
  // Your existing 404 page content that might use useSearchParams()
  // Example:
  // const searchParams = useSearchParams();
  // const errorMessage = searchParams.get('message');
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        The page you are looking for does not exist.
      </p>
      {/* Ensure any content here using client-side hooks like useSearchParams is correctly client-side */}
      {/* Example: {errorMessage && <p className="text-destructive">{errorMessage}</p>} */}
    </div>
  );
}

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-[calc(100vh-200px)]">Loading...</div>}>
      <Your404Content />
    </Suspense>
  );
}