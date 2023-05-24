import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new">Sign Up</Link>
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
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
            <Link to="/home">Home</Link>
            {user ? <Link to="/lists">My Lists</Link> : null}
            {user ? <Link to="/lists/new">New List</Link> : null}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          {authenticatedUsername}
          {user ? authenticatedListItems : unauthenticatedListItems}
        </ul>
      </div>
    </div>
  );
};

export default TopBar;