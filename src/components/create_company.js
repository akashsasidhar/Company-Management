import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  createCompany,
  deleteCompany,
  getCompanyList,
} from "../action/company";
export const CreateCompany = () => {
  const [name, setName] = useState("");
  const [company_address, setCompanyAddress] = useState("");
  const [companyList, setCompanyList] = useState(null);
  let listValues;
  let confirmed = false;
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setCompanyAddress(e.target.value);
  };
  const customCentered = {
    position: "fixed",
    backgroundColor: "#ffffff",
    padding: "1%",
    zIndex: "999",
    alignItems: "center",
    minHeight: "5vh",
    margin: "0 auto",
    maxWidth: "100%",
  };

  const fixCentered = {
    margin: "10% auto",
    position: "absolute",
    top: "15%",
    overflowY: "auto",
    height: "calc(100% - 10%)",
    maxWidth: "100%",
    padding: "10px",
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      company_address: company_address,
    };
    await createCompany(data);
    await fetchData();
    setCompanyAddress("");
    setName("");
  };
  async function fetchData() {
    const response = await getCompanyList();
    setCompanyList(response);
  }
  const handleConfirmDelete = (companyId) => {
    confirmed = window.confirm("Are you sure you want to delete this Company?");
    console.log(companyId, "company");
    if (confirmed) {
      handleDelete(companyId);
    }
  };
  const handleDelete = async (id) => {
    console.log(id, "companya");

    await deleteCompany(id);
    await fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (Array.isArray(companyList)) {
    listValues = companyList.map((company, index) => (
      <>
        <tr key={company.id}>
          <td className="col mb-3">{company.name}</td>
          <td className="col mb-3">{company.company_address}</td>
          <td className="col mb-3">{company.longitude}</td>
          <td className="col mb-3">{company.latitude}</td>
          <td className="col mb-3">
            <button className="btn btn-primary">
              <Link
                to={`/company/${company.id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                Edit
              </Link>
            </button>
            <button
              className="btn btn-warning"
              onClick={() => handleConfirmDelete({ id: company.id })}
            >
              Delete
            </button>
          </td>
        </tr>
      </>
    ));
  } else {
    listValues = (
      <tr>
        <td colSpan={5}>No Company Found</td>
      </tr>
    );
  }
  return (
    <>
      <div className="container-fluid ">
        <div className=" row d-flex " style={customCentered}>
          <div className="container-fluid">
            <h1 style={{ textAlign: "center" }}>Create Company</h1>
            <form onSubmit={onSubmit}>
              <div className="row mb-3 ">
                <div className="col mb-3 form-group">
                  <label>Company Name</label>
                  <br />
                  <input
                    name="name"
                    placeholder="Enter the company name"
                    onChange={handleNameChange}
                    value={name}
                    required={true}
                  />
                </div>
                <div className="col mb-3 ">
                  <label>Company Address</label>
                  <br />
                  <input
                    name="company_address"
                    placeholder="Enter the company address"
                    onChange={handleAddressChange}
                    value={company_address}
                    required={true}
                  />
                </div>
              </div>

              <div className="form-group g-2">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/*  */}
        </div>
        <div className="container-fluid" style={fixCentered}>
          <h1 style={{ textAlign: "center" }}>Manage Company</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Company Address</th>
                <th> Longitude</th>
                <th> Latitude</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>{listValues}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};
