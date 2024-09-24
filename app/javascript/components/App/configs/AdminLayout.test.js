import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminLayout from "./AdminLayout";
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

describe('AdminLayout component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AdminLayout>
          <h1>Teste</h1>
        </AdminLayout>
      </MemoryRouter>
    )
  });

  it('rendering', () => {
    expect(screen.getByText('Espresso')).toBeInTheDocument();
  });

  it('should logout user when click logou button', () => {
    jest.spyOn(axiosClient, 'delete').mockImplementation(mockLogouRequest);

    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.click(logoutButton);
    
    expect(mockLogouRequest).toHaveBeenCalled();
  });
});