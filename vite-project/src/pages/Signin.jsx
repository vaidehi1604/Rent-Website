import React, { useState } from "react";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log(value);
        navigate("/admin");
        toast.success("Successfully Sign In!");
      })
      .catch((err) => {
        const errorCode = err.code;
        console.log(err);
        toast.error("Invalid Data!");
      });
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign In</h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />

          <button
            onClick={createUser}
            type="submit"
            className="w-full text-center py-3 rounded bg-cyan-700 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            LOGIN
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Create account?
          <Link className="text-cyan-700" to="/">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
