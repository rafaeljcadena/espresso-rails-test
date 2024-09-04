import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewUserModal from "../../../app/javascript/components/App/Users/components/NewUserModal";

describe('NewUserModal component', () =>{
  it('should render correctly', async () => {
    render(<NewUserModal open />)
    
    expect(screen.getByText('Cadastrar funcionário'));
  });
});