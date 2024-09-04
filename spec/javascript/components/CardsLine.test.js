import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardsLine from "../../../app/javascript/components/App/Cards/components/CardsLine";

describe('CardsLine component', () =>{
  it('should render correctly', async () => {
    render(<CardsLine />)
    
    expect(screen.getByText('Até o momento, não há cartões cadastrados.'));
  });
});