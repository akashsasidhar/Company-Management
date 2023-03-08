import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmailValid, isNameValid } from "..//helpers/validate";
import { createUser, getUserList } from "../action/company";

const CreateUser = ({ id, companyName }) => {
  const [firstName, setFirstName] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [designation, setDesignation] = useState("");
  const [dob, setDob] = useState("");
  const [userList, setUserList] = useState([]);
  let listValues = [];
  const customCentered = {
    alignItems: "center",
    minHeight: "20vh",
    maxWidth: "50%",
    overflow: "auto",
    position: "absolute",
  };
  const fixCentered = {
    margin: "0 auto",
    overflowY: "auto",
    maxWidth: "100%",
    padding: "10px",
  };
  const checkFirstName = async () => {
    const nameValid = isNameValid(firstName);
    if (!nameValid) {
      setFirstNameErr("Please enter a valid first name");
    } else {
      setFirstNameErr("");
    }
  };
  const checkLastName = async () => {
    const nameValid = isNameValid(lastName);
    if (!nameValid) {
      setLastNameErr("Please enter a valid last name");
    } else {
      setLastNameErr("");
    }
  };
  const checkEmail = async () => {
    const emailValid = isEmailValid(email);
    if (!emailValid) {
      setEmailErr("Please enter a valid email");
    } else {
      setEmailErr("");
    }
  };
  async function saveUser(data) {
    const res = await createUser(data);
    setFirstName("");
    setLastName("");
    setEmail("");
    setDesignation("");
    setDob("");
    alert("User Created Successfully");
    return res;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      designation: designation,
      companyId: id,
    };
    if (!firstNameErr && !lastNameErr && !emailErr) {
      await saveUser(data);
      await fetchData(id);
    }
  };
  async function fetchData(id) {
    const response = await getUserList(id);
    setUserList(response);
  }
  useEffect(() => {
    fetchData(id);
  }, []);

  if (Array.isArray(userList)) {
    listValues = userList.map((user, index) => (
      <>
        <tr key={user.userid}>
          <td className="col mb-3">{user.first_name}</td>
          <td className="col mb-3">{user.last_name}</td>
          <td className="col mb-3">{user.designation}</td>
          <td className="col mb-3">{user.date_of_birth}</td>
          <td className="col mb-3">
            <button className="btn btn-warning">
              <Link
                to={`/user/${user.userid}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                Migrate
              </Link>
            </button>
          </td>
        </tr>
      </>
    ));
  } else {
    listValues = (
      <tr>
        <td colSpan={5}>No User Found</td>
      </tr>
    );
  }
  return (
    <>
      <div className="container ">
        <div className=" row d-flex" style={customCentered}>
          <div className="col-auto">
            <h3>Create User</h3>
            <form className="form" onSubmit={onSubmit}>
              <div className="row mb-3">
                <div className="row g-1">
                  <div className="col">
                    <input
                      type="text"
                      className={`form-control ${
                        firstNameErr ? "is-invalid" : ""
                      }`}
                      placeholder="First Name"
                      aria-label="First Name"
                      name="firstName"
                      onBlur={checkFirstName}
                      autoComplete="off"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      required
                    />
                    {firstNameErr ? (
                      <span className="input-error-message" key={firstNameErr}>
                        {firstNameErr}
                      </span>
                    ) : null}
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className={`form-control ${
                        lastNameErr ? "is-invalid" : ""
                      }`}
                      placeholder="Last Name"
                      aria-label="Last Name"
                      name="lastName"
                      onBlur={checkLastName}
                      autoComplete="off"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    {lastNameErr ? (
                      <span className="input-error-message" key={lastNameErr}>
                        {lastNameErr}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className=" form-group g-2">
                  <input
                    type="text"
                    className={`form-control ${emailErr ? "is-invalid" : ""}`}
                    placeholder="Email"
                    aria-label="Email"
                    name="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    onBlur={checkEmail}
                    required
                  />
                  {emailErr ? (
                    <span className="input-error-message" key={emailErr}>
                      {emailErr}
                    </span>
                  ) : null}
                </div>

                <div className="form-group g-2">
                  <input
                    type="text"
                    className={`form-control`}
                    placeholder="Designation"
                    aria-label="Designation"
                    name="designation"
                    value={designation}
                    autoComplete="off"
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>
                <div className="form-group g-2">
                  <input
                    type="date"
                    className={`form-control`}
                    placeholder="Date Of Birth"
                    aria-label="Date Of Birth"
                    name="dob"
                    value={dob}
                    autoComplete="off"
                    format="dd-MM-yyyy"
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group g-2">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="container-fluid" style={fixCentered}>
            <h2>User Details</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Designation</th>
                  <th>Date of Birth</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{userList && listValues}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateUser;
