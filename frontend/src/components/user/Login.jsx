import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [active, setActive] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const toggleForm = () => {
    setActive(!active);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/login",
        loginData
      );
      if (response.status === 200) {
        Cookies.set("token", response.data.token, { expires: 7 });
        Cookies.set("role", response.data.role, { expires: 7 });
        Cookies.set("name", response.data.name, { expires: 7 });
        Cookies.set("email", response.data.email, { expires: 7 });
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/product");
        }, 2000); // Delay navigation by 2 seconds
      }
    } catch (error) {
      toast.error("Login failed: " + error.response.data.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/register",
        signupData
      );
      if (response.status === 201) {
        Cookies.set("token", response.data.token, { expires: 7 });
        Cookies.set("role", response.data.role, { expires: 7 });
        Cookies.set("name", response.data.name, { expires: 7 });
        Cookies.set("email", response.data.email, { expires: 7 });
        toast.success("Signup successful!");
        setTimeout(() => {
          navigate("/product");
        }, 2000); // Delay navigation by 2 seconds
      }
    } catch (error) {
      toast.error("Signup failed: " + error.response.data.message);
    }
  };

  return (
    <section>
      <ToastContainer />
      <div className={`container ${active ? "active" : ""}`}>
        <div className="user signinBx">
          <div className="imgBx">
            <img
              src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
              alt=""
            />
          </div>
          <div className="formBx">
            <form onSubmit={handleLoginSubmit}>
              <h2>Sign In</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
              <input type="submit" value="Login" />
              <p className="signup">
                Don't have an account ?
                <a href="#" onClick={toggleForm}>
                  Sign Up.
                </a>
              </p>
            </form>
          </div>
        </div>
        <div className="user signupBx">
          <div className="formBx">
            <form onSubmit={handleSignupSubmit}>
              <h2>Create an account</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={signupData.name}
                onChange={handleSignupChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
              />
              <input type="submit" value="Sign Up" />
              <p className="signup">
                Already have an account ?
                <a href="#" onClick={toggleForm}>
                  Sign in.
                </a>
              </p>
            </form>
          </div>
          <div className="imgBx">
            <img
              src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
