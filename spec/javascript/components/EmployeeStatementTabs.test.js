import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatementTabs from "../../../app/javascript/components/App/EmployeeStatements/components/StatementTabs";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('StatementTabs component', () =>{
  it('should render correctly', () => {
    render(<StatementTabs />)
    
    expect(screen.getByText('Não comprovadas'));
  });
});