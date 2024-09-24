import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UsersLine from "./";
import axiosClient from "../../../configs/axiosClient";

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

const mockFetchNoData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({
    data: [],
  });
}));

const mockFetchUndefinedData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({
    data: null,
  });
}));

describe('UsersLine component', () => {
  it('should render correctly when loading data', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchUndefinedData);
    render(<UsersLine />)

    await waitFor(() => {
      expect(screen.getByText('Carregando...'));
    })
  });

  it('should render correctly with no data', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchNoData);
    render(<UsersLine />)
    
    await waitFor(() => {
      expect(screen.getByText('Até o momento, não há funcionários cadastrados.'));
    });
  });

  describe('Showing data', () => {
    beforeEach(() => {
      jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    });

    afterEach(() => {
      jest.restoreAllMocks()
    });

    it('should render and show data when have employees', async () => {
      const mockFn = jest.fn((user) => ({}));
      render(<UsersLine prepareUpdateUserModal={mockFn}  />)

      await waitFor(() => {
        expect(screen.getByText('Funcionario 1 Empresa A')).toBeInTheDocument();
      });
    });

    it('should trigger modal to update employee', async () => {
      const mockFn = jest.fn((user) => ({}));
      render(<UsersLine prepareUpdateUserModal={mockFn}  />)

      await waitFor(() => {
        const triggerModalButton = screen.getByTestId('update-employee-0');
        fireEvent.click(triggerModalButton);

      });
        expect(screen.getByText('Funcionario 1 Empresa A')).toBeInTheDocument();
    });
  });
});