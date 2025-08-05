import React from "react";

function SocialListItem({ social }) {
  return (
    <li>
      <a href="#">
        <i className={`bi ${social.icon}`}></i>
      </a>
    </li>
  );
}

export default SocialListItem;
