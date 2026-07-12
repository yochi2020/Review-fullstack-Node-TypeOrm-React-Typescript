import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteUser, listUsers } from "../../features/users/api";
import type { User } from "../../features/users/types";
import { getErrorMessage } from "../../shared/api/getErrorMessage";
import { AlertMessage } from "../../shared/components/AlertMessage";
import { DashboardPage } from "../../shared/components/DashboardPage";
import { PageHeader } from "../../shared/components/PageHeader";

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    listUsers()
      .then(setUsers)
      .catch((error) => setError(getErrorMessage(error, "Cannot load users")));
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteUser(id);
      setUsers((current) => current.filter((user) => user.id !== id));
    } catch (error) {
      setError(getErrorMessage(error, "Cannot delete user"));
    }
  };

  return (
    <DashboardPage>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <PageHeader
          title="Users"
          action={
            <NavLink to="/user-create" className="btn btn-outline-dark">
              Add
            </NavLink>
          }
        />
        <AlertMessage message={error} />
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role?.name || "-"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => navigate(`/user/${user.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardPage>
  );
}

export default UserList;
