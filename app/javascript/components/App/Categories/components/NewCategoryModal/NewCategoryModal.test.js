import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewCategoryModal from "./";
import axiosClient from "../../../configs/axiosClient";

const mockSaveRequest = jest.fn().mockImplementation((url, params) => new Promise((resolve, reject) => {
  return resolve();
}));

const mockInvalidRequest = jest.fn().mockImplementation((url, params) => new Promise((resolve, reject) => {
  return reject({ response: { data: { name: 'já existe uma categoria com esse nome' }}});
}));

describe('NewCategoryModal component', () =>{
  beforeEach(() => {
    render(
      <NewCategoryModal 
        toggleCategoryModalOpen={jest.fn()}
        toggleRefreshData={jest.fn()}
        open 
      />
    )
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('should render correctly', async () => {
    expect(screen.getByText('Cadastrar categoria')).toBeInTheDocument();
    expect(screen.getByText('Informe o nome da categoria')).toBeInTheDocument();
  });

  it('should create category with valid params', async () => {
    jest.spyOn(axiosClient, 'post').mockImplementation(mockSaveRequest);

    const newCategoryInput = screen.getByTestId('input-new-category');
    fireEvent.change(newCategoryInput, { target: { value: 'Nova categoria' } })

    const newCategoryButton = screen.getByText('Cadastrar');
    await fireEvent.click(newCategoryButton)

    await waitFor(() => {
      expect(mockSaveRequest).toHaveBeenCalled();
    });
  });

  it('should not create category with invalid empty name', async () => {
    jest.spyOn(axiosClient, 'post').mockImplementation(mockSaveRequest);

    const newCategoryButton = screen.getByText('Cadastrar');
    await fireEvent.click(newCategoryButton)

    await waitFor(() => {
      expect(screen.getByText('Insira um nome válido')).toBeInTheDocument();
    });
  });

  it('should show error messages from the server about inputs', async () => {
    jest.spyOn(axiosClient, 'post').mockImplementation(mockInvalidRequest);

    const newCategoryInput = screen.getByTestId('input-new-category');
    fireEvent.change(newCategoryInput, { target: { value: 'Nova categoria' } })

    const newCategoryButton = screen.getByText('Cadastrar');
    await fireEvent.click(newCategoryButton)

    await waitFor(() => {
      expect(mockSaveRequest).toHaveBeenCalled();
      expect(screen.getByText('já existe uma categoria com esse nome')).toBeInTheDocument();
    });
  });
});