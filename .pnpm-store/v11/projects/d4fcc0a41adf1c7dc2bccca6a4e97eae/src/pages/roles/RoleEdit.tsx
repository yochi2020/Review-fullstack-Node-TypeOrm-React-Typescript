import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRole, listPermissions, updateRole } from "../../features/roles/api";
import { RoleForm } from "../../features/roles/components/RoleForm";
import type { Permission } from "../../features/roles/types";
import { getErrorMessage } from "../../shared/api/getErrorMessage";
import { AlertMessage } from "../../shared/components/AlertMessage";
import { DashboardPage } from "../../shared/components/DashboardPage";
import { PageHeader } from "../../shared/components/PageHeader";

function RoleEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([getRole(id), listPermissions()])
      .then(([role, permissionList]) => {
        setName(role?.name || "");
        setSelectedPermissionIds(role?.permissions?.map(({ id }) => id) || []);
        setPermissions(permissionList);
      })
      .catch((error) => setError(getErrorMessage(error, "Cannot load role")));
  }, [id]);

  const togglePermission = (permissionId: number) => {
    setSelectedPermissionIds((current) =>
      current.includes(permissionId)
        ? current.filter((item) => item !== permissionId)
        : [...current, permissionId]
    );
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!id) return;
    setError("");
    setSaving(true);
    try {
      await updateRole(id, { name, permission: selectedPermissionIds });
      navigate("/role");
    } catch (error) {
      setError(getErrorMessage(error, "Cannot update role"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardPage>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <PageHeader title="Edit Role" />
        <AlertMessage message={error} />
        <RoleForm name={name} permissions={permissions} selectedPermissionIds={selectedPermissionIds} saving={saving} onNameChange={setName} onPermissionToggle={togglePermission} onSubmit={handleSubmit} />
      </main>
    </DashboardPage>
  );
}

export default RoleEdit;
