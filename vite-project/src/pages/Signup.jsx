import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

const initialValues = {
  username: "",
  email: "",
  password: "",
};
const Signup = () => {
  const { values, errors, handleBlur, handleChange, handle } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log(value);
        toast.success("Successfully Created Account!");
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Account not created!");
      });
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-5 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            id="username"
            placeholder="username"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            id="email"
            placeholder="Email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />

          <button
            onClick={createUser}
            type="submit"
            className="w-full text-center py-3 rounded bg-cyan-700 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link className="text-cyan-700" to="/signin">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
