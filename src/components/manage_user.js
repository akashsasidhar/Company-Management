import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCompanyDetail,
  getCompanyListForMigrate,
  getUserDetail,
  userMigrate,
} from "../action/company";

export const ManageUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [options, setOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [company, setCompany] = useState(null);

  const customCentered = {
    backgroundColor: "#ffffff",
    padding: "1%",
    alignItems: "center",
    margin: "0 auto",
    maxWidth: "100%",
  };
  const fetchData = async (id) => {
    const res = await getUserDetail(id);
    setUser(res);
    await fetchCompanyList(res.company_id);
  };
  const fetchCompanyList = async (companyId) => {
    const response1 = await getCompanyDetail(companyId);
    setCompany(response1);
    const res = await getCompanyListForMigrate(companyId);

    setOptions(res);
  };
  useEffect(() => {
    fetchData(id);
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      companyId: selectedOption,
      userId: id,
    };

    await userMigrate(data);
    await fetchData(id);
  };
  return (
    <div className="container-fluid">
      <div className=" row d-flex " style={customCentered}>
        {user && (
          <>
            <h1>User Details </h1>
            <h3>Company Name- {company && company.name}</h3>
            <div className="container-fluid row d-flex">
              <div className="row mb-3">
                <div className="col mb-12">
                  <span>First Name:</span>&nbsp;&nbsp;
                  <span>{user.first_name}</span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col mb-12">
                  <span>Last Name:</span>&nbsp;&nbsp;
                  <span>{user.last_name}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col mb-12">
                  <span>Email:</span>&nbsp;&nbsp;
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col mb-12">
                  <span>Designation:</span>&nbsp;&nbsp;
                  <span>{user.designation}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col mb-12">
                  <span>Date of Birth:</span>&nbsp;&nbsp;
                  <span>{user.date_of_birth}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="container">
        <h2>Migrate User</h2>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <div className="row mb-2">
              <div className="col mb-1">
                <select
                  value={selectedOption}
                  className="form-select form-select-sm mb-3"
                  onChange={handleChange}
                >
                  <option key="0" value="0">
                    Select the company to migrate
                  </option>
                  {options &&
                    options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="form-group g-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
