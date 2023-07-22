import React from "react";
import "./UserCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.first_name} />
      <div className="user-details">
        <h2>{`${user.first_name} ${user.last_name}`}</h2>
        <p>Email: {user.email}</p>
        <p>Gender: {user.gender}</p>
        <p>Domain: {user.domain}</p>
        <p>Available: {user.available ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default UserCard;
