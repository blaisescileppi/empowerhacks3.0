// Pulls in useState to  store + update data inside the component (index, score, selected answer)
import { useState } from "react";

/* Defines a React component called Quiz + accepts a prop called cards (an array of { q: "question", a: "answer" } objects */
export default function Quiz({ cards }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const current = cards[index];

  const checkAnswer = (choice) => {
    setSelected(choice);
    if (choice === current.a) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setSelected(null);
      setIndex((prev) => (prev + 1) % cards.length);
    }, 1000);
  };

  // Simple options: shuffle real answer + 2 fakes
  const options = [current.a, "Random1", "Random2"].sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-lg font-semibold mb-2">{current.q}</h2>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => checkAnswer(opt)}
            className={`px-4 py-2 rounded-xl shadow-md ${
              selected === opt
                ? opt === current.a
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-white"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <p className="mt-4">Score: {score}</p>
    </div>
  );
}
