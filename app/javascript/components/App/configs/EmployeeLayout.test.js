import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmployeeLayout from "./EmployeeLayout";
import * as handleAuth from '../utils/handleAuth';
import { MemoryRouter } from 'react-router-dom';
import axiosClient from "./axiosClient";

jest.spyOn(handleAuth, 'getProfile').mockImplementation(() => ({ 
  name: 'User Test',
  email: 'teste@teste.com'
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Link: () => <a></a>
}));

const mockLogouRequest = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve();
}));

describe('EmployeeLayout component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <EmployeeLayout>
          <h1>Teste</h1>
        </EmployeeLayout>
      </MemoryRouter>
    )
  });

  it('rendering', () => {
    expect(screen.getByText('Espresso')).toBeInTheDocument();
    expect(screen.getByText('User Test')).toBeInTheDocument();
    expect(screen.getByText('teste@teste.com')).toBeInTheDocument();
  });

  it('should logout user when click logout button', () => {
    jest.spyOn(axiosClient, 'delete').mockImplementation(mockLogouRequest);

    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.click(logoutButton);
    
    expect(mockLogouRequest).toHaveBeenCalled();
  });
});