import React, { useState } from "react";
import { toast } from "react-toastify";
import { authenticate } from "../utils";

const Signup = ({ setAuth }) => {
  const [userData, setuserData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    avatar: "",
    coverImage: "",
  });
  const [conformPass, setconformPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== conformPass) {
      toast.error("Password is not same");
    } else {
      console.log("register user Daat >>> ", userData);
      authenticate("register", userData);
    }
  };
  const handleAvatar = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.files[0] });
  };
  const handleCoverImage = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.files[0] });
  };

  return (
    <div className="w-screen h-screen p-10 flex justify-center items-center bg-slate-200/50">
      <form
        className="rounded-lg shadow h-full w-full max-w-3xl bg-white p-10 flex flex-col justify-between gap-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-semibold">
          Create A New Account
        </h1>
        <div className="grid grid-cols-2 gap-5 ">
          <div className="form_group">
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
            <input
              type="text"
              className="w-full py-2 ps-3 text-base border rounded-lg focus:ring-0 focus:outline-none"
              placeholder="Enter email"
              value={userData.email}
              name="email"
              onChange={(e) =>
                setuserData({ ...userData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form_group col-span-2">
            <input
              type="text"
              className="w-full py-2 ps-3 text-base border rounded-lg focus:ring-0 focus:outline-none"
              placeholder="Enter fullname"
              value={userData.fullname}
              name="fullname"
              onChange={(e) =>
                setuserData({ ...userData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="form_group">
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
          <div className="form_group">
            <input
              type="text"
              className="w-full py-2 ps-3 text-base border rounded-lg focus:ring-0 focus:outline-none"
              placeholder="Enter conform Password"
              value={conformPass}
              name="conform Password"
              onChange={(e) => setconformPass(e.target.value)}
            />
          </div>
          <div className="form_group">
            <label htmlFor="" className="mb-1">
              Avatar
            </label>
            <input
              type="file"
              className="w-full"
              placeholder="select avatar"
              name="avatar"
              onChange={handleAvatar}
            />
          </div>
          <div className="form_group">
            <label htmlFor="" className="mb-1">
              Cover Image
            </label>
            <input
              type="file"
              className="w-full"
              placeholder="select coverImage"
              name="coverImage"
              onChange={handleCoverImage}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="w-full rounded bg-red-500 text-white py-2 text-lg">
            Register now
          </button>
          <h2 className="text-base text-gray-500 text-center">
            You Have Already created Account ?{" "}
            <span
              className="text-lg text-blue-600 cursor-pointer"
              onClick={() => setAuth("LOGIN")}
            >
              Login Now
            </span>{" "}
          </h2>
        </div>
      </form>
    </div>
  );
};

export default Signup;
