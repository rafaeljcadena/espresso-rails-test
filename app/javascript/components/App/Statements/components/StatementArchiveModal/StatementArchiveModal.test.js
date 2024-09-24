import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatementArchiveModal from "./";
import axiosClient from "../../../configs/axiosClient";

const mockArchiveRequest = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve();
}));

describe('StatementArchiveModal component', () =>{
  it('should render correctly', () => {
    render(<StatementArchiveModal open />)
    
    expect(screen.getByText('Arquivar despesa'));
  });

  it('should trigger archive request', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockArchiveRequest);
    render(
      <StatementArchiveModal 
        toggleArchiveModalOpen={jest.fn()}
        toggleRefreshData={jest.fn()}
        archiveConfigObj={{ statementId: 1 }}
        open 
      />
    );

    const archiveButton = screen.getByText('Arquivar');
    fireEvent.click(archiveButton)

    await waitFor(() => {
      expect(mockArchiveRequest).toHaveBeenCalled();
    })
  });
});