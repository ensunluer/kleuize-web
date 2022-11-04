import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";

interface QuizResultProps {
  score: number;
}

export const QuizResult: React.FC<QuizResultProps> = ({ score }) => {
  return (
    <>
      <Typography color="secondary" variant="h4" component="div" mb={4}>
        Quiz Result
      </Typography>

      <Box mb={4}>
        <CircularProgressWithLabel value={100} />
      </Box>

      <Typography variant="h6" mb={1}>
        You have completed the quiz.
      </Typography>
      <Typography variant="h6">
        You answered <strong> {score}%</strong> of the questions correctly.
      </Typography>
    </>
  );
};
