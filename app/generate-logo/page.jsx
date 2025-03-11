// generate-logo/page.jsx
import { Suspense } from 'react';
import GenerateLogo from './GenerateLogo';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenerateLogo />
    </Suspense>
  );
}
