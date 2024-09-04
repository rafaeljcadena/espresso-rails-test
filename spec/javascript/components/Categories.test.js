import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Categories from "../../../app/javascript/components/App/Categories";

describe('Categories component', () =>{
  it('should render correctly', async () => {
    render(<Categories />)
    
    expect(screen.getByText('Categorias'));
  });
});