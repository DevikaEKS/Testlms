import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Banner.css";

function Banner() {
  const [certificateId, setCertificateId] = useState();
  const [categories, setCategories] = useState([]);
  const { id } = useParams(); // Get user ID from URL params
  const navigate = useNavigate(); // To handle page navigation

  // Fetch certificate ID when the component mounts
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/user/data/${id}`)
      .then((res) => {
        setCertificateId(res.data.user.certificate_id);
      })
      .catch((error) => {
        console.error("Error fetching certificate ID:", error);
      });
  }, [id]);

  // Fetch categories based on certificate ID
  useEffect(() => {
    if (certificateId) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}category/subcategories/${certificateId}`
        )
        .then((res) => {
          setCategories(res.data.categories); // Set the categories data
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [certificateId]);

  // Function to handle the enroll button click
  const handleEnroll = (categoryId) => {
    navigate(`/exams/${id}/${categoryId}`); // Navigate to the test page with category ID
  };

  return (
    <div className="bannerpage">
      <div className="container m-0" id="sapbanner">
        <div className="row py-5 ">
          {categories.map((category) => (
            <div
              className="col-sm-12 col-md-3 mb-4"
              key={category.course_category_id}
            >
              <div
                className="exampartmain d-flex justify-content-center align-items-center bg-light"
                onClick={() => handleEnroll(category.course_category_id)}
              >
                <div className="exampart1 d-flex justify-content-center align-items-center bg-light">
                  {/* Display the category image */}
                  <img
                    src={category.image}
                    alt={category.course_category_name}
                    // className="img-fluid"
                    // style={{height:"40px",width:"50px"}}
                    
                  />
                </div>
              </div>
              {/* Display the category name */}
              <p className="text-center py-2 examnames">
                {category.course_category_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
