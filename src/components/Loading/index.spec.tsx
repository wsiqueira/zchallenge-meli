import { render, screen } from '@testing-library/react';

import { Loading } from './index';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('Loading component', () => {
  it('should render default variant with a LoaderCircle', () => {
    render(<Loading variant="default" />);

    const loader = screen.getByTestId("loading-default");
    expect(loader).toHaveClass('animate-spin');
  });

  it('should render lightsaber variant with a div having class "lightsaber"', () => {
    render(<Loading variant="lightsaber" />);

    const loader = screen.getByTestId("loading-lightsaber");
    expect(loader).toBeInTheDocument();
  });

  it('should render spaceship variant with an Image component', () => {
    render(<Loading variant="spaceship" />);

    const loader = screen.getByTestId("loading-spaceship");
    expect(loader).toHaveAttribute('src', '/img_x-wing.gif');
  });
});
