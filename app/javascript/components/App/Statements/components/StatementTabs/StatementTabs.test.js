import { fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatementTabs from "./";
import axiosClient from "../../../configs/axiosClient";

const mockFetchData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({
    data: {
      statements: [
        {
          id: 1,
          merchant: 'Estabelecimento Teste',
          cost: 100,
          performed_at: '2024-09-22T18:30:21.000Z',
          card_last4: '1234',
          status: 'verified',
          user: 'Usuário Teste',
          category: 'Category teste'
        },
      ],
      total_records: 1,
    }
  });
}));

const mockEmptyData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({ data: { statements: [] }});
}));

const mockPatchRequest = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve();
}));

describe('StatementTabs component', () =>{
  it('should render correctly', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockEmptyData);
    render(<StatementTabs />)
    
    await waitFor(() => {
      expect(screen.getByText('Lista'));
    });
  });

  it('should show archived statement list', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockEmptyData);
    render(<StatementTabs />)

    const archivedButton = screen.getByText('Arquivadas');
    fireEvent.click(archivedButton)

    await waitFor(async () => {
      expect(screen.getByText('Até o momento, não há despesas arquivadas.')).toBeInTheDocument();
    });
  });

  it('should open archive modal', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<StatementTabs />)

    await waitFor(() => {
      const archiveModal = screen.getByTestId('archive-button-1234');
      fireEvent.click(archiveModal);
    });

    await waitFor(() => {
      expect(screen.getByText('Arquivar despesa')).toBeInTheDocument();
    });
  });

  it('should trigger refreshData method when archive statement', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockPatchRequest);
    render(<StatementTabs />);
    
    await waitFor(async () => {
      const archiveModal = screen.getByTestId('archive-button-1234');
      fireEvent.click(archiveModal);
    });
    
    await waitFor(async () => {
      const archiveButton = screen.getByText('Arquivar');
      fireEvent.click(archiveButton);

      expect(mockPatchRequest).toHaveBeenCalled();
    });
  });
});