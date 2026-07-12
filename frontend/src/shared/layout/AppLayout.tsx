import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../features/auth/api";
import type { CurrentUser } from "../../features/auth/types";

export default function AppLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => navigate("/login", { replace: true }));
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
        <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" to="/dashboard">
          Company name
        </Link>
        <ul className="navbar-nav flex-row d-md-none">
          <li className="nav-item text-nowrap">
            <button
              className="nav-link px-3 text-white"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-label="Toggle navigation"
            >
              Menu
            </button>
          </li>
        </ul>
        <div className="d-flex align-items-center gap-3 px-3 ms-auto">
          <span className="text-white">{user?.firstName || ""}</span>
          <button className="btn btn-primary" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
}
