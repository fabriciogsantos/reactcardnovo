import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("<Button />", () => {
  it('should render the button with the tect "Load More"', () => {
    // arrange
    const fn = jest.fn();
    render(<Button text="Load more" disabled={false} onClick={fn} />);

    //act
    const button = screen.getByRole("button", { Name: /load mmore/i });

    // assert
    expect.assertions(1);
    expect(button).toBeInTheDocument();
  });

  it("should call function on button click", () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={false} onClick={fn} />);
    userEvent.click(screen.getByRole("button", { Name: "Load mmore" }));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={true} onClick={fn} />);

    const button = screen.getByRole("button", { Name: /load mmore/i });

    expect(button).toBeDisabled();
  });

  it("should be enabled when disabled is false", () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={false} onClick={fn} />);

    const button = screen.getByRole("button", { Name: /load mmore/i });

    expect(button).toBeEnabled();
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(
      <Button text="Load more" disabled={false} onClick={fn} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
