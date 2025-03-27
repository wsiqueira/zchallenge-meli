import { usePathname } from 'next/navigation';
import { render, screen } from '@testing-library/react';

import { Breadcrumb } from './index';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Breadcrumb component', () => {
  it('should not render breadcrumbs when path is root', () => {
    usePathname.mockReturnValue('/');

    render(<Breadcrumb />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByText('home')).not.toBeInTheDocument();
  });

  it('should render breadcrumbs for a path with segments', () => {
    usePathname.mockReturnValue('/characters/1');

    render(<Breadcrumb />);

    expect(screen.getByRole('link', { name: 'home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'characters' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'characters' })).toHaveAttribute('href', '/characters');
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
