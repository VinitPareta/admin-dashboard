import React, { useMemo, useState } from "react";
import cx from "classnames";
import {
  Bell,
  ChevronDown,
  Envelope,
  Gear,
  List,
  Moon,
  Search,
  Sun,
} from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../../features/auth/authSlice";
import { useTheme } from "../../context/ThemeContext"; // ✅ import theme hook
import photo from "../../images/photo.jpg";
import s from "./Header.module.scss";

const Header = ({ sidebarOpen, sidebarToggle }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const session = useAppSelector((state) => state.auth.session);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme(); // ✅ get theme state and toggle

  const adminName = useMemo(
    () => session?.user.name ?? "Administrator",
    [session],
  );

  return (
    <header className={cx("navbar", s.root)}>
      <div className="d-flex align-items-center gap-3">
        <button
          aria-controls="dashboard-sidebar"
          aria-expanded={sidebarOpen}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          className={cx(
            "btn btn-link text-muted p-0",
            s.headerIcon,
            s.sidebarToggler,
          )}
          onClick={sidebarToggle}
          type="button"
        >
          <List aria-hidden="true" size={28} />
        </button>
        <div className="input-group rounded-0">
          <input
            aria-label="Search dashboard"
            className="form-control"
            placeholder="Search dashboard..."
            type="search"
          />
          <span aria-hidden="true" className="input-group-append px-2">
            <Search aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="d-flex align-items-center ms-auto">
        <div className={s.headerIcon}>
          <button aria-label="Open messages" className="btn" type="button">
            <Envelope aria-hidden="true" size={18} />
            <span aria-hidden="true">8</span>
          </button>
        </div>
        <div className={s.headerIcon}>
          <button aria-label="Open notifications" className="btn" type="button">
            <Bell aria-hidden="true" size={18} />
            <span aria-hidden="true">13</span>
          </button>
        </div>
        <div className={s.headerIcon}>
          <button aria-label="Open settings" className="btn" type="button">
            <Gear aria-hidden="true" size={18} />
          </button>
        </div>

        {/* ✅ DARK MODE TOGGLE BUTTON */}
        <div className={s.headerIcon}>
          <button
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="btn"
            type="button"
            onClick={toggleTheme}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? (
              <Sun aria-hidden="true" size={18} /> // show sun in dark mode
            ) : (
              <Moon aria-hidden="true" size={18} /> // show moon in light mode
            )}
          </button>
        </div>

        <div className="dropdown">
          <button
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-label="Open user menu"
            className="btn d-flex align-items-center gap-2"
            onClick={() => setDropdownOpen((value) => !value)}
            type="button"
          >
            <img
              className={cx("rounded-circle", s.adminPhoto)}
              src={photo}
              alt="administrator"
            />
            <span className="text-body">{adminName}</span>
            <ChevronDown
              aria-hidden="true"
              className={cx(s.arrow, { [s.arrowActive]: dropdownOpen })}
            />
          </button>
          <div
            className={cx("dropdown-menu dropdown-menu-end shadow-sm", {
              show: dropdownOpen,
            })}
            role="menu"
          >
            <NavLink
              className="dropdown-item"
              to="/app/profile"
              onClick={() => setDropdownOpen(false)}
            >
              Profile
            </NavLink>
            <button
              className="dropdown-item"
              onClick={() => {
                setDropdownOpen(false);
                dispatch(logoutUser());
                navigate("/login");
              }}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
