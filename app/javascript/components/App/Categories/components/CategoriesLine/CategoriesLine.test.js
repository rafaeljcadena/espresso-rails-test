import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoriesLine from "./";
import axiosClient from "../../../configs/axiosClient";

const mockFetchData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
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

// afterEach(cleanup);
afterEach(() => {
  jest.restoreAllMocks()
});

describe('CategoriesLine component', () => {
  it('should render correctly when loading data', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchUndefinedData);
    render(<CategoriesLine />)

    await waitFor(() => {
      expect(screen.getByText('Carregando...'));
    })
  });

  it('should render correctly with no data', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchNoData);
    render(<CategoriesLine />)
    
    await waitFor(() => {
      expect(screen.getByText('Até o momento, não há categorias cadastradas.'));
    });
  });

  it('should render and show data when have cards', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<CategoriesLine />)

    await waitFor(() => {
      expect(screen.getByText('Categoria Teste 1')).toBeInTheDocument();
    });
  });
});