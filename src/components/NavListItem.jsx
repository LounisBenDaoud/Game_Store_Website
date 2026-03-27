import React from "react";

function NavListItem({ item, navOnClick }) {
    return (
        <li>
            <a
                href="/"
                className={`${item.active ? 'active' : undefined}`}
                onClick={(event) => {
                    event.preventDefault();
                    navOnClick(item._id, item.target);
                }}
            >
                <i className={`bi ${item.icon}`}></i>
                <span className="navName">{item.name}</span>
            </a>
        </li>
    );
}

export default NavListItem;
