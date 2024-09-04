import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UsersLine from "../../../app/javascript/components/App/Users/components/UsersLine";

describe('UsersLine component', () =>{
  it('should render correctly', async () => {
    render(<UsersLine />)
    
    expect(screen.getByText('Carregando...'));
  });
});