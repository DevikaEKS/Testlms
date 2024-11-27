import express from "express";
import {
  addBulkQuestion,
  addQuestion,
  createQuiz,
  downloadSampleQuestionFormat,
  fetchQuizQuestions,
  getPracticeTestDifficulty,
  getQuestion,
  getQuestionByModule,
  getQuestionsByModuleAndCourse,
  getQuestionsWithAnswers,
  getQuizType,
  practiceTestCreation,
  practiceTestGetQuestions,
  saveQuizAttempt,
  testCreation,
  updateQuestionByModule,
} from "../../controller/Course/quiz.controller.mjs";
import upload from "../../middleware/fileUpload.mjs";
const router = express.Router();

router.post("/addquestion", addQuestion);
router.post("/uploadquestions", upload.single("file"), addBulkQuestion);
router.get("/download-sample", downloadSampleQuestionFormat);

router.get("/getquestion", getQuestion);
router.get("/getmodulequestions/:moduleId", getQuestionByModule);
router.post("/updatequestion", updateQuestionByModule);
router.get("/questions/:course/:module", getQuestionsByModuleAndCourse);
router.get("/getquiztype", getQuizType);
router.get("/fetch/:courseId/:moduleId/:quizTypeId", fetchQuizQuestions);

router.post("/createquiz", createQuiz);
router.post("/savequiz/:user_id/:ass_id/:module", saveQuizAttempt);

router.get("/getcorrectanswers/:courseid/:moduleid", getQuestionsWithAnswers);

// -----------------------------------------------------------------

router.post("/createtest", upload.single("image"), testCreation);
router.post("/practicetest", practiceTestCreation);

router.get("/practicequestion/:id", practiceTestGetQuestions);
router.get('/practicedifficulty/:id/:user_id',getPracticeTestDifficulty)

export default router;
