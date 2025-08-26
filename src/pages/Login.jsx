import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Login = () => {
  const { theme } = useContext(ThemeContext);

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form Values:", value);
    // Handle login logic here
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className={`card bg-${theme} text-${
          theme === "dark" ? "light" : "dark"
        } p-4 shadow`}
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              value={value.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={value.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
