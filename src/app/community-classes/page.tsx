import { Suspense } from 'react';
import CommunityClasses from './CommunityClasses';

export default function CommunityClassesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommunityClasses />
    </Suspense>
  );
}
