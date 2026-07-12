import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listRoles } from "../../features/roles/api";
import type { Role } from "../../features/roles/types";
import { createUser } from "../../features/users/api";
import { UserForm } from "../../features/users/components/UserForm";
import type { UserFormValues } from "../../features/users/types";
import { getErrorMessage } from "../../shared/api/getErrorMessage";
import { AlertMessage } from "../../shared/components/AlertMessage";
import { DashboardPage } from "../../shared/components/DashboardPage";
import { PageHeader } from "../../shared/components/PageHeader";

const initialValues: UserFormValues = { firstName: "", lastName: "", email: "", password: "", roleId: "" };

function UserCreate() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { listRoles().then(setRoles).catch((error) => setError(getErrorMessage(error, "Cannot load roles"))); }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault(); setError(""); setSaving(true);
    try {
      await createUser({ firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password, roleId: values.roleId ? Number(values.roleId) : undefined });
      navigate("/user");
    } catch (error) { setError(getErrorMessage(error, "Cannot create user")); } finally { setSaving(false); }
  };

  return <DashboardPage><main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"><PageHeader title="Create User" /><AlertMessage message={error} /><UserForm values={values} roles={roles} includePassword saving={saving} onChange={(event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))} onSubmit={handleSubmit} /></main></DashboardPage>;
}

export default UserCreate;
