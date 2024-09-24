import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpdateUserModal from "./";
import axiosClient from "../../../configs/axiosClient";

const mockUpdateRequest = jest.fn().mockImplementation((url, params) => new Promise((resolve, reject) => {
  if (!params) return reject({ response: { data: { email: 'mock' }}});

  return resolve();
}));

const mockInvalidRequest = jest.fn().mockImplementation((url, params) => new Promise((resolve, reject) => {
  return reject({ response: { data: { email: 'e-mail já cadastrado', name: 'não pode ficar em branco' }}});
}));

describe('UpdateUserModal component', () =>{
  beforeEach(() => {
    render(
      <UpdateUserModal 
        toggleUserUpdateModalOpen={jest.fn()}
        toggleRefreshData={jest.fn()}
        userUpdateObj={{ id: 999 }}
        open 
      />
    )
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('should render correctly', async () => {
    expect(screen.getByText('Editar informações')).toBeInTheDocument();
  });

  it('should update user with valid params', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockUpdateRequest);

    const userNameInput = screen.getByTestId('input-user-name');
    fireEvent.change(userNameInput, { target: { value: 'Usuário Teste' } })
    const userEmailInput = screen.getByTestId('input-user-email');
    fireEvent.change(userEmailInput, { target: { value: 'teste@teste.com' } })

    const createCardButton = screen.getByText('Salvar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(mockUpdateRequest).toHaveBeenCalled();
    });
  });

  it('should not update user with empty name', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockInvalidRequest);

    const userEmailInput = screen.getByTestId('input-user-email');
    fireEvent.change(userEmailInput, { target: { value: 'teste@teste.com' } })

    const createCardButton = screen.getByText('Salvar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(screen.getByText('Insira um nome válido')).toBeInTheDocument();
    });
  });

  it('should not update user with empty e-mail', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockInvalidRequest);

    const userNameInput = screen.getByTestId('input-user-name');
    fireEvent.change(userNameInput, { target: { value: 'Usuário Teste' } })

    const createCardButton = screen.getByText('Salvar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(screen.getByText('Insira um e-mail válido')).toBeInTheDocument();
    });
  });

  it('should show error messages from the server about inputs', async () => {
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockInvalidRequest);

    const userNameInput = screen.getByTestId('input-user-name');
    fireEvent.change(userNameInput, { target: { value: 'Usuário Teste' } })

    const userEmailInput = screen.getByTestId('input-user-email');
    fireEvent.change(userEmailInput, { target: { value: 'teste@teste.com' } })

    const createCardButton = screen.getByText('Salvar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(screen.getByText('não pode ficar em branco')).toBeInTheDocument();
      expect(screen.getByText('e-mail já cadastrado')).toBeInTheDocument();
    });
  });
});