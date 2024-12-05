// import React, { useState } from "react";
// import { Navbar, Nav, Container ,Dropdown} from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
// import { Link, NavLink, useParams } from "react-router-dom";
// // import loginimg from "../../../Asset/profile1.png";
// import Mainlogo from "../../Landingpage/Asset/GL.png";
// import "./Competitivenavbar.css";

// function Competitivenavbar() {
//   const [showSearch, setShowSearch] = useState(false);

//   const { id } = useParams();

//   const toggleSearch = () => {
//     setShowSearch((prev) => !prev);
//   };

//   return (
//     <Navbar expand="lg" className="navbarcontenttext py-4">
//       <Container>
    
//         <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
//           <img src={Mainlogo} alt="Main Logo" className="logoken" height={"120px"} width={"100px"} />
//           {/* <Link className="text-light text-decoration-none">CLMS</Link> */}
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           {/* Mobile View */}
//           <Nav className="d-lg-none mx-auto">
//             <Nav.Link
//               as={NavLink}
//               to={`/banner/${id}`}
//               className="navpart px-3"
//               activeClassName="active-link"
//             >
//               Home
//             </Nav.Link>
//             <Nav.Link
//               as={NavLink}
//               to={`/mytest/${id}`}
//               className="navpart px-3"
//               activeClassName="active-link"
//             >
//               My Test
//             </Nav.Link>
//             <Nav.Link
//               as={NavLink}
//               to={`/enrolled/${id}`}
//               className="navpart px-3"
//               activeClassName="active-link"
//             >
//               Enrolled
//             </Nav.Link>
            

//             <Dropdown>
//                 <Dropdown.Toggle variant="link" className="navpart px-3 text-light">
//                   Government Exams
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   <Dropdown.Item href="#">SSC</Dropdown.Item>
//                   <Dropdown.Item href="#">UPSC</Dropdown.Item>
//                   <Dropdown.Item href="#">Railways</Dropdown.Item>
//                   <Dropdown.Item href="#">Banking</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>








           
//             <Nav.Link
//               as={NavLink}
//               to=""
//               className="navpart px-3"
//               activeClassName="active-link"
//             >
//               Notification
//             </Nav.Link>
//             <Nav.Link
//               as={NavLink}
//               to=""
//               className="navpart px-3"
//               activeClassName="active-link"
//             >
//               Profile
//             </Nav.Link>
//             {showSearch && (
//               <div className="search-bar d-flex align-items-center px-3 mt-2 bg-light rounded">
//                 <FontAwesomeIcon icon={faSearch} className="search-icon me-2" />
//                 <input
//                   type="search"
//                   placeholder="Search"
//                   className="border-0 searchinput bg-light"
//                 />
//               </div>
//             )}
//             <Nav.Link
//               as={NavLink}
//               to="/login"
//               className="navpart px-3"
//               activeClassName="active-link"
//             >
//               Logout
//             </Nav.Link>
//           </Nav>

//           {/* Desktop View */}
//           <Nav className="w-100 d-none d-lg-flex align-items-center justify-content-between">
//             <div className="d-flex flex-grow-1 justify-content-center">
//               <NavLink
//                 to={`/banner/${id}`}
//                 className="navpart px-3"
//                 activeClassName="active-link"
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to={`/mytest/${id}`}
//                 className="navpart px-3"
//                 activeClassName="active-link"
//               >
//                 My Test
//               </NavLink>
//               <NavLink
//                 to={`/enrolled/${id}`}
//                 className="navpart px-3"
//                 activeClassName="active-link"
//               >
//                 Enrolled
//               </NavLink>
//               <Dropdown>
//                 <Dropdown.Toggle variant="link" className="navpart1 px-3 text-light fw-bold">
//                   Government Exams
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   <Dropdown.Item href="#">SSC</Dropdown.Item>
//                   <Dropdown.Item href="#">UPSC</Dropdown.Item>
//                   <Dropdown.Item href="#">TNPSC</Dropdown.Item>
//                   <Dropdown.Item href="#">Railways</Dropdown.Item>
//                   <Dropdown.Item href="#">Banking</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </div>
//             {showSearch && (
//               <div className="search-bar d-flex align-items-center p-2 bg-light rounded">
//                 <FontAwesomeIcon icon={faSearch} className="search-icon me-2" />
//                 <input
//                   type="search"
//                   placeholder="Search"
//                   className="border-0 searchinput bg-light"
//                 />
//               </div>
//             )}
//             <Nav.Link onClick={toggleSearch} className="ms-3">
//               <FontAwesomeIcon icon={faSearch} />
//             </Nav.Link>
//             <Nav.Link as={NavLink} to="/notifications" className="ms-3">
//               <FontAwesomeIcon icon={faBell} />
//             </Nav.Link>
//             <Nav.Link as={NavLink} to="/" className="ms-3">
//               <FontAwesomeIcon icon={faUser} />
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Competitivenavbar;




