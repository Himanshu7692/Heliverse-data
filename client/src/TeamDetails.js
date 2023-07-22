import React from "react";

const TeamDetails = ({ selectedUsers }) => {
  return (
    <div>
      {selectedUsers.map((user) => (
        <div key={user.id}>
          <p>
            Name: {user.first_name} {user.last_name}
          </p>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Domain: {user.domain}</p>
          <p>Available: {user.available.toString()}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamDetails;
