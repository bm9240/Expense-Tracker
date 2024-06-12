import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("Form submitted"); 
    const values = { email, password }; 
    console.log("Values: ", values); 
    try {
      const response = await axios.post('/users/login', values);
      const { token } = response.data;
      console.log("Response: ", response); 
      alert("Login Successful");
      localStorage.setItem('token', token);
      navigate('/'); // Navigate to home page after successful login
    } catch (error) {
      console.error("Error: ", error); 
      alert("Invalid credentials or an error occurred");
    }
  };

  return (
    <div className="loginPage">
      <center>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <p>
            <label>Email: </label>
            <br />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
          <p>
            <label>Password: </label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <br />
          <p>
            <Link to="/register">Not a User, click here to register</Link>
            <br />
            <br />
            <button className="btn" type="submit">
              LOGIN
            </button>
          </p>
        </form>
      </center>
    </div>
  );
};

export default Login;
