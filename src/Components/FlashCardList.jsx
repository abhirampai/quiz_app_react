import React from "react";
import Flashcard from "./FlashCard";

export default function FlashcardList({ flashcards }) {
  return (
    <div className="grid-flow-row mt-2">
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
}
