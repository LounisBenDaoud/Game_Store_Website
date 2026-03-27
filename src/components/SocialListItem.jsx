import React from "react";

function SocialListItem({ social }) {
  return (
    <li>
      <a href="/" onClick={(event) => event.preventDefault()}>
        <i className={`bi ${social.icon}`}></i>
      </a>
    </li>
  );
}

export default SocialListItem;
