import SignIn from "./";
import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PublicRoute from "../configs/PublicRoute";
import axiosClient from "../configs/axiosClient";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  render(
    <PublicRoute>
      <SignIn />
    </PublicRoute>
  );
});

describe('SignIn component', () => {
  it('should render correctly', () => {
    expect(screen.getByText('Logar no Espresso'));
  });

  it('should call navigate when clicks in the sign-up button', () => {

    const signUpButton = screen.getByText('Criar Conta');
    fireEvent.click(signUpButton);

    expect(mockNavigate).toHaveBeenCalledWith('/app/sign-up');
  });

  describe('Login method', () => {
    const mockSignIn = jest.fn().mockImplementation((_url, params) => new Promise((resolve, reject) => {
      return resolve()
    }));

    const mockFailedSignIn = jest.fn().mockImplementation((_url, params) => new Promise((resolve, reject) => {
      return reject({ 
        response: { 
          data: {
            errors: 'Credenciais inválidas. Tente novamente'
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

      jest.spyOn(axiosClient, 'post').mockImplementation(mockSignIn);
    });

    afterEach(() => {
      jest.restoreAllMocks()
    });

    it('should trigger login method and result success', () => {
      const loginInput = screen.getByLabelText('Usuário');
      const passwordInput = screen.getByLabelText('Senha');

      fireEvent.change(loginInput, { target: { value: 'teste@teste.com' } });
      fireEvent.change(passwordInput, { target: { value: '12345678' } });

      const loginButton = screen.getByText('Entrar');
      fireEvent.click(loginButton);

      expect(mockSignIn).toHaveBeenCalled();
    });

    it('should trigger login method and result error with invalid parameters', async () => {
      jest.spyOn(axiosClient, 'post').mockImplementation(mockFailedSignIn);

      const loginButton = screen.getByText('Entrar');

      await fireEvent.click(loginButton);

      await waitFor(async () => {
        expect(screen.queryAllByText('Credenciais inválidas. Tente novamente')).toHaveLength(2);
      });
    });
  })
});