import React, { useEffect, useState } from "react";
import { Modal, Button, Form} from "react-bootstrap";

const AuthModal = ({show, handleClose, isSignup: initialSignup}) => {
  const [isSignup, setIsSignup] = useState(initialSignup);
  const [formData, setFormData] = useState({email: "", password: ""});

  useEffect(() => {
    setIsSignup(initialSignup);
  }, [initialSignup]);

  //handle input change
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignup ? "Signup Data:"  : "Login Data", formData);
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isSignup ? "Sign Up" : "Login"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100 mb-3">
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </Form>

        <p>
          {isSignup ? "Already have an account?" : "New to MealMatrix?"}{" "}
          <span onClick={() => setIsSignup(!isSignup)} className="text-primary" style={{cursor: "pointer"}}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};


export default AuthModal;