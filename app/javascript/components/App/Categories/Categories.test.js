import { act, fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Categories from "./";
import axiosClient from "../configs/axiosClient";

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

const mockPostData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve();
}));

describe('Categories component', () => {
  it('should render correctly', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    jest.spyOn(axiosClient, 'post').mockImplementation(mockPostData);
    render(<Categories />)

    await waitFor(() => {
      expect(screen.getByText('Categorias'));
    })
  });

  it('should click to open add category modal', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    render(<Categories />)

    await waitFor(() => {
      const addCategoryButton = screen.getByText('Cadastrar categoria +', { selector: 'button' });
      fireEvent.click(addCategoryButton);

      expect(screen.getByText('Informe o nome da categoria')).toBeInTheDocument();
    })
  });

  it('should trigger refreshData method when create category', async () => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
    jest.spyOn(axiosClient, 'post').mockImplementation(mockPostData);
    render(<Categories />);
    
    await waitFor(async () => {
      const addCategoryButton = screen.getByText('Cadastrar categoria +', { selector: 'button' });
      fireEvent.click(addCategoryButton);
    });
    
    await waitFor(async () => {
      const newCategoryInput = screen.getByTestId('input-new-category');
      fireEvent.change(newCategoryInput, { target: { value: 'Nova categoria' } })

      const newCategoryButton = screen.getByText('Cadastrar');
      fireEvent.click(newCategoryButton)

      expect(mockPostData).toHaveBeenCalled();
    });
  });
});