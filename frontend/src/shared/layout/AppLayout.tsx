import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../features/auth/api";
import type { CurrentUser } from "../../features/auth/types";
import type { Dispatch, SetStateAction } from "react";
import { User } from "../../features/users/types";
import { setUser } from "../../redux/actions/setUserAction"
export type AppLayoutContext = {
  user: CurrentUser;
  setUser: Dispatch<SetStateAction<CurrentUser | null>>;
};
export default function AppLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    let isActive = true;

    getCurrentUser()
      .then((currentUser) => {
        if (isActive) setUser(currentUser);
      })
      .catch(() => {
        if (isActive) navigate("/login", { replace: true });
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      setLogoutError("Unable to log out. Please try again.");
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex min-vh-100 align-items-center justify-content-center" role="status">
        Loading...
      </div>
    );
  }

  if (!user) return null;

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
          <span className="text-white" onClick={() => navigate("/profile")}>
            {user.firstName} {user.lastName}
          </span>
          {logoutError ? (
            <span className="text-danger" role="alert">
              {logoutError}
            </span>
          ) : null}
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>
      <Outlet context={{ user, setUser }} />
    </>
  );

  const mapStateToProps = (state: { user: User }) => {
    return {
      user: state.user
    }
  }

  const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
      setUser: (user: User) => dispatch(setUser(user))
    }
  }
}
