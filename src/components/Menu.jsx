import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen ] = useState(false);
  const { isAuthenticated, username, logout } = useContext(AuthContext);
  const location = useLocation();

  const handleProfileClick = () => {
    setSelectedMenu(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="./src/assets/logo.png" style={{ width: "40px" }} />
      <div className="menus">
        <ul>
          <li>
          <Link
              style={{ textDecoration: "none" }}
              to="/"
            >
              <p className={location.pathname === "/"? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
          <Link
              style={{ textDecoration: "none" }}
              to="/orders"
            >
              <p className={location.pathname === "/Orders" ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
            >
              <p className={location.pathname === "/holdings" ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
            >
              <p className={location.pathname === "/positions" ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
            >
              <p className={location.pathname === "/funds" ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
            >
              <p className={location.pathname === "/apps" ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">ZU</div>
          <p className="username">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
