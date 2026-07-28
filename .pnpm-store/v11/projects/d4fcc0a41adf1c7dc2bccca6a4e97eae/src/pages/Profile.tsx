import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  updateCurrentUserPassword,
  updateCurrentUserProfile,
} from "../features/auth/api";
import { getErrorMessage } from "../shared/api/getErrorMessage";
import { AlertMessage } from "../shared/components/AlertMessage";
import { DashboardPage } from "../shared/components/DashboardPage";
import { PageHeader } from "../shared/components/PageHeader";
import type { AppLayoutContext } from "../shared/layout/AppLayout";

function Profile() {
  const { user, setUser } = useOutletContext<AppLayoutContext>();
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const [password, setPassword] = useState({
    password: "",
    password_confirm: "",
  });
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleSubmitProfile: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    setProfileError("");
    setProfileMessage("");
    setSavingProfile(true);

    try {
      const updatedUser = await updateCurrentUserProfile(profile);
      setUser(updatedUser);
      setProfileMessage("Profile updated successfully");
    } catch (error) {
      setProfileError(getErrorMessage(error, "Cannot update profile"));
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSubmitPassword: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (password.password !== password.password_confirm) {
      setPasswordError("Passwords do not match");
      return;
    }

    setSavingPassword(true);
    try {
      const { data } = await updateCurrentUserPassword(password);
      setPassword({ password: "", password_confirm: "" });
      setPasswordMessage(data.message);
    } catch (error) {
      setPasswordError(getErrorMessage(error, "Cannot update password"));
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <DashboardPage>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <PageHeader title="Profile" />
        <AlertMessage message={profileError} />
        {profileMessage ? (
          <div className="alert alert-success" role="status">
            {profileMessage}
          </div>
        ) : null}

        <form onSubmit={handleSubmitProfile} className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="firstName" className="form-label">First name</label>
            <input id="firstName" name="firstName" type="text" value={profile.firstName} onChange={(event) => setProfile((current) => ({ ...current, firstName: event.target.value }))} className="form-control" required />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="lastName" className="form-label">Last name</label>
            <input id="lastName" name="lastName" type="text" value={profile.lastName} onChange={(event) => setProfile((current) => ({ ...current, lastName: event.target.value }))} className="form-control" required />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input id="email" name="email" type="email" value={profile.email} onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))} className="form-control" required />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-outline-primary" disabled={savingProfile}>
              {savingProfile ? "Saving..." : "Save"}
            </button>
          </div>
        </form>

        <PageHeader title="Change Password" />
        <AlertMessage message={passwordError} />
        {passwordMessage ? (
          <div className="alert alert-success" role="status">
            {passwordMessage}
          </div>
        ) : null}

        <form onSubmit={handleSubmitPassword} className="row g-3">
          <div className="mb-3 col-md-6">
            <label htmlFor="password" className="form-label">Password</label>
            <input id="password" name="password" type="password" minLength={6} value={password.password} onChange={(event) => setPassword((current) => ({ ...current, password: event.target.value }))} className="form-control" required />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="password_confirm" className="form-label">Confirm password</label>
            <input id="password_confirm" name="password_confirm" type="password" minLength={6} value={password.password_confirm} onChange={(event) => setPassword((current) => ({ ...current, password_confirm: event.target.value }))} className="form-control" required />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-outline-primary" disabled={savingPassword}>
              {savingPassword ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </main>
    </DashboardPage>
  );
}

export default Profile;
