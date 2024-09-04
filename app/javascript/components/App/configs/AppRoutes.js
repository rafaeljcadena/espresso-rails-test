import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Users from '../Users';
import Categories from '../Categories';
import Statements from '../Statements';
import Cards from '../Cards';
import AdminLayout from './AdminLayout';
import EmployeeLayout from './EmployeeLayout';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import EmployeeStatements from '../EmployeeStatements';
import { getProfile } from '../utils/handleAuth';

export default function AppRoutes() {
  const user = getProfile();

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/app/sign-in"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/app/sign-up"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/app/statements"
            element={
              <PrivateRoute>
                {user?.role === 'admin' ? (
                  <AdminLayout>
                    <Statements />
                  </AdminLayout>
                ) : (
                  <EmployeeLayout>
                    <EmployeeStatements />
                  </EmployeeLayout>
                )}
              </PrivateRoute>
            }
          />
          <Route
            path="/app/cards"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <Cards />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/app/users"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <Users />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/app/categories"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <Categories />
                </AdminLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );

}