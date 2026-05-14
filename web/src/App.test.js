import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App, { soma } from "./App";

test("verificação básica", () => {
  expect(soma(1, 1)).toBe(2);
});

test("renderiza título", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /monoambiente/i })).toBeInTheDocument();
});
