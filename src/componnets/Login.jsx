import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [emailId, setEmailId] = useState("nayana@gmail.com");
  const [password, setPassword] = useState("Nayana@123");
  const dispatch = useDispatch();
  const [Error, setError] =useState("")
  const navigate =useNavigate();



  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL+ "/login", {
        emailId,
        password,
      }, {withCredentials:true});
      console.log(res.data);
      dispatch(addUser(res.data),
      navigate("/"))
    } catch (err) {
      setError(err?.response?.data)
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body ">
          <h2 className="card-title">Login to your account</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                placeholder="email"
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
          <p className="text-red-500">{`${Error}`}</p>
            <button className="btn btn-primary" onClick= {handleLogin}
            >Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
