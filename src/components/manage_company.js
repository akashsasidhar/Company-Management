import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCompanyDetail, getUserDetailByCompany } from "../action/company";
import CreateUser from "./createUser";

export const ManageCompany = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const customCentered = {
    backgroundColor: "#ffffff",
    padding: "1%",
    alignItems: "center",
    margin: "0 auto",
    maxWidth: "100%",
  };

  async function fetchData() {
    const response1 = await getCompanyDetail(id);
    setCompany(response1);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className=" row d-flex " style={customCentered}>
          {company && (
            <>
              <h1>Company Details - {company.name}</h1>
              <div className="container-fluid row d-flex">
                <div className="row mb-3">
                  <div className="col mb-12">
                    <span>Company Name:</span>&nbsp;&nbsp;
                    <span>{company.name}</span>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col mb-12">
                    <span>Company Address:</span>&nbsp;&nbsp;
                    <span>{company.company_address}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col mb-12">
                    <span>State:</span>&nbsp;&nbsp;
                    <span>{company.state}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col mb-12">
                    <span>Country:</span>&nbsp;&nbsp;
                    <span>{company.country}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col mb-12">
                    <span>Latitude:</span>&nbsp;&nbsp;
                    <span>{company.latitude}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col mb-12">
                    <span>Longitude:</span>&nbsp;&nbsp;
                    <span>{company.longitude}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <CreateUser id={id} />
      </div>
    </>
  );
};
