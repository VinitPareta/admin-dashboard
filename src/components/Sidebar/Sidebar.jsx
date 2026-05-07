import React from "react";
import { Link } from "react-router-dom";

import Icon from "../Icon";
import LinksGroup from "./LinksGroup/LinksGroup";
import s from "./Sidebar.module.scss";

const Sidebar = () => (
  <nav
    aria-label="Primary navigation"
    className={s.root}
    id="dashboard-sidebar"
  >
    <header className={s.logo}>
      <Link aria-label="Dashboard home" to="/app/main">
        <Icon decorative glyph="logo" />
      </Link>
    </header>
    <ul className={s.nav}>
      <LinksGroup glyph="dashboard" header="Dashboard" headerLink="/app/main" />
      <LinksGroup
        glyph="typography"
        header="Typography"
        headerLink="/app/typography"
      />
      <LinksGroup
        glyph="tables"
        header="Tables Basic"
        headerLink="/app/tables"
      />
      <LinksGroup
        glyph="notifications"
        header="Notifications"
        headerLink="/app/notifications"
      />
      <LinksGroup glyph="users" header="Users" headerLink="/app/user" />{" "}
      {/* adding the user in the side bar  */}
      <LinksGroup glyph="posts" header="Posts" headerLink="/app/posts" />
      {/* adding the post in the side bar */}
      <LinksGroup
        glyph="components"
        header="Components"
        headerLink="/app/components"
        childrenLinks={[
          { name: "Buttons", link: "/app/components/buttons" },
          { name: "Charts", link: "/app/components/charts" },
          { name: "Icons", link: "/app/components/icons" },
          { name: "Maps", link: "/app/components/maps" },
        ]}
      />
    </ul>
  </nav>
);

export default Sidebar;
