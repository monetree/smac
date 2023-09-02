import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const Admin = ({}) => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [role, setRole] = useState(null);

  const getUser = () => {
    axios
      .get(
        `https://api.polyverse.app/api/whitelisted-emails/${localStorage.getItem(
          "id"
        )}/`
      )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getUsers = () => {
    let url = `https://api.polyverse.app/api/whitelisted-emails/`;
    if (localStorage.getItem("role") !== "ADMIN") {
      url = `${url}`;
    }

    axios
      .get(url)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const InviteMail = (email) => {
    axios
      .post(`https://api.polyverse.app/api/email-invitation/`, {
        email: email,
      })
      .then((res) => {
        if (res.data) {
          setIsPopup(false);
          setEmail(null);
          setName(null);
          setOrganization(null);
          setRole(null);
          getUsers();
          alert("Successfully invited the user.");
        }
      })
      .catch((err) => {
        alert("Failed to invited the user.");
        console.log(err);
      });
  };

  const InviteUser = () => {
    // if (!organization) {
    //   alert("organization required !");
    //   return;
    // }
    axios
      .post(`https://api.polyverse.app/api/whitelisted-emails/`, {
        name: name,
        // organization: organization,
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
                    <u>Organization</u>
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
                    <td>{"N/A"}</td>
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
                      <button className="btn btn-light btn-sm">Delete</button>
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
                <form action="/action_page.php">
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

                  {/* <div className="form-group mb-2">
                    <label for="organization" style={{ color: "#000" }}>
                      Organization:
                    </label>
                    {user.role === "ADMIN" ? (
                      <input
                        type="organization"
                        className="form-control"
                        id="organization"
                        onChange={(e) => setOrganization(e.target.value)}
                        value={organization}
                        placeholder="Enter organization"
                      />
                    ) : (
                      <input
                        type="organization"
                        className="form-control"
                        id="organization"
                        value={user.organization}
                        placeholder="Enter organization"
                        disabled
                      />
                    )}
                  </div> */}

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
