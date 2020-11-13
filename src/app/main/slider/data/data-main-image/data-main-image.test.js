import React from "react";
import { toHaveAttribute } from "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import MainImageAtom from './data-main-image.atom';
// import ReactDOM from "react-dom";

expect.extend({ toHaveAttribute });
const exampleUrl = "https://dummyimage.com/500x500/000000/fff";

it("MainImageAtom receives an url as a string", () => {
  const { getByRole } = render(<MainImageAtom url={exampleUrl} />);
  expect(getByRole("img")).toHaveAttribute(
    "src",
    expect.stringContaining(exampleUrl)
  );
});

it("MainImageAtom snapshot example", () => {
  const tree = renderer.create(<MainImageAtom url={exampleUrl} />).toJSON();
  expect(tree).toMatchSnapshot();
});
