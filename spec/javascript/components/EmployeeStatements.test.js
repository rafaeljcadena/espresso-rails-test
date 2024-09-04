import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmployeeStatements from "../../../app/javascript/components/App/EmployeeStatements";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('EmployeeStatements component', () =>{
  it('should render correctly', () => {
    render(<EmployeeStatements />)
    
    expect(screen.getByText('Despesas'));
  });
});