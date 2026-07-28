import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listRoles } from "../../features/roles/api";
import type { Role } from "../../features/roles/types";
import { getUser, updateUser } from "../../features/users/api";
import { UserForm } from "../../features/users/components/UserForm";
import type { UserFormValues } from "../../features/users/types";
import { getErrorMessage } from "../../shared/api/getErrorMessage";
import { AlertMessage } from "../../shared/components/AlertMessage";
import { DashboardPage } from "../../shared/components/DashboardPage";
import { PageHeader } from "../../shared/components/PageHeader";

const initialValues: UserFormValues = { firstName: "", lastName: "", email: "", roleId: "" };

function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([getUser(id), listRoles()]).then(([user, roleList]) => {
      setValues({ firstName: user.firstName, lastName: user.lastName, email: user.email, roleId: user.role ? String(user.role.id) : "" });
      setRoles(roleList);
    }).catch((error) => setError(getErrorMessage(error, "Cannot load user")));
  }, [id]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault(); if (!id) return; setError(""); setSaving(true);
    try {
      await updateUser(id, { firstName: values.firstName, lastName: values.lastName, email: values.email, role: values.roleId ? { id: Number(values.roleId) } : undefined });
      navigate("/user");
    } catch (error) { setError(getErrorMessage(error, "Cannot update user")); } finally { setSaving(false); }
  };

  return <DashboardPage><main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"><PageHeader title="Edit User" /><AlertMessage message={error} /><UserForm values={values} roles={roles} saving={saving} onChange={(event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))} onSubmit={handleSubmit} /></main></DashboardPage>;
}

export default UserEdit;
