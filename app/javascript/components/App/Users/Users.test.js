import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Users from "./";
import axiosClient from "../configs/axiosClient";

const mockFetchData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({
    data: [
      {
        id: 1,
        name: 'Funcionario 1 Empresa A',
        email: 'user1@teste.com'
      },
      {
        id: 2,
        name: 'Funcionario 2 Empresa A',
        email: 'user2@teste.com'
      },
      {
        id: 3,
        name: 'Funcionario 3 Empresa A',
        email: 'user3@teste.com'
      },
    ],
  });
}));

const mockPatchRequest = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve();
}));

describe('Users component', () =>{
  it('should render correctly', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<Users />)
    
    await waitFor(() => {
      expect(screen.getByText('Funcionários'));
    })
  });

  it('should click to open add user modal', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<Users />)

    await waitFor(() => {
      const addUserButton = screen.getByText('Cadastrar funcionário +', { selector: 'button' });
      fireEvent.click(addUserButton);
      expect(screen.getByText('Informe os dados')).toBeInTheDocument();
    })
  });

  it('should trigger modal to update employee', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<Users />);

    await waitFor(() => {
      const triggerModalButton = screen.getByTestId('update-employee-0');
      fireEvent.click(triggerModalButton);
      expect(screen.getByText('Funcionario 1 Empresa A')).toBeInTheDocument();
    });
  });

  it('should trigger refreshData method when create user', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    jest.spyOn(axiosClient, 'post').mockImplementation(mockPatchRequest);
    render(<Users />);
    
    await waitFor(async () => {
      const openCreateUserModal = screen.getByText('Cadastrar funcionário +', { selector: 'button' });
      fireEvent.click(openCreateUserModal);
    });
    
    await waitFor(async () => {
      const userNameInput = screen.getByTestId('input-user-name');
      fireEvent.change(userNameInput, { target: { value: 'Usuário teste' }});
      
      const userEmailInput = screen.getByTestId('input-user-email');
      fireEvent.change(userEmailInput, { target: { value: 'teste@teste.com' }});

      const createButton = screen.getByText('Cadastrar');
      fireEvent.click(createButton);

      expect(mockPatchRequest).toHaveBeenCalled();
    });
  });
});