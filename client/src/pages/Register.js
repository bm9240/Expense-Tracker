import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form submitted"); // Debugging statement
    const values = { name, email, password }; // Gather form values
    console.log("Values: ", values); // Debugging statement

    try {
      const response = await axios.post('/users/register', values); // Send data to backend
      console.log("Response: ", response); // Debugging statement
      alert("Registration Successful");
      navigate('/login'); // Navigate to login page after successful registration
    } catch (error) {
      console.error("Error: ", error); // Debugging statement
      alert("Invalid credentials or an error occurred");
    }
  };

  return (
    <div className="registerPage">
      <center>
        <h1>REGISTER</h1>
        <form>
          <label>Name: </label>
          <br />
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            <Link to="/login">Already registered? Click here to login</Link>
            <br />
            <br />
            <button onClick = {handleSubmit} className="btn" type="submit">
              Register
            </button>
          </p>
        </form>
      </center>
    </div>
  );
};

export default Register;
