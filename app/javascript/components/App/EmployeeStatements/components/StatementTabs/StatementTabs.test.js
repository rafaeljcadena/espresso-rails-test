import { fireEvent, prettyDOM, render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatementTabs from "./";
import axiosClient from "../../../configs/axiosClient";
import axiosClientCategory from "../../../configs/axiosClient";
import userEvent from "@testing-library/user-event";

const mockRouter = jest.fn().mockImplementation((url) => {
  if (url.match(/categories/)) return mockFetchCategoriesData();

  return mockFetchData();
})

const mockFetchData = jest.fn().mockImplementation((url) => new Promise((resolve, reject) => {
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
        {
          id: 2,
          merchant: 'Estabelecimento Teste 2',
          cost: 100,
          performed_at: '2024-09-22T18:30:21.000Z',
          card_last4: '2345',
          status: 'verified',
          user: 'Usuário Teste',
          category: 'Category teste',
          file: 'mock-path',
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

const mockFetchCategoriesData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({
    data: [
      {
        id: 1,
        name: 'Categoria Teste 1',
      },
      {
        id: 2,
        name: 'Categoria Teste 2',
      },
      {
        id: 3,
        name: 'Categoria Teste 3',
      },
    ],
  });
}));

describe('StatementTabs component', () =>{
  const mockFile = new File(['new file'], 'mock.png', { type: 'image/png' });
  const updateAutocompleteValue = async (value) => {
    const combobox = screen.getByRole('combobox');

    fireEvent.mouseDown(combobox);
    fireEvent.change(combobox, { target: { value } });

    fireEvent.keyDown(combobox, { key: 'ArrowDown' })

    fireEvent.keyDown(combobox, { key: 'Enter' })

    // const listbox = await waitFor(() => screen.getByRole('listbox'), { timeout: 2000 });

    // const option = within(listbox).getByText(value);

    // fireEvent.click(option);
  };

  it('should render correctly', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockEmptyData);
    render(<StatementTabs />)
    
    await waitFor(() => {
      expect(screen.getByText('Não comprovadas'));
      expect(screen.getByText('Comprovadas'));
    });
  });

  it('should show verified statement list', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockEmptyData);
    render(<StatementTabs />)

    await waitFor(async () => {
      const archivedButton = screen.getByText('Comprovadas');
      fireEvent.click(archivedButton)
    });

    await waitFor(async () => {
      expect(screen.getByText('Até o momento, não há despesas comprovadas.')).toBeInTheDocument();
    });
  });

  it('should open update modal', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockRouter);
    render(<StatementTabs />)

    await waitFor(() => {
      const updateModal = screen.getByTestId('update-button-1234');
      fireEvent.click(updateModal);
    });

    await waitFor(() => {
      expect(screen.getByText('Editar despesa')).toBeInTheDocument();
    });
  });

  it('should trigger refreshData method when update statement', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockRouter);
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockPatchRequest);
    render(<StatementTabs />);
    
    await waitFor(() => {
      const updateModal = screen.getByTestId('update-button-1234');
      fireEvent.click(updateModal);
    });

    updateAutocompleteValue('Categoria Teste 1');
    const fileInput = screen.getByTestId('input-file');
    await userEvent.upload(fileInput, mockFile);

    
    await waitFor(async () => {
      const updateStatementButton = screen.getByText('Salvar');
      await fireEvent.click(updateStatementButton)
      expect(mockPatchRequest).toHaveBeenCalled();
    });
  });
});