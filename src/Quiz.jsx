import { useState } from 'react';


const options = ['A', 'B', 'C', 'D'];

const Quiz = () => {
  // Initialize the state with 24 questions, each having an empty array of selected options
  const [userAnswers, setUserAnswers] = useState(Array(24).fill([]));
  const [responses, setResponses] = useState(Array(24).fill([]));
  const [score, setScore] = useState(null);

  const handleCheckboxChange = (questionIndex, option) => {
    const newAnswers = [...userAnswers];
    const currentAnswers = newAnswers[questionIndex];
    if (currentAnswers.includes(option)) {
      newAnswers[questionIndex] = currentAnswers.filter(ans => ans !== option);
    } else {
      newAnswers[questionIndex] = [...currentAnswers, option];
    }
    setUserAnswers(newAnswers);
  };

  const handleResponseChange = (index, option, isResponse = false) => {
    const newResponses = [...responses];
    if (isResponse) {
      newResponses[index] = option;
    }
    setResponses(newResponses);
  };

  const calculateScore = () => {
    let nota = 10;
    userAnswers.forEach((answers, i) => {
      let s1 = 0;
      const correctResponse = responses[i];
      const t = correctResponse.length;
      answers.forEach(answer => {
        if (correctResponse.includes(answer)) {
          s1 += 3.75 / t;
        } else {
          s1 -= 0.66 * 3.75 / t;
        }
      });
      if (s1 < 0) s1 = 0;
      nota += s1;
    });
    setScore(nota);
  };

  return (
    <>
    <h1>UBB calculator pentru Frumosii Mei</h1>
    <h2>p.s. Incearca sa pui raspunsurile pentru Barem si dupa raspunsurile tale</h2>
    <div className="pair">
                <div>
                    <h2>Barem</h2>
                    {responses.map((response, i) => (
                        <div key={i} className="input-group">
                        <label>{i + 1}:</label>
                        {options.map(option => (
                            <label key={option} className={`option-box ${response === option ? 'selected' : ''}`}>
                            <input
                                type="checkbox"
                                name={`response-${i}`}
                                value={option}
                                // checked={response === option}
                                onChange={() => handleResponseChange(i, option, true)}
                            />
                            {option}
                            </label>
                        ))}
                        </div>
                    ))}
                </div>
                <div>
                <h2>Raspunsuri</h2>
                {userAnswers.map((answers, i) => (
                    <div key={i} >
                    <label>{i + 1}:</label>
                    {options.map(option => (
                        <label key={option} className={`option-box ${answers.includes(option) ? 'selected' : ''}`}>
                        <input
                            type="checkbox"
                            checked={answers.includes(option)}
                            onChange={() => handleCheckboxChange(i, option)}
                        />
                        {option}
                        </label>
                    ))}
                    </div>
                ))}
                </div>
    </div>
    <button onClick={calculateScore}>Calculate Score</button>
      {score !== null && <h2>Final Score: {score.toFixed(2)}</h2>}
</>
    
  );
};

export default Quiz;