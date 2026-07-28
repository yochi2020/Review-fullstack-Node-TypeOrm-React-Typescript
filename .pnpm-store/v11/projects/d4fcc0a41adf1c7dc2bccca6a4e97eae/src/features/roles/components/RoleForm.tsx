import type { FormEvent } from "react";
import type { Permission } from "../types";

type RoleFormProps = {
  name: string;
  permissions: Permission[];
  selectedPermissionIds: number[];
  saving: boolean;
  onNameChange: (name: string) => void;
  onPermissionToggle: (id: number) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function RoleForm({
  name,
  permissions,
  selectedPermissionIds,
  saving,
  onNameChange,
  onPermissionToggle,
  onSubmit,
}: RoleFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-2 pt-0">Permissions</legend>
        <div className="col-sm-10 row g-2">
          {permissions.map((permission) => {
            const inputId = `permission-${permission.id}`;
            return (
              <div className="col-sm-4 col-lg-3" key={permission.id}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={inputId}
                    checked={selectedPermissionIds.includes(permission.id)}
                    onChange={() => onPermissionToggle(permission.id)}
                  />
                  <label className="form-check-label" htmlFor={inputId}>
                    {permission.name}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>

      <button type="submit" className="btn btn-outline-primary" disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
