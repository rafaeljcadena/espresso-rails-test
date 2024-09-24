import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatementsTable from "./";
import axiosClient from "../../../configs/axiosClient";

const statementSample = {
  cost: 100,
  performed_at: '2024-09-22T18:30:21.000Z',
  user: 'Usuário Teste',
  category: 'Category teste'
};

const statements = [];
for (let index = 0; index < 20; index++) {
  const randomStatusNumber = Math.floor(Math.random() * 3) + 1;

  let status = null;
  switch(randomStatusNumber) {
    case 1:
      status = 'verified';
      break;
    case 2:
      status = 'non_verified';
      break;
  }

  statements.push({ 
    ...statementSample, 
    id: index + 1, 
    merchant: `Estabelecimento Teste ${index}`,
    status, 
    card_last4: 1000 + index 
  });
}

const mockFetchData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({
    data: {
      statements,
      total_records: 20,
    }
  });
}));

const mockPatchRequest = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve();
}));

afterEach(() => {
  jest.restoreAllMocks()
});

describe('StatementsTable component rendering', () =>{
  it('should render correctly', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<StatementsTable />)
    
    await waitFor(() => {
      expect(screen.getByText('Carregando...'));
    });
  });

  describe('Rendering data', () => {

    it('should render correctly', async () => {
      jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
      render(<StatementsTable />)

      await waitFor(() => {
        expect(mockFetchData).toHaveBeenCalled();
        expect(screen.getByText('Estabelecimento Teste 1')).toBeInTheDocument();
      });
    });

    it('should click next page button', async () => {
      jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
      render(<StatementsTable />)

      await waitFor(() => {

        const nextPageButton = screen.getByTestId('KeyboardArrowRightIcon');
        fireEvent.click(nextPageButton);

        expect(mockFetchData).toHaveBeenCalledTimes(4);
      });
    });
  });

  it('should open archive modal', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockPatchRequest);
    
    const mockPrepareArchiveModal = jest.fn();
    render(<StatementsTable prepareArchiveModal={mockPrepareArchiveModal} />)

    await waitFor(() => {
      const archiveModal = screen.getByTestId('archive-button-1000');
      fireEvent.click(archiveModal);
    });

    await waitFor(() => {
      expect(mockPrepareArchiveModal).toHaveBeenCalled();
    });
  });

  it('should not render status', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<StatementsTable />)

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalled();
    });
  })
});