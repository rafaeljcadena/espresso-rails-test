import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Statements from "../../../app/javascript/components/App/Statements";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('Statements component', () =>{
  it('should render correctly', () => {
    render(<Statements />)
    
    expect(screen.getByText('Despesas'));
  });
});