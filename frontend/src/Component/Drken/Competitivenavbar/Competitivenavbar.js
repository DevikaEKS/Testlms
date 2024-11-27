import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
// import loginimg from "../../../Asset/profile1.png";
import Mainlogo from "../../Landingpage/Asset/mainlogo.png";
import "./Competitivenavbar.css";
function Competitivenavbar() {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <Navbar expand="lg" className="navbarcontenttext py-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img src={Mainlogo} alt="Main Logo" className="logoken" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Mobile View */}
          <Nav className="d-lg-none mx-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              className="navpart px-3 py-2"
              activeClassName="active-link"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/my-test"
              className="navpart px-3 py-2"
              activeClassName="active-link"
            >
              My Test
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/enrolled"
              className="navpart px-3 py-2"
              activeClassName="active-link"
            >
              Enrolled
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to=""
              className="navpart px-3"
              activeClassName="active-link">
              Notification
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to=""
              className="navpart px-3"
              activeClassName="active-link" >
              Profile
            </Nav.Link>
            {showSearch && (
              <div className="search-bar d-flex align-items-center px-3 mt-2 bg-light rounded">
                <FontAwesomeIcon icon={faSearch} className="search-icon me-2" />
                <input
                  type="search"
                  placeholder="Search"
                  className="border-0 searchinput bg-light"
                />
              </div>
            )}
            <Nav.Link
              as={NavLink}
              to="/login"
              className="navpart px-3"
              activeClassName="active-link"
            >
              Logout
            </Nav.Link>
          </Nav>

          {/* Desktop View */}
          <Nav className="w-100 d-none d-lg-flex align-items-center justify-content-between">
            <div className="d-flex flex-grow-1 justify-content-center">
              <NavLink
                to="/"
                className="navpart px-3"
                activeClassName="active-link"
              >
                Home
              </NavLink>
              <NavLink
                to="/mytest"
                className="navpart px-3"
                activeClassName="active-link"
              >
                My Test
              </NavLink>
              <NavLink
                to="/enrolled"
                className="navpart px-3"
                activeClassName="active-link"
              >
                Enrolled
              </NavLink>
            </div>
            {showSearch && (
              <div className="search-bar d-flex align-items-center p-2 bg-light rounded">
                <FontAwesomeIcon icon={faSearch} className="search-icon me-2" />
                <input
                  type="search"
                  placeholder="Search"
                  className="border-0 searchinput bg-light"
                />
              </div>
            )}
            <Nav.Link onClick={toggleSearch} className="ms-3">
              <FontAwesomeIcon icon={faSearch} />
            </Nav.Link>
            <Nav.Link as={NavLink} to="/notifications" className="ms-3">
              <FontAwesomeIcon icon={faBell} />
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile" className="ms-3">
              <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Competitivenavbar;
