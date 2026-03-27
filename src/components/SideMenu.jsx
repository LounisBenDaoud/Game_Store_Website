import React, { useState } from "react";
import "./sidemenu.css";
import navListData from "../data/navListData";
import socialListData from "../data/socialListData";
import NavListItem from "./NavListItem";
import SocialListItem from "./SocialListItem";

function SideMenu({ active, sectionActive, activeSection }) {
  const [socialData] = useState(socialListData);

  const handleNavOnClick = (_id, target) => {
    sectionActive(target);
  };

  return (
    <div className={`sideMenu ${active ? "active" : undefined}`}>
      <a href="/" className="logo" onClick={(event) => event.preventDefault()}>
        <i className="bi bi-controller"></i>
        <span className="brand">Play</span>
      </a>
      <ul className="nav">
        {navListData.map((item) => (
          <NavListItem
            key={item._id}
            item={{ ...item, active: item.target === activeSection }}
            navOnClick={handleNavOnClick}
          />
        ))}
      </ul>
      <ul className="social">
        {socialData.map((social) => (
          <SocialListItem key={social._id} social={social} />
        ))}
        <li>
          <a href="/" className="share" onClick={(event) => event.preventDefault()}>
            <i className="bi bi-share"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideMenu;
