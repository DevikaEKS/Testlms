import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Testcreation() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [submodules, setSubmodules] = useState([]);
  const [courseid, setCourseId] = useState(0);
  const [moduleid, setModuleId] = useState(0);
  const [submoduleid, setSubmoduleid] = useState(0);
  const [addedSubmodules, setAddedSubmodules] = useState([]);
  const [questionCounts, setQuestionCounts] = useState({});
  const [testName, setTestName] = useState(""); // New state for test name
  const [totalQuestions, setTotalQuestions] = useState(""); // New state for total questions
  const [image, setImage] = useState(null);
  const [testTiming, setTestTiming] = useState(""); // New state for test timing
  const [negativeMarks, setNegativeMarks] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(""); // For difficulty level
  const [easyPassMark, setEasyPassMark] = useState("");
  const [mediumPassMark, setMediumPassMark] = useState("");
  const [hardPassMark, setHardPassMark] = useState("");

  // Fetch courses on mount
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getcourse`)
      .then((res) => setCourses(res.data.result))
      .catch((error) => {
        toast.error("Failed to fetch courses!");
        console.error(error);
      });
  }, []);

  // Fetch modules when courseid changes
  useEffect(() => {
    if (courseid !== 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}course/getmodules/${courseid}`)
        .then((res) => setModules(res.data))
        .catch((error) => {
          toast.error("Failed to fetch modules!");
          console.error(error);
        });
    } else {
      setModules([]);
    }
  }, [courseid]);

  // Fetch submodules when moduleid changes
  useEffect(() => {
    if (moduleid !== 0) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}course/submodules/${courseid}/${moduleid}`
        )
        .then((res) => {
          setSubmodules(res.data.results);
        })
        .catch((error) => {
          toast.error("Failed to fetch submodules!");
          console.error(error);
        });
    } else {
      setSubmodules([]);
    }
  }, [moduleid, courseid]);

  // Handle course selection
  const handleCourseChange = (event) => {
    setCourseId(parseInt(event.target.value, 10)); // Convert to number
    setModuleId(0); // Reset module selection
    setSubmoduleid(0); // Reset submodule selection
    setModules([]);
    setSubmodules([]);
  };

  // Handle module selection
  const handleModuleSelect = (event) => {
    setModuleId(parseInt(event.target.value, 10)); // Convert to number
    setSubmoduleid(0); // Reset submodule selection
    setSubmodules([]);
  };

  // Handle submodule selection
  const handleSubmoduleSelect = (event) => {
    setSubmoduleid(parseInt(event.target.value, 10)); // Convert to number
  };

  // Add selected submodule
  const addPart = () => {
    if (submoduleid !== 0) {
      const submoduleToAdd = submodules.find(
        (submodule) => submodule.submodule_id === submoduleid
      );

      if (submoduleToAdd) {
        setAddedSubmodules((prev) => {
          if (
            !prev.some(
              (sub) => sub.submodule_id === submoduleToAdd.submodule_id
            )
          ) {
            return [...prev, submoduleToAdd];
          }
          return prev;
        });
      } else {
        toast.error("Submodule not found!");
      }
    } else {
      toast.error("No submodule selected!");
    }
  };

  useEffect(() => {
    const initialCounts = addedSubmodules.reduce((acc, submodule) => {
      acc[submodule.submodule_id] = submodule.question_count; // Default to 1
      return acc;
    }, {});
    setQuestionCounts(initialCounts);
  }, [addedSubmodules]);

  // Handle input changes for question count
  const updateQuestionCount = (submoduleId, value) => {
    // Find the selected submodule to get its question_count (max questions)
    const selectedSubmodule = addedSubmodules.find(
      (submodule) => submodule.submodule_id === submoduleId
    );

    if (selectedSubmodule) {
      const maxQuestions = selectedSubmodule.question_count; // Fetch question_count as max limit

      // Check if the entered value exceeds the predefined limit
      if (value > maxQuestions) {
        toast.error(
          `You can only select up to ${maxQuestions} questions for "${selectedSubmodule.submodulename}".`
        );
        return; // Prevent further processing
      }
    }

    // Update the question count if within limits
    setQuestionCounts((prev) => ({
      ...prev,
      [submoduleId]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDifficultyChange = (e) => {
    setDifficultyLevel(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalSelectedQuestions = Object.values(questionCounts).reduce(
      (acc, count) => acc + (parseInt(count, 10) || 0),
      0
    );

    if (parseInt(totalQuestions, 10) !== totalSelectedQuestions) {
      toast.error(
        "Total questions must match the sum of submodule question counts."
      );
      return;
    }

    const dataToSubmit = {
      test_name: testName,
      total_questions: totalQuestions,
      test_timing: testTiming,
      negative_marks: negativeMarks,
      submodules: addedSubmodules.map((submodule) => ({
        submodule_id: submodule.submodule_id,
        question_count: questionCounts[submodule.submodule_id],
      })),
      image,
      difficulty_level: difficultyLevel,
      courseid: courseid,
      easyPassMark: easyPassMark,
      mediumPassMark: mediumPassMark,
      hardPassMark: hardPassMark,
    };

    const formData = new FormData();
    formData.append("test_name", dataToSubmit.test_name);
    formData.append("total_questions", dataToSubmit.total_questions);
    formData.append("test_timing", dataToSubmit.test_timing);
    formData.append("negative_marks", dataToSubmit.negative_marks);
    formData.append("image", dataToSubmit.image);
    formData.append("difficulty_level", dataToSubmit.difficulty_level);
    formData.append("pass_marks", dataToSubmit.pass_marks); // Send as stringified JSON
    formData.append("submodules", JSON.stringify(dataToSubmit.submodules));
    formData.append("courseid", dataToSubmit.courseid);
    formData.append("easypassmark", dataToSubmit.easyPassMark);
    formData.append("mediumpassmark", dataToSubmit.mediumPassMark);
    formData.append("hardpassmark", dataToSubmit.hardPassMark);

    console.log(formData);

    // Submit the form data
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}quiz/createtest`, formData)
    //   .then((res) => {
    //     if (res.data.message === "Test submitted successfully") {
    //       toast.success("Test submitted successfully!");
    //     } else if (res.data.message === "Failed to insert test data") {
    //       toast.error("Failed to insert test data");
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error("Failed to submit test!");
    //     console.error(error);
    //   });
  };

  return (
    <div className="container-fluid">
      <h3 className="text-center headinginstructor">Test Creation</h3>
      <div className="modpart p-3">
        <form>
          <div className="form-group">
            <div className="form-group-inner">
              <label>Test Name</label>
              <input
                type="text"
                className="fc1"
                placeholder="Enter your Test Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label>Total Number of Questions</label>
              <input
                type="number"
                className="fc1"
                placeholder="Enter the total number of Questions"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label>Test Timing (in minutes)</label>
              <input
                type="number"
                className="fc1"
                placeholder="Enter test duration"
                value={testTiming}
                onChange={(e) => setTestTiming(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label>Negative Marking</label>
              <select
                className="fc1 w-100"
                value={negativeMarks}
                onChange={(e) => setNegativeMarks(e.target.value === "true")}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label>Upload Image</label>
              <input
                type="file"
                className="fc1"
                onChange={handleFileUpload}
                accept="image/*"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label>Course Selection</label>
              <select
                className="fc1 w-100"
                onChange={handleCourseChange}
                value={courseid}
              >
                <option value={0}>Select the course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.courseid}>
                    {course.coursename}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label>Select Module</label>
              <select
                className="fc1 w-100 py-1"
                onChange={handleModuleSelect}
                value={moduleid || ""}
              >
                <option value="">Select the module</option>
                {modules.map((module) => (
                  <option key={module.moduleid} value={module.moduleid}>
                    {module.modulename}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner d-flex align-items-center">
              <label>Select Submodule</label>
              <select
                className="fc1 w-100 py-2"
                onChange={handleSubmoduleSelect}
                value={submoduleid || ""}
              >
                <option value="">Select the submodule</option>
                {submodules.map((submodule) => (
                  <option
                    key={submodule.submodule_id}
                    value={submodule.submodule_id}
                  >
                    {submodule.submodulename} (Questions:{" "}
                    {submodule.max_questions})
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="m-2 updatebtn rounded-5 px-3 py-2 text-light"
                onClick={addPart}
              >
                +
              </button>
            </div>
          </div>

          {addedSubmodules.length > 0 && (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Submodule Name</th>
                    <th>Question Count</th>
                  </tr>
                </thead>
                <tbody>
                  {addedSubmodules.map((submodule) => (
                    <tr key={submodule.submodule_id}>
                      <td>{submodule.submodulename}</td>
                      <td>
                        <input
                          type="number"
                          className="w-50"
                          value={questionCounts[submodule.submodule_id] || ""}
                          onChange={(e) =>
                            updateQuestionCount(
                              submodule.submodule_id,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="form-group">
            <label>Difficulty Level</label>
            <select
              className="fc1 w-100"
              value={difficultyLevel}
              onChange={handleDifficultyChange}
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {difficultyLevel === "easy" && (
            <div className="form-group">
              <label>Easy Pass Mark</label>
              <input
                type="number"
                className="fc1 w-100"
                placeholder="Enter Easy Pass Mark"
                value={easyPassMark}
                onChange={(e) => setEasyPassMark(e.target.value)}
              />
            </div>
          )}

          {difficultyLevel === "medium" && (
            <>
              <div className="form-group">
                <label>Easy Pass Mark</label>
                <input
                  type="number"
                  className="fc1 w-100"
                  placeholder="Enter Easy Pass Mark"
                  value={easyPassMark}
                  onChange={(e) => setEasyPassMark(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Medium Pass Mark</label>
                <input
                  type="number"
                  className="fc1 w-100"
                  placeholder="Enter Medium Pass Mark"
                  value={mediumPassMark}
                  onChange={(e) => setMediumPassMark(e.target.value)}
                />
              </div>
            </>
          )}

          {difficultyLevel === "hard" && (
            <>
              <div className="form-group">
                <label>Easy Pass Mark</label>
                <input
                  type="number"
                  className="fc1 w-100"
                  placeholder="Enter Easy Pass Mark"
                  value={easyPassMark}
                  onChange={(e) => setEasyPassMark(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Medium Pass Mark</label>
                <input
                  type="number"
                  className="fc1 w-100"
                  placeholder="Enter Medium Pass Mark"
                  value={mediumPassMark}
                  onChange={(e) => setMediumPassMark(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Hard Pass Mark</label>
                <input
                  type="number"
                  className="fc1 w-100"
                  placeholder="Enter Hard Pass Mark"
                  value={hardPassMark}
                  onChange={(e) => setHardPassMark(e.target.value)}
                />
              </div>
            </>
          )}

          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Testcreation;
