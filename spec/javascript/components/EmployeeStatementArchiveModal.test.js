import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatementArchiveModal from "../../../app/javascript/components/App/EmployeeStatements/components/StatementArchiveModal";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('StatementArchiveModal component', () =>{
  it('should render correctly', () => {
    render(<StatementArchiveModal open />)
    
    expect(screen.getByText('Arquivar despesa'));
  });
});