import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewCategoryModal from "../../../app/javascript/components/App/Categories/components/NewCategoryModal";

describe('NewCardModal component', () =>{
  it('should render correctly', async () => {
    render(<NewCategoryModal open />)
    
    expect(screen.getByText('Cadastrar categoria'));
  });
});