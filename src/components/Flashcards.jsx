/* Import React' useState port which allows the component
to keep track of data that changes over time
(like which card user is on and whether the card is flipped */
import React from 'react';
import { useState } from "react";

// React component named "Flashcards", receives array "cards" from json
// index keeps track of what card in {cards} user is on
// flipped set initially to "false" (showing the question)
// setIndex and setFlipped = functions to update values 
export default function Flashcards({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

// Function nextCard, set nextCard to question side
  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length); // % to go back to first card at the end
  };

// Return the UI
/*Starts at the first card (index 0, showing question).
Click card -> toggles between question/answer.
Click Next -> moves to the next card and resets flip to question.
After the last card, it loops back to the first.*/
// "onClick": React special prop that interacts with elements (e.g "button")
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div
        className="w-64 h-40 bg-white shadow-md rounded-2xl flex items-center justify-center text-xl font-bold cursor-pointer mb-4 p-4 text-center"
        onClick={() => setFlipped(!flipped)}>
        {flipped ? cards[index].a : cards[index].q}
      </div>
      <button
        onClick={nextCard}
        className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600">
        Next
      </button>
    </div>
  );
}
