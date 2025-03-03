import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert} from "react-bootstrap";
import axios from "axios";

const AuthModal = ({show, handleClose, isSignup: initialSignup}) => {
  const [isSignup, setIsSignup] = useState(initialSignup);
  const [formData, setFormData] = useState({email: "", password: ""});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setIsSignup(initialSignup);
    setFormData({email: "", password: ""});
    setError("");
    setSuccess("")
  }, [show, initialSignup]);

  //handle input change
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const apiUrl = isSignup
      ? `${process.env.REACT_APP_API_URL}/users/register`
      : `${process.env.REACT_APP_API_URL}/users/login`;

    try{
      const response = await axios.post(apiUrl, formData);

      if(isSignup){
        setSuccess("Signup successful! Please login.");
      }
      else{
        if(response.data.token){
          // Save token to local storage (if applicable)
          localStorage.setItem("token", response.data.token);
          setSuccess("Login successful!");
          setTimeout(handleClose, 2000);
        }
      }
    }
    catch(err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isSignup ? "Sign Up" : "Login"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control id="email"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="on"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="pwd">Password</Form.Label>
            <Form.Control id="pwd"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="on"
            />
          </Form.Group>

          <Button type="submit" className="w-100 mb-3 ">
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </Form>

        <p>
          {isSignup ? "Already have an account?" : "New to MealMatrix?"}{" "}
          <span onClick={() => {setIsSignup(!isSignup); setFormData({email: "", password: ""}); setError(""); setSuccess("")}} className="text-primary" style={{cursor: "pointer"}}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};


export default AuthModal;