import type { ChangeEvent, FormEvent } from "react";
import type { Role } from "../../roles/types";
import type { UserFormValues } from "../types";

type UserFormProps = {
  values: UserFormValues;
  roles: Role[];
  includePassword?: boolean;
  saving: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function UserForm({ values, roles, includePassword = false, saving, onChange, onSubmit }: UserFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3"><label htmlFor="firstName" className="form-label">First name</label><input id="firstName" name="firstName" className="form-control" value={values.firstName} onChange={onChange} required /></div>
        <div className="col-md-6 mb-3"><label htmlFor="lastName" className="form-label">Last name</label><input id="lastName" name="lastName" className="form-control" value={values.lastName} onChange={onChange} required /></div>
        <div className="col-md-6 mb-3"><label htmlFor="email" className="form-label">Email</label><input id="email" name="email" type="email" className="form-control" value={values.email} onChange={onChange} required /></div>
        {includePassword ? <div className="col-md-6 mb-3"><label htmlFor="password" className="form-label">Password</label><input id="password" name="password" type="password" className="form-control" value={values.password || ""} onChange={onChange} required /></div> : null}
        <div className="col-md-6 mb-3">
          <label htmlFor="roleId" className="form-label">Role</label>
          <select id="roleId" name="roleId" className="form-select" value={values.roleId} onChange={onChange}>
            <option value="">Default role</option>
            {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-outline-primary" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
    </form>
  );
}
