import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/api";
import type { LoginPayload } from "../features/auth/types";
import { getErrorMessage } from "../shared/api/getErrorMessage";
import { AlertMessage } from "../shared/components/AlertMessage";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(getErrorMessage(error, "Login failed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-vh-100 bg-light d-flex align-items-center justify-content-center px-3">
      <div className="card shadow-sm border-0 w-100" style={{ maxWidth: 520 }}>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h1 className="h3 fw-bold">Sign in</h1>
            <p className="text-muted mb-0">Sign in to manage your account</p>
          </div>
          <AlertMessage message={error} />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Login"}
            </button>
          </form>
          <div className="text-center mt-4">
            <small className="text-muted">
              No account? <Link to="/register">Register</Link>
            </small>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
