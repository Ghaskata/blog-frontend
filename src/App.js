import React, { useState } from "react";
import Router from "./Router";
import Auth from "./components/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const App = () => {
  const { accessToken } = useSelector((state) => state.user.data);

  return (
    <div>
      <ToastContainer
        autoClose={2500}
        position="top-right"
        closeButton={false}
      />
      {accessToken ? <Router /> : <Auth />}
    </div>
  );
};

export default App;
