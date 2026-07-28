import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRole, listPermissions } from "../../features/roles/api";
import { RoleForm } from "../../features/roles/components/RoleForm";
import type { Permission } from "../../features/roles/types";
import { getErrorMessage } from "../../shared/api/getErrorMessage";
import { AlertMessage } from "../../shared/components/AlertMessage";
import { DashboardPage } from "../../shared/components/DashboardPage";
import { PageHeader } from "../../shared/components/PageHeader";

function RoleCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listPermissions()
      .then(setPermissions)
      .catch((error) => setError(getErrorMessage(error, "Cannot load permissions")));
  }, []);

  const togglePermission = (id: number) => {
    setSelectedPermissionIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      await createRole({ name, permission: selectedPermissionIds });
      navigate("/role");
    } catch (error) {
      setError(getErrorMessage(error, "Cannot create role"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardPage>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <PageHeader title="Create Role" />
        <AlertMessage message={error} />
        <RoleForm name={name} permissions={permissions} selectedPermissionIds={selectedPermissionIds} saving={saving} onNameChange={setName} onPermissionToggle={togglePermission} onSubmit={handleSubmit} />
      </main>
    </DashboardPage>
  );
}

export default RoleCreate;
