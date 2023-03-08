import "./App.css";
import { CreateCompany } from "./components/create_company";
import { Route, Routes } from "react-router-dom";
import { ManageCompany } from "./components/manage_company";
import { ManageUser } from "./components/manage_user";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CreateCompany />} />
        <Route path="/company/:id" element={<ManageCompany />} />
        <Route path="/user/:id" element={<ManageUser />} />
      </Routes>
    </div>
  );
}

export default App;
