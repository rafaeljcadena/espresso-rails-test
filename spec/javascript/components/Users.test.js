import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Users from "../../../app/javascript/components/App/Users";

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('Users component', () =>{
  it('should render correctly', () => {
    render(<Users />)
    
    expect(screen.getByText('Funcionários'));
  });
});