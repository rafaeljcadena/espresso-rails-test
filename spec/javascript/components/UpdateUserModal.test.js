import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpdateUserModal from "../../../app/javascript/components/App/Users/components/UpdateUserModal";

describe('UpdateUserModal component', () =>{
  it('should render correctly', async () => {
    render(<UpdateUserModal open />)
    
    expect(screen.getByText('Editar informações'));
  });
});