import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useParams } from "react-router-dom";
import Mainlogo from "../../Landingpage/Asset/GL.png";
import "./Competitivenavbar.css";
import axios from "axios";
function Competitivenavbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);
  const { id } = useParams();

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  useEffect(() => {
    // Fetch certificate ID and set dropdown items based on certificate ID
    const fetchCertificateId = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}user/user/data/${id}`
        );
        const certificateId = response.data.user.certificate_id;
        const crname=response.data.user.name
   
        if (certificateId === 1) {
        
          setDropdownItems(["AWS", "Azure", "Google"]);
        } else if (certificateId === 2) {
         
          setDropdownItems(["Railways", "SSC","Banking","UPSC"]);
        }
      } catch (error) {
        console.error("Error fetching certificate ID:", error);
      }
    };

    fetchCertificateId();
  }, [id]);

  return (
    <Navbar expand="lg" className="navbarcontenttext py-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img
            src={Mainlogo}
            alt="Main Logo"
            className="logoken"
           
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Mobile View */}
          <Nav className="d-lg-none mx-auto">
            <Nav.Link
              as={NavLink}
              to={`/banner/${id}`}
              className="navpart px-3"
              activeClassName="active-link"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={`/mytest/${id}`}
              className="navpart px-3"
              activeClassName="active-link"
            >
             Exams
            </Nav.Link>
            {/* <Nav.Link
              as={NavLink}
              to={`/enrolled/${id}`}
              className="navpart px-3"
              activeClassName="active-link"
            >
              Enrolled
            </Nav.Link> */}

            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                className="navpart px-3 text-light"
              >
                  {id === "1" ? "Government Exams" : "Global Certifications"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {dropdownItems.map((item, index) => (
                  <Dropdown.Item key={index} href="#">
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link
              as={NavLink}
              to=""
              className="navpart px-3"
              activeClassName="active-link"
            >
              Notification
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to=""
              className="navpart px-3"
              activeClassName="active-link"
            >
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
              Login
            </Nav.Link>
          </Nav>

          {/* Desktop View */}
          <Nav className="w-100 d-none d-lg-flex align-items-center justify-content-between">
            <div className="d-flex flex-grow-1 justify-content-center">
              <NavLink
                to={`/banner/${id}`}
                className="navpart px-3"
                activeClassName="active-link"
              >
                Home
              </NavLink>
              <NavLink
                to={`/mytest/${id}`}
                className="navpart px-3"
                activeClassName="active-link"
              >
              Exams

              </NavLink>
              {/* <NavLink
                to={`/enrolled/${id}`}
                className="navpart px-3"
                activeClassName="active-link"
              >
                Enrolled
              </NavLink> */}
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  className="navpart1 px-3 text-light fw-bold"
                >
                  {id === "1" ? "Government Exams" : "Global Certifications"}
                 
               
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {dropdownItems.map((item, index) => (
                    <Dropdown.Item key={index} href="#">
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
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
            <Nav.Link as={NavLink} to="/" className="ms-3">
              
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Competitivenavbar;
