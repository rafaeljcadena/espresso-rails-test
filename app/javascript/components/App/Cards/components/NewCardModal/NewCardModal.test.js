import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewCardModal from "./";
import axiosClient from "../../../configs/axiosClient";

const mockSaveRequest = jest.fn().mockImplementation((url, params) => new Promise((resolve, reject) => {
  if (!params) return reject({ response: { data: { last4: 'mock' }}});

  return resolve();
}));

const mockInvalidRequest = jest.fn().mockImplementation((url, params) => new Promise((resolve, reject) => {
  return reject({ response: { data: { last4: 'erro vindo do servidor' }}});
}));

describe('NewCardModal component', () =>{
  beforeEach(() => {
    render(
      <NewCardModal 
        toggleCardModalOpen={jest.fn()}
        toggleRefreshData={jest.fn()}
        open 
      />
    )
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('should render correctly', async () => {
    expect(screen.getByText('Cadastrar cartão')).toBeInTheDocument();
    expect(screen.getByText('Informe os dados')).toBeInTheDocument();
  });

  it('should create card with valid params', async () => {
    jest.spyOn(axiosClient, 'post').mockImplementation(mockSaveRequest);

    const cardNumberInput = screen.getByTestId('input-card-number');
    const employeeInput = screen.getByTestId('input-employee');

    fireEvent.change(cardNumberInput, { target: { value: '1234' } })
    fireEvent.change(employeeInput, { target: { value: 'teste@teste.com' } })

    const createCardButton = screen.getByText('Cadastrar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(mockSaveRequest).toHaveBeenCalled();
    });
  });

  it('should not create card with invalid card number', async () => {
    jest.spyOn(axiosClient, 'post').mockImplementation(mockSaveRequest);

    const employeeInput = screen.getByTestId('input-employee');

    fireEvent.change(employeeInput, { target: { value: 'teste@teste.com' } })

    const createCardButton = screen.getByText('Cadastrar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(screen.getByText('Insira um número de cartão válido')).toBeInTheDocument();
    });
  });

  it('should not create card with invalid employee', async () => {
    jest.spyOn(axiosClient, 'post').mockImplementation(mockSaveRequest);

    const cardNumberInput = screen.getByTestId('input-card-number');

    fireEvent.change(cardNumberInput, { target: { value: '1234' } })

    const createCardButton = screen.getByText('Cadastrar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(screen.getByText('Insira um e-mail válido')).toBeInTheDocument();
    });
  });

  it('should show error messages from the server about inputs', async () => {
    jest.spyOn(axiosClient, 'post').mockImplementation(mockInvalidRequest);

    const cardNumberInput = screen.getByTestId('input-card-number');
    const employeeInput = screen.getByTestId('input-employee');

    fireEvent.change(cardNumberInput, { target: { value: '1234' } })
    fireEvent.change(employeeInput, { target: { value: 'teste@teste.com' } })

    const createCardButton = screen.getByText('Cadastrar');
    await fireEvent.click(createCardButton)

    await waitFor(() => {
      expect(mockSaveRequest).toHaveBeenCalled();
      expect(screen.getByText('erro vindo do servidor')).toBeInTheDocument();
    });
  });
});