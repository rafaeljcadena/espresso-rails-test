import SignUp from "./";
import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PublicRoute from "../configs/PublicRoute";
import axiosClient from "../configs/axiosClient";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderComponent = () => {
  render(
    <PublicRoute>
      <SignUp />
    </PublicRoute>
  );
};

describe('SignUp component', () => {
  it('should render correctly', () => {
    renderComponent();

    expect(screen.getByText('Criar conta', { selector: 'p' }));
  });

  it('should call navigate when clicks in the sign-in button', () => {
    renderComponent();

    const signUpButton = screen.getByText('Fazer login', { selector: 'button' });
    fireEvent.click(signUpButton);

    expect(mockNavigate).toHaveBeenCalledWith('/app/sign-in');
  });


  describe('SignUp method', () => {
    const mockSignUp = jest.fn().mockImplementation((_url, params) => new Promise((resolve, reject) => {
      return resolve()
    }));

    const mockFailedSignUp = jest.fn().mockImplementation((_url, params) => new Promise((resolve, reject) => {
      return reject({ 
        response: { 
          data: {
            name: 'nome não pode ficar em branco',
            email: 'email não pode ficar em branco',
            password: 'password não pode ficar em branco',
            ['company.name']: 'nome de empresa não pode ficar em branco',
            ['company.cnpj']: 'cnpj de empresa não pode ficar em branco',
          },
        },
      });
    }));

    beforeEach(() => {
      const originalLocation = window.location;
      jest.spyOn(window, "location", "get").mockImplementation(() => ({
        ...originalLocation,
        href: "http://mock.com", // Mock window.location.href here.
      }))

      jest.spyOn(axiosClient, 'post').mockImplementation(mockSignUp);
    });

    afterEach(() => {
      jest.restoreAllMocks()
    });

    it('should trigger login method and result success', async () => {
      renderComponent();

      const nameInput = screen.getByTestId('name');
      const emailInput = screen.getByTestId('email');
      const passwordInput = screen.getByTestId('password');
      const passwordConfirmationInput = screen.getByTestId('password-confirmation');
      const cnpjInput = screen.getByTestId('cnpj');

      fireEvent.change(nameInput, { target: { value: 'Usuário teste' } });
      fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
      fireEvent.change(passwordInput, { target: { value: '12345678' } });
      fireEvent.change(passwordConfirmationInput, { target: { value: '12345678' } });
      fireEvent.change(cnpjInput, { target: { value: '123456789' } });

      const signUpButton = screen.getByText('Criar conta', { selector: 'button' });

      await waitFor(async () => {
        await fireEvent.click(signUpButton);
        expect(mockSignUp).toHaveBeenCalled();
      })
    });

    it('should trigger login method and result error with invalid parameters', async () => {
      jest.spyOn(axiosClient, 'post').mockImplementation(mockFailedSignUp);
      renderComponent();

      const signUpButton = screen.getByText('Criar conta', { selector: 'button' });

      await waitFor(async () => {
        await fireEvent.click(signUpButton);
        expect(mockFailedSignUp).toHaveBeenCalled();
        expect(screen.getByText('nome não pode ficar em branco')).toBeInTheDocument();
        expect(screen.getByText('email não pode ficar em branco')).toBeInTheDocument();
        expect(screen.getByText('password não pode ficar em branco')).toBeInTheDocument();
        expect(screen.getByText('nome de empresa não pode ficar em branco')).toBeInTheDocument();
        expect(screen.getByText('cnpj de empresa não pode ficar em branco')).toBeInTheDocument();
      });
    });
  })
});