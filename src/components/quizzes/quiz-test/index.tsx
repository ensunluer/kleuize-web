import React from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { nextQuestion, getQuizResult } from "../../../store/quiz/quiz-slice";

import { Timer } from "./Timer";
import { Progress } from "./Progress";
import { Question } from "./Question";
import { Answers } from "./Answer";
import { useRouter } from "next/router";

const useStyles = makeStyles(() => ({
  button: {
    width: "115px",
    padding: "10px",
  },
}));

export const QuizTest = () => {

  const { quizDetails, questionIndex, selectedAnswers } = useAppSelector(
    (state) => state.quiz
  );
  const dispatch = useAppDispatch();

  const { questions } = quizDetails;

  return (
    <>
      <Timer />

      <Progress
        currentQuestion={questionIndex + 1}
        totalQuestions={questions.length}
      />

      <Box mb={3}>
        {questions.map((question: any, index: number) => (
          <Fade
            key={question._id}
            in={questionIndex === index}
            style={{
              transitionDelay: "300ms",
              display: questionIndex !== index ? "none" : "block",
            }}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <Question content={question.content} />

              <Answers
                answers={question.answers}
                selectedAnswer={selectedAnswers[index]}
              />
            </div>
          </Fade>
        ))}
      </Box>

      {questionIndex + 1 >= questions.length ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(getQuizResult())}
          disabled={!selectedAnswers[questionIndex]}
        >
          Submit
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(nextQuestion())}
          disabled={!selectedAnswers[questionIndex]}
        >
          Next
        </Button>
      )}
    </>
  );
};