import axios from "axios";

export const getCompanyList = async () => {
  const result = await axios.get("http://localhost:5000/api/company/list");
  return result.data.data;
};
export const getUserList = async (id) => {
  const result = await axios.get(`http://localhost:5000/api/user/list/${id}`);
  return result.data.data;
};
export const getCompanyDetail = async (id) => {
  const result = await axios.get(
    `http://localhost:5000/api/company/search/${id}`
  );
  console.log(result);
  return result.data.data;
};
export const getUserDetailByCompany = async (id) => {
  const result = await axios.get(`http://localhost:5000/api/user/list/${id}`);
  console.log(result);

  return result.data.data;
};
export const createCompany = async (data) => {
  const result = await axios.post(
    "http://localhost:5000/api/company/create",
    data
  );
  console.log(result);
  return result.data;
};
export const createUser = async (data) => {
  const result = await axios.post(
    "http://localhost:5000/api/user/create",
    data
  );
  console.log(result);
  return result.data;
};

export const getUserDetail = async (id) => {
  const result = await axios.get(`http://localhost:5000/api/user/search/${id}`);
  console.log(result);
  return result.data.data;
};
export const getCompanyListForMigrate = async (id) => {
  const result = await axios.get(
    `http://localhost:5000/api/company/selectList/${id}`
  );
  console.log(result);
  return result.data.data;
};

export const userMigrate = async (data) => {
  const result = await axios.put(
    `http://localhost:5000/api/user/migrateUser`,
    data
  );
  console.log(result);
  return result.data.data;
};

export const deleteCompany = async (id) => {
  console.log(id, "deleteCompany");
  const result = await axios.post(
    `http://localhost:5000/api/company/deleteCompany`,
    id
  );
  console.log(result);
  return result.data;
};
