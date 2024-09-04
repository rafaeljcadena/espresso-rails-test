import SignIn from "../../../app/javascript/components/App/SignIn";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('SignIn component', () =>{
  it('should render correctly', () => {
    render(<SignIn />)
    
    expect(screen.getByText('Logar no Espresso'));
  });
});