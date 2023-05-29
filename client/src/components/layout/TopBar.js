import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="nav-bar-text nav-bar-color">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="nav-bar-text nav-bar-color">Sign Up</Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  let authenticatedUsername = [
  ]
  if(user) {
    authenticatedUsername = [
      <li key="username">
        {user.username}
      </li>
    ]
  }

  return (
    <div className="top-bar nav-bar-color">
      <div className="top-bar-left">
        <ul className="menu nav-bar-color">
            <Link to="/home" className="nav-bar-text nav-bar-color">Home </Link>
            {user ? <Link to="/lists" className="nav-bar-text nav-bar-color"> My Lists</Link> : null}
            {user ? <Link to="/lists/new" className="nav-bar-text nav-bar-color">New List</Link> : null}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          <Link to="/lists" className="nav-bar-text nav-bar-color">{authenticatedUsername}</Link>
          {user ? authenticatedListItems : unauthenticatedListItems}
        </ul>
      </div>
    </div>
  );
};

export default TopBar;