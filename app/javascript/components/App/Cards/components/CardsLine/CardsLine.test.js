import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardsLine from "./";
import axiosClient from "../../../configs/axiosClient";

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

const mockUndefinedData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({ data: undefined });
}));

const mockEmptyData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve({ data: [] });
}));

afterEach(cleanup);

describe('CardsLine component', () => {
  it('should render correctly with no data', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockEmptyData);
    render(<CardsLine />)

    await waitFor(() => {
      expect(screen.getByText('Até o momento, não há cartões cadastrados.'));
    });
  });

  it('should render loading component when loading data', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockUndefinedData);
    render(<CardsLine />)

    await waitFor(() => {
      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });
  });

  it('should render and show data when have cards', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<CardsLine />)

    await waitFor(() => {
      expect(screen.getByText('**** **** **** 2222')).toBeInTheDocument();
    });
  });
});
