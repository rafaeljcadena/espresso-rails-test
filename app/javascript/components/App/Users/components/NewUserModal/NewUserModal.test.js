import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewUserModal from "./";
import axiosClient from "../../../configs/axiosClient";

const mockSaveRequest = jest.fn().mockImplementation((url, params) => new Promise((resolve, reject) => {
  if (!params) return reject({ response: { data: { email: 'mock' }}});

  return resolve();
}));

const mockInvalidRequest = jest.fn().mockImplementation((url, params) => new Promise((resolve, reject) => {
  return reject({ response: { data: { email: 'e-mail já cadastrado', name: 'não pode ficar em branco' }}});
}));

describe('NewUserModal component', () =>{
  beforeEach(() => {
    render(
      <NewUserModal 
        toggleUserModalOpen={jest.fn()}
        toggleRefreshData={jest.fn()}
        open 
      />
    )
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('should render correctly', async () => {
    expect(screen.getByText('Cadastrar funcionário')).toBeInTheDocument();
    expect(screen.getByText('Informe os dados')).toBeInTheDocument();
  });

  it('should create user with valid params', async () => {
    jest.spyOn(axiosClient, 'post').mockImplementation(mockSaveRequest);

    const userNameInput = screen.getByTestId('input-user-name');
    const userEmailInput = screen.getByTestId('input-user-email');

    fireEvent.change(userNameInput, { target: { value: 'Teste' } })
    fireEvent.change(userEmailInput, { target: { value: 'teste@teste.com' } })

    const createCardButton = screen.getByText('Cadastrar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(mockSaveRequest).toHaveBeenCalled();
    });
  });

  it('should not create user with empty name', async () => {
    jest.spyOn(axiosClient, 'post').mockImplementation(mockSaveRequest);

    const userEmailInput = screen.getByTestId('input-user-email');
    fireEvent.change(userEmailInput, { target: { value: 'teste@teste.com' } })

    const createCardButton = screen.getByText('Cadastrar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(screen.getByText('Insira um nome válido')).toBeInTheDocument();
    });
  });

  it('should not create user with empty email', async () => {
    jest.spyOn(axiosClient, 'post').mockImplementation(mockSaveRequest);


    const userNameInput = screen.getByTestId('input-user-name');
    fireEvent.change(userNameInput, { target: { value: 'Teste' } })

    const createCardButton = screen.getByText('Cadastrar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(screen.getByText('Insira um e-mail válido')).toBeInTheDocument();
    });
  });

  it('should show error messages from the server about inputs', async () => {
    jest.spyOn(axiosClient, 'post').mockImplementation(mockInvalidRequest);

    const userNameInput = screen.getByTestId('input-user-name');
    const userEmailInput = screen.getByTestId('input-user-email');

    fireEvent.change(userNameInput, { target: { value: 'Teste' } })
    fireEvent.change(userEmailInput, { target: { value: 'teste@teste.com' } })

    const createCardButton = screen.getByText('Cadastrar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(screen.getByText('e-mail já cadastrado')).toBeInTheDocument();
    });
  });
});