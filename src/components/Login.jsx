import React, { useState } from "react";
import { authenticate } from "../utils";

const Login = ({ setAuth }) => {
  const [userData, setuserData] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login user Daat >>> ", userData);
    authenticate('login',userData)
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-200/50">
      <form
        className="rounded-lg shadow bg-white p-10 max-w-2xl w-full flex flex-col gap-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-semibold">
          Login In Your Account
        </h1>
        <div className="flex flex-col gap-5">
          <div className="form_group">
            <label htmlFor="username" className="pb-1">Username</label>
            <input
              type="text"
              className="w-full py-2 ps-3 text-base border rounded-lg focus:ring-0 focus:outline-none"
              placeholder="Enter Username"
              value={userData.username}
              name="username"
              onChange={(e) =>
                setuserData({ ...userData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form_group">
            <label htmlFor="password" className="pb-1">password</label>
            <input
              type="text"
              className="w-full py-2 ps-3 text-base border rounded-lg focus:ring-0 focus:outline-none"
              placeholder="Enter password"
              value={userData.password}
              name="password"
              onChange={(e) =>
                setuserData({ ...userData, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <button className="w-full rounded bg-red-500 text-white py-2 text-lg">
            Login
          </button>
          <h2 className="text-base text-gray-500">
            You Have No Account ?{" "}
            <span
              className="text-lg text-blue-600 cursor-pointer"
              onClick={() => setAuth("SIGNUP")}
            >
              Register Now
            </span>{" "}
          </h2>
        </div>
      </form>
    </div>
  );
};

export default Login;
