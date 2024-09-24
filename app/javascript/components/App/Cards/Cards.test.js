import { fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cards from "./";
import axiosClient from "../configs/axiosClient";

const mockFetchData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({
    data: [
      {
        id: 1,
        last4: '2222',
        user_name: 'Funcionario 1 Empresa A'
      },
      {
        id: 2,
        last4: '3333',
        user_name: 'Funcionario 1 Empresa A'
      },
      {
        id: 3,
        last4: '4444',
        user_name: 'Funcionario 1 Empresa A'
      },
    ],
  });
}));

const mockPatchRequest = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve();
}));

describe('Cards component', () => {
  it('should render correctly', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<Cards />);
    
    await waitFor(async () => {
      expect(screen.getByText('Cartões')).toBeInTheDocument();
    });
  });

  it('should trigger onClick method when hits new card button', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<Cards />);

    await waitFor(async () => {
      const addCardButton = screen.getByTestId('add-card');
      fireEvent.click(addCardButton);

      expect(screen.getByTestId('new-card-modal')).toBeInTheDocument();
    });
  });

  it('should trigger onclick method when hits update card button', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<Cards />);
    
    await waitFor(async () => {
      const openUpdateModal = screen.getByTestId('update-card-0');
      fireEvent.click(openUpdateModal);

      expect(screen.getByText('Associar funcionário')).toBeInTheDocument();
    });
  });

  it('should trigger refreshData method when update card', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    jest.spyOn(axiosClient, 'patch').mockImplementation(mockPatchRequest);
    render(<Cards />);
    
    await waitFor(async () => {
      const openUpdateModal = screen.getByTestId('update-card-0');
      fireEvent.click(openUpdateModal);
    });
    
    await waitFor(async () => {
      const employeeInput = screen.getByTestId('input-employee');
      fireEvent.change(employeeInput, { target: { value: 'teste@teste.com' }});

      const updateButton = screen.getByText('Salvar');
      fireEvent.click(updateButton);

      expect(mockPatchRequest).toHaveBeenCalled();
    });
  });
});