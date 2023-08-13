import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="top-nav">
      <div className="nav-text-large">My App</div>
      <ul className="nav-list">
        <li>
          <NavLink to="/posts" end>
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" end>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/todos" end>
            Todos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
