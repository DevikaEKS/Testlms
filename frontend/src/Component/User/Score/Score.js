// import React from "react";
// import { useLocation } from "react-router-dom";

// function Score() {
//   const { state } = useLocation();
//   const { score, total, reviewData } = state; // Get data passed from QuizPage

//   return (
//     <div className="container">
//       <h3 className="text-center py-3">Quiz Score</h3>
//       <button className="btn btn-danger">View Score</button>
//       <button>Review</button>
//       <h5>
//         You scored {score} out of {total}
//       </h5>

//       <div className="review-questions quizpart p-4" >
//         {reviewData.map((question, index) => (
//           <div key={index} className="question-review my-3">
//             <h6>Question {index + 1}:</h6>
//             <div
//               style={{ fontFamily: "Times New Roman, Times, serif" }}
//               dangerouslySetInnerHTML={{
//                 __html: question.questionText,
//               }}
//             />

//             <div>
//               <strong>Your Answer:</strong> {question.userAnswer || "Not answered"}
//             </div>
//             <div>
//               <strong>Correct Answer:</strong> {question.correctAnswer}
//             </div>

           
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Score;





// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// function Score() {
//   const { state } = useLocation();
//   const { score, total, reviewData } = state; 
//   const [showScore, setShowScore] = useState(false);
//   const [showReview, setShowReview] = useState(false);
//   const handleViewScore = () => {
//     setShowScore(true);
//   };

//   const handleReviewToggle = () => {
//     setShowReview(!showReview);
//   };

//   return (
//     <div className="container">
//       <h3 className="text-center py-3">Quiz Score</h3>
//      <div className="d-flex flex-column justify-content-center align-items-center">
//       <button className="btn btn-success" onClick={handleViewScore}>
//         View Score
//       </button>
//       </div>

     
//       {showScore && (
//         <h5 className="text-center py-3">
//           You scored {score} out of {total}
//         </h5>
//       )}

//       {showScore && (
//         <button className="btn btn-primary mt-3" onClick={handleReviewToggle}>
//           {showReview ? "Hide Review" : "Review Answers"}
//         </button>
//       )}

     
//       {showReview && (
//         <div className="review-questions quizpart p-4">
//           {reviewData.map((question, index) => (
//             <div key={index} className="question-review my-3">
//               <h6>Question {index + 1}:</h6>
//               <div 
//                 dangerouslySetInnerHTML={{
//                   __html: question.questionText,
//                 }}
//               />

//               <div>
//                 <strong>Your Answer:</strong> {question.userAnswer || "Not answered"}
//               </div>
//               <div>
//                 <strong>Correct Answer:</strong> {question.correctAnswer}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// export default Score;




import React, { useState } from "react";
import { useLocation } from "react-router-dom";
function Score() {
  const { state } = useLocation();
  const { score, total, reviewData } = state;
  const [showScore, setShowScore] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const handleViewScore = () => {
    setShowScore(true);
  };

  const handleReviewToggle = () => {
    setShowReview(!showReview);
  };

  return (
    <div className="container">
      <h3 className="text-center py-3">Quiz Score</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-light">Action</th>
            <th className="text-light">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button className="btn btn-success" onClick={handleViewScore}>
                View Score
              </button>
            </td>
            <td>
              {showScore && (
                <div>
                  <h5>
                    You scored {score} out of {total}
                  </h5>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleReviewToggle}
                  >
                    {showReview ? "Hide Review" : "Review Answers"}
                  </button>
                </div>
              )}
            </td>
          </tr>
          {showReview && (
            <tr>
              <td colSpan="2">
                <div className="review-questions quizpart p-4">

                {reviewData.map((question, index) => (
  <div key={index} className="question-review my-3">
    <h6>Question {index + 1}:</h6>
    <div
      dangerouslySetInnerHTML={{
        __html: question.questionText,
      }}
    />
    <div>
      <strong>Your Answer:</strong> {question.userAnswer || "Not answered"}
    </div>
    <div>
      <strong>Correct Answer:</strong> {question.correctAnswer || "Not available"}
    </div>
  </div>
))}

{console.log("Review Data:", reviewData)}

                  {/* {reviewData.map((question, index) => (
                    <div key={index} className="question-review my-3">
                      <h6>Question {index + 1}:</h6>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: question.questionText,
                        }}
                      />
                      <div>
                        <strong>Your Answer:</strong> {question.userAnswer || "Not answered"}
                      </div>
                      <div>
                        <strong>Correct Answer:</strong> {question.correctAnswer}
                      </div>
                    </div>
                  ))} */}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Score;
