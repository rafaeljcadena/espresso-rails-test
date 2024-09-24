import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppRoutes from "./AppRoutes";
import { persistInfo } from "../utils/handleAuth";


describe('App component', () => {
  it('should render SignIn component for non-logged users', () => {
    render(<AppRoutes />)

    expect(screen.getByText('Logar no Espresso'));
  });

  it('should render admin statements for admins', () => {
    const mockUser = {
      name: 'Admin',
      email: 'admin@admin.com',
      role: 'admin',
    };
    persistInfo({ data: mockUser })

    render(<AppRoutes />)

    expect(screen.getByTestId('admin-statements')).toBeInTheDocument();
  });

  it('should render employee statements for employees', () => {
    const mockUser = {
      name: 'Employee',
      email: 'employee@employee.com',
      role: 'employee',
    };
    persistInfo({ data: mockUser })

    render(<AppRoutes />)

    expect(screen.getByTestId('employee-statements')).toBeInTheDocument();
  });
});