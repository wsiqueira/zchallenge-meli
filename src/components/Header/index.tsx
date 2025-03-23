import { HeaderNav } from './HeaderNav';

const headerNavData = [
  { href: '/', label: 'Characters' },
  { href: '/planets', label: 'Planets' },
  { href: '/favorites', label: 'Favorites' },
];

export function Header() {
  return (
    <header className="p-4 bg-neutral-100 sticky top-0 z-10">
      <div className="container flex items-center justify-between gap-2 mx-auto">
        <div>[LOGO]</div>

        <HeaderNav data={headerNavData} />
      </div>
    </header>
  );
}
