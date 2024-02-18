import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [Auth, setAuth] = useState("LOGIN");
  if (Auth === "SIGNUP") {
    return <Signup setAuth={setAuth}/>;
  } else {
    return <Login setAuth={setAuth}/>;
  }
};

export default Auth;
