import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Product from "./components/Products";
import AdminDashboard from "./admin/AdminDashboard";
import Navbar from "./admin/Navbar";
import ShowProducts from "./user/ShowProducts";
import UserNavbar from "./user/UserNavbar";
import UserDashboard from "./user/UserDashboard";
import AddProducts from "./admin/AddProducts";
import AddUserProduct from "./user/AddUserProduct";
import EditProduct from "./admin/EditProduct";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* signin and signup */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Signup />} />

          {/* Admin Dashboard */}
          <Route element={<Navbar />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/addproduct" element={<AddProducts />} />
            <Route path="/editproduct" element={<EditProduct />} />
          </Route>
          <Route path="/product" element={<Product />} />
          {/* User Dashboard */}
          <Route path="/fetch" element={<ShowProducts />} />
          <Route path="/usernav" element={<UserNavbar />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/userproduct" element={<AddUserProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
