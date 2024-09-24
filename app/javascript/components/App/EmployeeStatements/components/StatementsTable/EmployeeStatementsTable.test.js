import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    card_last4: 1000 + index,
    file: randomStatusNumber % 2 === 0 ? 'mock-path' : null,
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

const mockEmptyData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({
    data: {
      statements: [],
      total_records: 20,
    }
  });
}));

const mockUndefinedData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({
    data: {
      statements,
      total_records: 20,
    }
  });
}));

afterEach(() => {
  jest.restoreAllMocks()
});

describe('StatementsTable component rendering', () =>{

  describe('Rendering data', () => {
    it('should render correctly', async () => {
      jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
      render(<StatementsTable />)

      await waitFor(() => {
        expect(mockFetchData).toHaveBeenCalled();
        expect(screen.getByText('Estabelecimento Teste 1')).toBeInTheDocument();
      });
    });

    it('should render loading component when data state is undefined', async () => {
      jest.spyOn(axiosClient, 'get').mockImplementation(mockUndefinedData);
      render(<StatementsTable />)

      await waitFor(() => {
        expect(screen.getByText('Carregando...'));
      })
    });

    it('should render no result message when no statements', async () => {
      jest.spyOn(axiosClient, 'get').mockImplementation(mockEmptyData);

      const defaultMessage = "Até o momento, não há despesas pendentes de comprovação.";

      render(
        <StatementsTable 
          emptyDataLabel={defaultMessage}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(defaultMessage));
      })
    });

    it('should click next page button', async () => {
      jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
      render(<StatementsTable />)

      await waitFor(() => {

        const nextPageButton = screen.getByTestId('KeyboardArrowRightIcon');
        fireEvent.click(nextPageButton);

        expect(mockFetchData).toHaveBeenCalledTimes(3);
      });
    });
  });

  it('should open update statement modal', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);

    const mockPrepareUpdateModal = jest.fn();
    render(<StatementsTable prepareUpdateModal={mockPrepareUpdateModal} />)

    await waitFor(() => {
      const updateModal = screen.getByTestId('update-button-1000');
      fireEvent.click(updateModal);
    });

    await waitFor(() => {
      expect(mockPrepareUpdateModal).toHaveBeenCalled();
    });
  });

  // it('should not render status', async () => {
  //   await waitFor(() => {
  //     expect(mockFetchData).toHaveBeenCalled();
  //   });
  // })
});