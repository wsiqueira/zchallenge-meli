import { Suspense } from 'react';

import PageCharactersContent from './content';

export default function PageCharacters() {
  return (
    <Suspense>
      <PageCharactersContent />
    </Suspense>
  );
}
