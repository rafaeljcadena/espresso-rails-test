import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewCardModal from "../../../app/javascript/components/App/Cards/components/NewCardModal";

describe('NewCardModal component', () =>{
  it('should render correctly', async () => {
    render(<NewCardModal open />)
    
    expect(screen.getByText('Cadastrar cartão'));
  });
});