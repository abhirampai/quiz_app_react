import { useEffect, useState } from "react";
import axios from "axios";
import FlashcardList from "./Components/FlashCardList";

function App() {
  const [flashCard, setFlashCard] = useState([]);

  const fetchQuestions = () => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashCard(
        res.data.results.map((questionItem, index) => {
          const answer = questionItem.correct_answer;
          const options = [...questionItem.incorrect_answers, answer];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
            answerPressed: false,
          };
        })
      );
    });
  };

  const decodeString = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  useEffect(() => {
    fetchQuestions(); // eslint-disable-next-line
  }, []);
  return (
    <>
      <FlashcardList flashcards={flashCard} />
    </>
  );
}

export default App;
