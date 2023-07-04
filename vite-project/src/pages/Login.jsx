import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { userSchema } from "/Users/ztlab123/Desktop/Rent-Website/vite-project/src/validations/UserValidation.JSX";

const Login = () => {
  const createValidaton = async (event) => {
    event.preventDefault();
    let formData = {
      username: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
    };
    const isValid = await userSchema.isValid(formData);
    console.log(isValid);
  };

  const auth = getAuth(app);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = async () => {
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
    <form onSubmit={createValidaton}>
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
    </form>
  );
};

export default Login;
