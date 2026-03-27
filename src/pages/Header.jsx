import React, { useContext } from "react";
import "./header.css";
import userImg from "../images/me.jpg";
import { AppContext } from "../App";


function Header({ toggleActive, sectionActive }) {
    const { bag, library, currentUser, logout } = useContext(AppContext);

    return (
        <header>
            <a href="/" className="menu" onClick={(event) => { event.preventDefault(); toggleActive(); }}>
                <i className="bi bi-sliders"></i>
            </a>
            <div className="userItems">
                <a href="/" className="icon" onClick={(event) => { event.preventDefault(); sectionActive('library'); }}>
                    <i className="bi bi-heart-fill"></i>
                    <span className="like">{library.length}</span>
                </a>
                <a href="/" className="icon" onClick={(event) => { event.preventDefault(); sectionActive('bag'); }}>
                    <i className="bi bi-bag-fill"></i>
                    <span className="bag">{bag.length}</span>
                </a>
                <div className="avatar">
                    <a href="/" onClick={(event) => event.preventDefault()}>
                        <img src={userImg} alt="User avatar" />
                    </a>
                    <div className="user">
                        <span>{currentUser?.username || "User"}</span>
                        <a
                            href="/"
                            onClick={(event) => {
                                event.preventDefault();
                                logout();
                            }}
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
