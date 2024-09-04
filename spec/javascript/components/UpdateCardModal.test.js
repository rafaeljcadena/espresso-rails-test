import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpdateCardModal from "../../../app/javascript/components/App/Cards/components/UpdateCardModal";

describe('UpdateCardModal component', () =>{
  it('should render correctly', async () => {
    render(<UpdateCardModal open />)
    
    expect(screen.getByText('Associar funcionário'));
  });
});