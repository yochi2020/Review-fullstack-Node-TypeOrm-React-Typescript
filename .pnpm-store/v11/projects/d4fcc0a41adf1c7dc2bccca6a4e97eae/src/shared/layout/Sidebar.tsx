import { NavLink } from "react-router-dom";

const navItems = [
  ["house-fill", "Dashboard", "/dashboard"],
  ["people", "Users", "/user"],
  ["person-gear", "Roles", "/role"],
  ["box-seam", "Products", "/product"],
  ["box-seam", "Order", "/order"],
] as const;

function Icon({ name }: { name: string }) {
  return (
    <svg className="bi" aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div
        className="offcanvas-md offcanvas-end bg-body-tertiary"
        tabIndex={-1}
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            {navItems.map(([icon, label, path]) => (
              <li className="nav-item" key={path}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center gap-2${isActive ? " active" : ""}`
                  }
                  to={path}
                >
                  <Icon name={icon} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
