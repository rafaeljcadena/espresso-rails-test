import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmployeeStatements from "./";

describe('EmployeeStatements component', () =>{
  it('should render correctly', () => {
    render(<EmployeeStatements />)
    
    expect(screen.getByText('Despesas'));
  });
});