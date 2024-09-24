import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpdateCardModal from "./";
import axiosClient from "../../../configs/axiosClient";

const mockUpdateRequest = jest.fn().mockImplementation((url, params) => new Promise((resolve, reject) => {
  return resolve();
}));

const mockInvalidRequest = jest.fn().mockImplementation((url, params) => new Promise((resolve, reject) => {
  return reject({ response: { data: { user: 'funcionário inválido' }}});
}));

describe('UpdateCardModal component', () =>{
  beforeEach(() => {
    render(
      <UpdateCardModal 
        toggleCardUpdateModalOpen={jest.fn()}
        toggleRefreshData={jest.fn()}
        cardUpdateObj={{ cardId: 999 }}
        open 
      />
    )
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('should render correctly', async () => {
    expect(screen.getByText('Associar funcionário')).toBeInTheDocument();
  });

  it('should update card with valid params', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockUpdateRequest);

    const employeeInput = screen.getByTestId('input-employee');

    fireEvent.change(employeeInput, { target: { value: 'teste@teste.com' } })

    const createCardButton = screen.getByText('Salvar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(mockUpdateRequest).toHaveBeenCalled();
    });
  });

  it('should not update card with blank e-mail', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockInvalidRequest);

    const createCardButton = screen.getByText('Salvar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(screen.getByText('Insira um e-mail válido')).toBeInTheDocument();
    });
  });

  it('should not update card with invalid e-mail', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockInvalidRequest);

    const employeeInput = screen.getByTestId('input-employee');

    fireEvent.change(employeeInput, { target: { value: 'invalid@invalid.com' } })

    const createCardButton = screen.getByText('Salvar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(screen.getByText('funcionário inválido')).toBeInTheDocument();
    });
  });
});