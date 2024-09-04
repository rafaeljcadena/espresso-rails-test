import SignUp from "../../../app/javascript/components/App/SignUp";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('SignUp component', () =>{
  it('should render correctly', () => {
    render(<SignUp />)
    
    expect(screen.getByText('Informe seus dados pessoais'));
  });
});