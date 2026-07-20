import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteRole, listRoles } from "../../features/roles/api";
import type { Role as RoleModel } from "../../features/roles/types";
import { getErrorMessage } from "../../shared/api/getErrorMessage";
import { AlertMessage } from "../../shared/components/AlertMessage";
import { DashboardPage } from "../../shared/components/DashboardPage";
import { PageHeader } from "../../shared/components/PageHeader";

function RoleList() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<RoleModel[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    listRoles().then(setRoles).catch((error) => setError(getErrorMessage(error, "Cannot load roles")));
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteRole(id);
      setRoles((current) => current.filter((role) => role.id !== id));
    } catch (error) {
      setError(getErrorMessage(error, "Cannot delete role"));
    }
  };

  return (
    <DashboardPage>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <PageHeader title="Roles" action={<NavLink to="/role-create" className="btn btn-outline-dark">Add</NavLink>} />
        <AlertMessage message={error} />
        <table className="table">
          <thead><tr><th>#</th><th>Name</th><th>Action</th></tr></thead>
          <tbody>{roles.map((role, index) => (
            <tr key={role.id}><th scope="row">{index + 1}</th><td>{role.name}</td><td>
              <button type="button" className="btn btn-outline-success btn-sm me-2" onClick={() => navigate(`/role/${role.id}/edit`)}>Edit</button>
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(role.id)}>Delete</button>
            </td></tr>
          ))}</tbody>
        </table>
      </main>
    </DashboardPage>
  );
}

export default RoleList;
