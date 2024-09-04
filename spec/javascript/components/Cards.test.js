import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cards from "../../../app/javascript/components/App/Cards";

describe('Cards component', () =>{
  it('should render correctly', async () => {
    render(<Cards />)
    
    expect(screen.getByText('Cartões'));
  });
});