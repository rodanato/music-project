import React, {useContext} from "react";
// import user from "@testing-library/user-event";
import { toHaveTextContent } from "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ThemePaletteAtom from "./theme-palette.atom";
import { MainStateContext } from '../../main.state';

expect.extend({ toHaveTextContent });
const exampleName = "exampleName";

it("ThemePaletteAtom receives a name as a string", () => {
//   const mainState = useContext(MainStateContext);
//   const { getByRole } = render(<ThemePaletteAtom name={exampleName}></ThemePaletteAtom>);

//   expect(getByRole("span")).toHaveTextContent(
//     exampleName + ' Palette'
//   );
});