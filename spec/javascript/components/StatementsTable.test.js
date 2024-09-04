import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatementsTable from "../../../app/javascript/components/App/Statements/components/StatementsTable";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('StatementsTable component', () =>{
  it('should render correctly', () => {
    render(<StatementsTable />)
    
    expect(screen.getByText('Carregando...'));
  });
});