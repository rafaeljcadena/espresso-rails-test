import { fireEvent, prettyDOM, render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatementUpdateModal from "./";
import axiosClient from "../../../configs/axiosClient";
import userEvent from "@testing-library/user-event";

const mockUpdateRequest = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve();
}));

const mockInvalidRequest = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return reject({ response: { data: { file: 'arquivo inválido', category: 'não pode ficar em branco' }}});
}));

const mockFile = new File(['new file'], 'mock.png', { type: 'image/png' });
const mockInvalidFile = new File(['new file'], 'mock.png', { type: 'invalid/type' });

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

describe('StatementUpdateModal component', () =>{
  const renderComponent = (category) => {
    const statement = { id: 1 };

    if (category) statement.category = category;

    return render(
      <StatementUpdateModal
        toggleArchiveModalOpen={jest.fn()}
        toggleRefreshData={jest.fn()}
        categoryList={[
          {
            id: 1,
            label: 'Categoria Teste'
          },
          {
            id: 2,
            label: 'Categoria Teste 2'
          }
        ]}
        statement={statement}
        open
      />
    )
  }

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('should render correctly', async () => {
    renderComponent();
    expect(screen.getByText('Editar despesa')).toBeInTheDocument();
  });

  it('should update statement with valid params', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockUpdateRequest);
    renderComponent();

    updateAutocompleteValue('Categoria Teste 2');
    const fileInput = screen.getByTestId('input-file');
    await userEvent.upload(fileInput, mockFile);

    const updateStatementButton = screen.getByText('Salvar');
    await fireEvent.click(updateStatementButton)

    await waitFor(() => {
      expect(mockUpdateRequest).toHaveBeenCalled();
    });
  });

  it('should update statement with valid params and default category', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockUpdateRequest);
    renderComponent('Categoria Teste');

    updateAutocompleteValue('Categoria Teste 9');

    const fileInput = screen.getByTestId('input-file');
    await userEvent.upload(fileInput, mockFile);

    const updateStatementButton = screen.getByText('Salvar');
    await fireEvent.click(updateStatementButton)

    await waitFor(() => {
      expect(mockUpdateRequest).toHaveBeenCalled();
    });
  });

  it('should not update statement with empty category', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockUpdateRequest);
    renderComponent();

    const fileInput = screen.getByTestId('input-file');
    await userEvent.upload(fileInput, mockFile);

    const updateStatementButton = screen.getByText('Salvar');
    await fireEvent.click(updateStatementButton)

    await waitFor(() => {
      expect(screen.getByText('Insira uma categoria válida')).toBeInTheDocument();
    });
  });

  it('should not update statement with empty file', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockUpdateRequest);
    renderComponent();

    updateAutocompleteValue('Categoria Teste 2');

    const updateStatementButton = screen.getByText('Salvar');
    await fireEvent.click(updateStatementButton)

    await waitFor(() => {
      expect(screen.getByText('arquivo não encontrado')).toBeInTheDocument();
    });
  });

  it('should not update statement with invalid file', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockUpdateRequest);
    renderComponent();

    updateAutocompleteValue('Categoria Teste 2');

    const fileInput = screen.getByTestId('input-file');
    await userEvent.upload(fileInput, mockInvalidFile);

    const updateStatementButton = screen.getByText('Salvar');
    await fireEvent.click(updateStatementButton)

    await waitFor(() => {
      expect(screen.getByText('tipo de arquivo não permitido')).toBeInTheDocument();
    });
  });

  it('should not update statement with invalid file size', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockUpdateRequest);
    renderComponent();

    updateAutocompleteValue('Categoria Teste 2');

    const mockInvalidSizeFile = new File(['new file'], 'invalid-file-size.png', { type: 'image/png' });
    Object.defineProperty(mockInvalidSizeFile, 'size', { value: 1024 * 99999 + 1 })

    const fileInput = screen.getByTestId('input-file');
    await userEvent.upload(fileInput, mockInvalidSizeFile);

    const updateStatementButton = screen.getByText('Salvar');
    await fireEvent.click(updateStatementButton)

    await waitFor(() => {
      expect(screen.getByText('limite de tamanho excedido')).toBeInTheDocument();
    });
  });

  it('should show error messages from the server about inputs', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockInvalidRequest);
    renderComponent();

    updateAutocompleteValue('Categoria Teste 2');
    const fileInput = screen.getByTestId('input-file');
    await userEvent.upload(fileInput, mockFile);

    const updateStatementButton = screen.getByText('Salvar');
    await fireEvent.click(updateStatementButton)

    await waitFor(() => {
      expect(screen.getByText('arquivo inválido')).toBeInTheDocument();
      expect(screen.getByText('não pode ficar em branco')).toBeInTheDocument();
    });
  });

  it('should clear autocomplete when not found option', async () => {
    renderComponent();

    const invalidOptionText = 'invalid option';
    const combobox = screen.getByRole('combobox');

    fireEvent.mouseDown(combobox);
    fireEvent.change(combobox, { target: { invalidOptionText } });

    const listbox = await waitFor(() => screen.getByRole('listbox'), { timeout: 2000 });

    fireEvent.click(combobox);
    expect(within(listbox).queryByText(invalidOptionText)).not.toBeInTheDocument();
  });
});