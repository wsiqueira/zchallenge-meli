import { render, screen } from '@testing-library/react';

import { LinkList } from './index';

jest.mock('next/link', () => ({
  __esModule: true,
  default: (props: any) => {
    return <a {...props} />;
  },
}));

describe('LinkList Component', () => {
  it('should render multiple links based on data array', () => {
    const data = ['https://example.com', 'https://test.com'];
    const hrefReplace = { termFind: 'example', termReplace: 'demo' };

    render(<LinkList href="" data={data} hrefReplace={hrefReplace} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    expect(links[0]).toHaveAttribute('href', 'https://demo.com');
    expect(links[0]).toHaveTextContent('https://demo.com');

    expect(links[1]).toHaveAttribute('href', 'https://test.com');
    expect(links[1]).toHaveTextContent('https://test.com');
  });

  it('should render links with original href when no hrefReplace is provided', () => {
    const data = ['https://example.com', 'https://test.com'];

    render(<LinkList href="" data={data} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    expect(links[0]).toHaveAttribute('href', 'https://example.com');
    expect(links[0]).toHaveTextContent('https://example.com');

    expect(links[1]).toHaveAttribute('href', 'https://test.com');
    expect(links[1]).toHaveTextContent('https://test.com');
  });

  it('should render links with correct href replacement if termFind is found', () => {
    const data = ['https://example.com', 'https://example.com/page'];
    const hrefReplace = { termFind: 'example', termReplace: 'demo' };

    render(<LinkList href="" data={data} hrefReplace={hrefReplace} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    expect(links[0]).toHaveAttribute('href', 'https://demo.com');
    expect(links[0]).toHaveTextContent('https://demo.com');

    expect(links[1]).toHaveAttribute('href', 'https://demo.com/page');
    expect(links[1]).toHaveTextContent('https://demo.com/page');
  });

  it('should handle empty data array gracefully', () => {
    render(
      <LinkList
        href=""
        data={[]}
        hrefReplace={{ termFind: 'example', termReplace: 'demo' }}
      />
    );

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });
});
