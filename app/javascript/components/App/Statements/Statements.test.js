import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Statements from "./";

describe('Statements component', () =>{
  it('should render correctly', () => {
    render(<Statements />)
    
    expect(screen.getByText('Despesas'));
  });
});