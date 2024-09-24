import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./";


describe('App component', () => {
  it('should render correctly', () => {
    render(<App />)

    expect(screen.getByText('Logar no Espresso'));
  });
});