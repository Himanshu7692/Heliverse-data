import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import TeamDetails from "./TeamDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, addToTeam } from "./actions/userActions";
import "./userList.css";

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    availability: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleAddToTeam = (user) => {
    dispatch(addToTeam(user));
  };

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const selectedUsers = useSelector((state) => state.user.selectedUsers);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/users`
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const isUserSelected = (user) => {
    return selectedUsers.some((selectedUser) => selectedUser.id === user.id);
  };

  const filteredUsers = users.filter((user) => {
    const { domain, gender, availability } = filters;
    const domainMatch = domain
      ? user.domain.toLowerCase() === domain.toLowerCase()
      : true;
    const genderMatch = gender
      ? user.gender.toLowerCase() === gender.toLowerCase()
      : true;
    const availabilityMatch = availability
      ? user.available === (availability === "true")
      : true;

    return (
      domainMatch &&
      genderMatch &&
      availabilityMatch &&
      (user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="user-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="filters">
        <select
          name="domain"
          value={filters.domain}
          onChange={handleFilterChange}
        >
          <option value="">All Domains</option>

          <option value="domain1">Domain 1</option>
          <option value="domain2">Domain 2</option>
        </select>

        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <select
          name="availability"
          value={filters.availability}
          onChange={handleFilterChange}
        >
          <option value="">All Availabilities</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
      <div className="team-list">
        <h2>Team Members:</h2>
        <TeamDetails selectedUsers={selectedUsers} />
      </div>
      <div className="user-list">
        {currentUsers.map((user) => (
          <div key={user.id} className="user-card">
            <UserCard user={user} />
            {!isUserSelected(user) && (
              <button onClick={() => handleAddToTeam(user)}>Add to Team</button>
            )}
            {isUserSelected(user) && <button disabled>Added</button>}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          style={{ color: "greenyellow", backgroundColor: "black" }}
          onClick={handlePreviousPage}
        >
          &lt; Previous
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            style={{ color: "greenyellow", backgroundColor: "black" }}
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          style={{ color: "greenyellow", backgroundColor: "black" }}
          onClick={handleNextPage}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default UserList;
