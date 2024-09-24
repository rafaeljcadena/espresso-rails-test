import PrivateRoute from "./PrivateRoute";
import "@testing-library/jest-dom";
import * as handleAuth from '../utils/handleAuth';
import { render, screen } from "@testing-library/react";

const mockPresentUser = { 
  name: 'User Test',
  email: 'teste@teste.com'
}

const mockBlankUser = null;
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Navigate: jest.fn(),
}));

describe('PrivateRoute component', () => {
  it('redirect when there is no user', () => {
    jest.spyOn(handleAuth, 'getProfile').mockReturnValue(mockBlankUser);
    render(
      <PrivateRoute>
        <h1>Test</h1>
      </PrivateRoute>
    )

    expect(screen.queryByText('Test')).not.toBeInTheDocument();
  });

  it('render children when there is user', () => {
    jest.spyOn(handleAuth, 'getProfile').mockReturnValue(mockPresentUser);
    render(
      <PrivateRoute>
        <h1>Test</h1>
      </PrivateRoute>
    )

    expect(screen.queryByText('Test')).toBeInTheDocument();
  });
});