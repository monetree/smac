import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const Admin = ({}) => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  const getUser = () => {
    axios
      .get(
        `https://api.polyverse.app/api/whitelisted-emails/${localStorage.getItem(
          "id"
        )}`
      )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const InviteUser = () => {
    axios
      .post(`https://api.polyverse.app/api/whitelisted-emails/`, {
        email: email,
        role: role,
      })
      .then((res) => {
        if (res.data) {
          setIsPopup(false);
          setEmail(null);
          setRole(null);
          alert("Successfully invited the user.");
        }
      })
      .catch((err) => {
        alert("Failed to invited the user.");
        console.log(err);
      });
  };

  const getUsers = () => {
    axios
      .get(`https://api.polyverse.app/api/whitelisted-emails/`)
      .then((res) => {
        const userss = [];
        for (let i of res.data) {
          if (i.role !== "ADMIN") {
            userss.push(i);
          }
        }
        setUsers(userss);
      })
      .catch((err) => console.log(err));
  };

  const UpdateRole = (id, role) => {
    axios
      .patch(`https://api.polyverse.app/api/whitelisted-emails/${id}/`, {
        role: role,
      })
      .then((res) => {
        if (res.data) {
          getUsers();
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
    getUsers();
  }, []);

  return (
    <div style={{ background: "black", color: "#fff" }}>
      <Header />
      <div className="mt-3 container">
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
                    <td>{user_.email}</td>
                    <td>
                      {user_.role === "REGULAR"
                        ? "Parent"
                        : user_.role === "ADMIN"
                        ? "Admin"
                        : "Administrator"}
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={user_.role}
                        onChange={(e) => UpdateRole(user_.id, e.target.value)}
                        disabled={user.role !== "ADMIN"}
                      >
                        <option>Select role</option>
                        <option value="ADMINISTRATOR">Administrator</option>
                        <option value="REGULAR">Parent</option>
                      </select>
                    </td>
                    <td>
                      <button
                        disabled={user.role !== "ADMIN"}
                        className="btn btn-light btn-sm"
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
        <div className="modal block" id="myModal">
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
                <form action="/action_page.php">
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
    </div>
  );
};

export default Admin;
