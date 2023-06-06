import { formatTodosForAI } from "./formatTodosForAI";

const fetchSuggestion = (board: Board) => {
  const todos = formatTodosForAI(board);
  // const res = await fetch("/api/generateSummary", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ todos }),
  // });

  // const gptData = await res.json();
  // const { content } = gptData;
  return todos;
};
export default fetchSuggestion;
