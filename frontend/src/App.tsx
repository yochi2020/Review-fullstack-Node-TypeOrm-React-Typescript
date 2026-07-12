import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

const AppLayout = lazy(() => import('./shared/layout/AppLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Role = lazy(() => import('./pages/Role'));
const RoleCreate = lazy(() => import('./pages/RoleCreate'));
const RoleEdit = lazy(() => import('./pages/RoleEdit'));
const User = lazy(() => import('./pages/users/User'));
const UserCreate = lazy(() => import('./pages/users/UserCreate'));
const UserEdit = lazy(() => import('./pages/users/UserEdit'));
const Product = lazy(() => import('./pages/products'));
const ProductEdit = lazy(() => import('./pages/products/ProductEdit'));
const ProductCreate = lazy(() => import('./pages/products/ProductCreate'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div className="d-flex min-vh-100 align-items-center justify-content-center">Loading...</div>}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Navigate to="/dashboard"  />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-create" element={<UserCreate />} />
              <Route path="/user" element={<User />} />
              <Route path="/user/:id/edit" element={<UserEdit />} />
              <Route path="/role" element={<Role />} />
              <Route path="/role-create" element={<RoleCreate />} />
              <Route path="/role/:id/edit" element={<RoleEdit />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:id/edit" element={<ProductEdit />} />
              <Route path="/product-create" element={<ProductCreate />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
