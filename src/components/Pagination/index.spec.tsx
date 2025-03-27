import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { Pagination } from './index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe.only('Pagination component', () => {
  let pushMock: jest.Mock;
  let searchParamsMock: URLSearchParams;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  // beforeEach(() => {
  //   // Reset the mocks before each test
  //   pushMock = jest.fn();
  //   searchParamsMock = new URLSearchParams();
  //   (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  //   (useSearchParams as jest.Mock).mockReturnValue(searchParamsMock);
  // });


  it('should render pagination with correct number of pages', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    const itemsTotal = 50;
    const itemsPerPage = 10;

    render(<Pagination itemsTotal={itemsTotal} itemsPerPage={itemsPerPage} />);

    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks).toHaveLength(5);
  });

  it('should call setParams and update the URL when a page is clicked', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('page=1'));

    const itemsTotal = 50;
    const itemsPerPage = 10;

    render(<Pagination itemsTotal={itemsTotal} itemsPerPage={itemsPerPage} />);

    const page2Link = screen.getByText('2');
    fireEvent.click(page2Link);

    expect(pushMock).toHaveBeenCalledWith('?page=2');
  });

  it('should disable the previous button on the first page', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('page=1'));

    const itemsTotal = 50;
    const itemsPerPage = 10;

    render(<Pagination itemsTotal={itemsTotal} itemsPerPage={itemsPerPage} />);

    const prevButton = screen.getByLabelText('previous');
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('should disable the next button on the last page', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('page=5'));

    const itemsTotal = 50;
    const itemsPerPage = 10;

    render(<Pagination itemsTotal={itemsTotal} itemsPerPage={itemsPerPage} />);

    const nextButton = screen.getByLabelText('next');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render the correct page numbers with ellipses', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('page=3'));

    const itemsTotal = 100;
    const itemsPerPage = 10;

    render(<Pagination itemsTotal={itemsTotal} itemsPerPage={itemsPerPage} />);

    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks).toHaveLength(5);
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('should not navigate to invalid pages', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('page=1'));

    const itemsTotal = 50;
    const itemsPerPage = 10;

    render(<Pagination itemsTotal={itemsTotal} itemsPerPage={itemsPerPage} />);

    const page6Link = screen.queryByText('6');
    expect(page6Link).not.toBeInTheDocument();
  });
});
