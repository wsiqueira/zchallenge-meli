import { Suspense } from 'react';

import PagePlanetsContent from './content';

export default function PagePlanets() {
  return (
    <Suspense>
      <PagePlanetsContent />
    </Suspense>
  );
}
