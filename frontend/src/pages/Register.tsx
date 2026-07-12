import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../features/auth/api";
import type { RegisterPayload } from "../features/auth/types";
import { getErrorMessage } from "../shared/api/getErrorMessage";
import { AlertMessage } from "../shared/components/AlertMessage";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterPayload>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    setError("");
    if (form.password !== form.password_confirm) {
      setError("Passwords do not match");
      return;
    }
    setSubmitting(true);
    try {
      await register(form);
      navigate("/login", { replace: true });
    } catch (error) {
      setError(getErrorMessage(error, "Registration failed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-vh-100 bg-light d-flex align-items-center justify-content-center px-3 py-4">
      <div className="card shadow-sm border-0 w-100" style={{ maxWidth: 520 }}>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h1 className="h3 fw-bold">Create Account</h1>
            <p className="text-muted mb-0">Create an account to get started</p>
          </div>
          <AlertMessage message={error} />
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="password_confirm" className="form-label">
                  Confirm password
                </label>
                <input
                  id="password_confirm"
                  name="password_confirm"
                  type="password"
                  className="form-control"
                  value={form.password_confirm}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 mt-4">
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={submitting}
                >
                  {submitting ? "Creating account..." : "Register"}
                </button>
              </div>
            </div>
          </form>
          <div className="text-center mt-4">
            <small className="text-muted">
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
