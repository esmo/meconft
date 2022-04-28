import { Outlet, Link, NavLink } from "react-router-dom";

import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <header>
        <Link to="/">
          <img src="logo.png" />
        </Link>
        <nav>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/contact"
              >
                contact
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/"
              >
                create
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="app">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
