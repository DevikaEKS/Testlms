import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Modal state
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const emailPattern =
    /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateInput = () => {
    let valid = true;

    if (!username) {
      setUsernameError("Username is required");
      valid = false;
    } else if (!emailPattern.test(username)) {
      setUsernameError("Invalid email format");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    const loginData = { email: username, password };

    try {
      setIsLoading(true); // Start loading
      await axios
        .post(`${process.env.REACT_APP_API_URL}auth/login`, loginData, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res.data);

          if (res.data.message === "Invalid email or password") {
            toast.error("Invalid Email or password");
          } else if (res.data.message === "login success") {
            const { user, token } = res.data;
            const { role_id, user_id, company_id, email, certificate_id } = user;
            console.log(user);
            if (role_id === 4) {
              if(certificate_id == 2){
              navigate(`/banner/${user_id}`);
              }
              else if(certificate_id == 1){
                navigate(`/banner/${user_id}`);
              }
            } else if (role_id === 5) {
              navigate(`/admindashboard/${company_id}/dashboard`);
            } else if (role_id === 2) {
              navigate(`/instructordashboard/${user_id}/courselist`);
            } else if (email === "admin@gmail.com") {
              navigate(`/superadmin/${user_id}/dashboard`);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowRegisterModal(false); // Close the modal
  };

  const handleIndividualLogin = () => {
    navigate("/register");
  };

  const handleBusinessLogin = () => {
    navigate("/business_register");
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 loginbg">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="LoginApp card">
          <ToastContainer />
          <div className="px-4">
            <div className="login-form">
              <h1 className="text-center">Sign In</h1>
              {/* <p className="logpara text-center">How can we help you today?</p> */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username" className="text-start">
                    Email
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`${usernameError ? "error-input" : ""}`}
                  />
                  {usernameError && (
                    <div className="error-text text-start">{usernameError}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="text-start">
                    Password
                  </label>
                  <div style={{ position: "relative", width: "100%" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`form-control ${
                        passwordError ? "error-input" : ""
                      }`}
                      style={{
                        paddingRight: "40px", // To make space for the eye icon
                      }}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#555",
                      }}
                    >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                  </div>
                  {passwordError && (
                    <div className="error-text text-start">{passwordError}</div>
                  )}
                  <div className="d-flex justify-content-between mt-1">
                    <a href="/forgot_password" className="forget-password-link">
                      Forget Password?
                    </a>
                  </div>
                </div>
                <div className="form-group button-container">
                  <button
                    type="submit"
                    className="rounded-3 subbtn1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Sign In"}
                  </button>
                </div>
                <p className="text-center">
                  Don't have an account?{" "}
                  <span
                    className="register-link fw-bold text-danger"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Register Selection */}
      <Modal show={showRegisterModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Account Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please select the type of account you want to create:</p>
          <div className="d-flex justify-content-around">
            <Button variant="primary" onClick={handleIndividualLogin}>
              Individual
            </Button>
            <Button variant="danger" onClick={handleBusinessLogin}>
              Business
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
