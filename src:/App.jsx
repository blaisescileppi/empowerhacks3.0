import { useState } from "react";
import lessons from "./data/lessons.json";
import Flashcards from "./src/Flashcards.jsx";
import Quiz from "./src/Quiz.jsx";

// import lessons from "./data/lessons.json";
// import Flashcards from "./Flashcards.jsx";
// import Quiz from "./Quiz.jsx";

function App() {
    const [mode, setMode] = useState("menu");
    const [subject, setSubject] = useState(null);

    const subjects = Object.keys(lessons);

    if (mode === "menu") {
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">
            <h1 className="text-3xl font-bold mb-6">Offline Learning Library</h1>
            {subjects.map((subj) => (
              <div key={subj} className="flex gap-2 mb-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl"
                  onClick={() => {
                    setSubject(subj);
                    setMode("flashcards");
                  }}
                >
                  {subj} - Flashcards
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-xl"
                  onClick={() => {
                    setSubject(subj);
                    setMode("quiz");
                  }}
                >
                  {subj} - Quiz
                </button>
              </div>
            ))}
          </div>
        );
      }
    
      if (mode === "flashcards") {
        return <Flashcards cards={lessons[subject]} />;
      }
    
      if (mode === "quiz") {
        return <Quiz cards={lessons[subject]} />;
      }
    
      return <p>Something went wrong. Please try again.</p>; // fallback UI
    }
    
export default App;
