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
    <div>
      <h1>404 - Page Not Found</h1>
      {/* Render your 404 content here */}
      {/* {errorMessage && <p>Error: {errorMessage}</p>} */}
    </div>
  );
}

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Your404Content />
    </Suspense>
  );
}