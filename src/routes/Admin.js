import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import "./index.css";

const Admin = ({}) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [organization, setOrganization] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [role, setRole] = useState(null);
  const [orgList, setOrgList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewedUser, setViewedUser] = useState({});

  useEffect(() => {
    let data_ = [];
    for (let i of organization) {
      data_.push(i.id);
    }
    setOrgList(data_);
  }, [organization]);

  const API_URL = "https://api.polyverse.app";
  // const API_URL = "http://127.0.0.1:8000";

  const getOrganizations = () => {
    let url = `${API_URL}/api/organizations/`;
    axios
      .get(url)
      .then((res) => {
        setOrganizations(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getUsers = (orgs, role) => {
    let url = `${API_URL}/api/users/`;
    if (orgs && orgs.length && role !== "ADMIN") {
      url = `${url}?ids=${orgs.toString()}`;
    }
    axios
      .get(url)
      .then((res) => {
        const key = "id";
        const arrayUniqueByKey = [
          ...new Map(res.data.map((item) => [item[key], item])).values(),
        ];
        setUsers(arrayUniqueByKey);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user) {
      getUsers(user.orgs, user.role);
    }
  }, [user]);

  const deleteUser = (id) => {
    setLoading(true);
    let url = `${API_URL}/api/whitelisted-emails/${id}/`;
    axios
      .delete(url)
      .then((res) => {
        getUsers(user.orgs, user.role);
      })
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    axios
      .get(`${API_URL}/api/whitelisted-emails/${localStorage.getItem("id")}/`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const InviteMail = (email) => {
    axios
      .post(`${API_URL}/api/email-invitation/`, {
        email: email,
      })
      .then((res) => {
        if (res.data) {
          setIsPopup(false);
          setEmail(null);
          setName(null);
          setOrganization([]);
          setRole(null);
          getUsers(user.orgs, user.role);
          alert("Successfully invited the user.");
        }
      })
      .catch((err) => {
        alert("Failed to invited the user.");
        console.log(err);
      });
  };

  const InviteUser = () => {
    if (!orgList.length) {
      alert("organization required !");
      return;
    }
    axios
      .post(`${API_URL}/api/whitelisted-emails/`, {
        name: name,
        orgs: orgList,
        email: email,
        role: role,
      })
      .then((res) => {
        if (res.data) {
          InviteMail(res.data.email);
        }
      })
      .catch((err) => {
        alert("Failed to invited the user.");
        console.log(err);
      });
  };

  const UpdateRole = (id, role) => {
    axios
      .patch(`${API_URL}/api/whitelisted-emails/${id}/`, {
        role: role,
      })
      .then((res) => {
        if (res.data) {
          getUsers(user.orgs, user.role);
          alert("Successfully updated the role.");
        }
      })
      .catch((err) => {
        alert("Failed to update the user.");
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
    getOrganizations();
  }, []);

  return (
    <div style={{ background: "black", color: "#fff" }}>
      <Header />
      <div className="mt-3 container" style={{ minHeight: "100vh" }}>
        <div style={{ color: "#fff", margin: "2em 0em" }}>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setIsPopup(true)}
            style={{ marginLeft: "2.5em" }}
          >
            Click Here to invite a new user
          </button>
        </div>
        <div className="row mt-5 ml-5">
          <div className="col-sm-10">
            <table
              class="table table-borderless"
              style={{ color: "#fff", marginLeft: "2em" }}
            >
              <thead>
                <tr>
                  <th>
                    <u>Organizations</u>
                  </th>
                  <th>
                    <u>Email</u>
                  </th>

                  <th>
                    <u>Role</u>
                  </th>

                  <th>Update</th>
                  <th>
                    <u>Action</u>
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user_, index) => (
                  <tr key={index}>
                    {user_.orgs && user_.orgs.length === 1 ? (
                      <td>
                        {user_.orgs.length ? `${user_.orgs[0].name}` : ""}
                      </td>
                    ) : (
                      <td>
                        {user_.orgs && user_.orgs.length
                          ? `${user_.orgs[0].name} + ${user_.orgs.length} more`
                          : "N/A"}
                      </td>
                    )}

                    <td>{user_.email}</td>
                    <td>
                      {user_.role === "REGULAR"
                        ? "Parent"
                        : user_.role === "ADMIN"
                        ? "Admin"
                        : "Administrator"}
                    </td>
                    <td>
                      {user_.role === "ADMIN" ? (
                        <select
                          className="form-control form-control-sm"
                          disabled={true}
                          style={{ cursor: "not-allowed", opacity: 0.8 }}
                        >
                          <option value="ADMIN">Admin</option>
                        </select>
                      ) : (
                        <select
                          className="form-control form-control-sm"
                          value={user_.role}
                          onChange={(e) => UpdateRole(user_.id, e.target.value)}
                          disabled={user.role !== "ADMIN"}
                          style={
                            user.role !== "ADMIN"
                              ? { cursor: "not-allowed", opacity: 0.8 }
                              : {}
                          }
                        >
                          <option>Select role</option>
                          <option value="ADMINISTRATOR">Administrator</option>
                          <option value="REGULAR">Parent</option>
                        </select>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-light btn-sm"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          setViewedUser(user_);
                          setViewPopup(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => deleteUser(user_.id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isPopup && (
        <div
          className="modal fade show"
          id="myModal"
          style={{ display: "block", background: "rgb(0,0,0, 0.8)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  onClick={() => setIsPopup(false)}
                  type="button"
                  className="btn-close"
                  dataBsDismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <h5
                  className="text-center"
                  style={{ color: "#000", marginBottom: "2em" }}
                >
                  Invite users to access AvatarX
                </h5>
                <form>
                  <div className="form-group mb-2">
                    <label for="name" style={{ color: "#000" }}>
                      Select organization:
                    </label>
                    <Multiselect
                      options={organizations}
                      selectedValues={organization}
                      onSelect={(selectedList, selectedItem) =>
                        setOrganization(selectedList)
                      }
                      onRemove={(selectedList, selectedItem) =>
                        setOrganization(selectedList)
                      }
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>

                  <div className="form-group mb-2">
                    <label for="name" style={{ color: "#000" }}>
                      Name:
                    </label>
                    <input
                      type="name"
                      className="form-control"
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="Enter name"
                    />
                  </div>

                  <div className="form-group mb-2">
                    <label for="email" style={{ color: "#000" }}>
                      Email address:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="form-group">
                    <label for="email" style={{ color: "#000" }}>
                      Select Role:
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => setRole(e.target.value)}
                      value={role}
                    >
                      <option>Select role</option>
                      {user.role === "ADMIN" ? (
                        <option value="ADMINISTRATOR">Administrator</option>
                      ) : (
                        ""
                      )}
                      <option value="REGULAR">Parent</option>
                    </select>
                  </div>
                </form>

                <div className="row mt-3">
                  <div className="col-sm-12">
                    <p className="text-center">
                      <button
                        className="btn popup-btn btn-block"
                        onClick={InviteUser}
                      >
                        Submit
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewPopup && (
        <div
          className="modal fade show"
          id="myModal"
          style={{ display: "block", background: "rgb(0,0,0, 0.8)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  onClick={() => setViewPopup(false)}
                  type="button"
                  className="btn-close"
                  dataBsDismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <div style={{ color: "#000", marginTop: "20px" }}>
                  <h5 style={{ color: "#000" }}>Hello {viewedUser.name}, </h5>
                  <h6 style={{ color: "#000" }}>
                    You have access to below organizations{" "}
                  </h6>
                  <ul style={{ color: "#000" }}>
                    {viewedUser.orgs.map((u, index) => (
                      <li style={{ color: "#000" }} key={index}>
                        {u.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="row mt-3">
                  <div className="col-sm-12">
                    <p className="text-center">
                      <button
                        className="btn popup-btn btn-block"
                        onClick={() => setViewPopup(false)}
                      >
                        Close
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
