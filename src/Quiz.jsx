import { useState } from 'react';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState(Array(24).fill(''));
  const [responses, setResponses] = useState(Array(24).fill(''));
  const [score, setScore] = useState(null);

  const handleInputChange = (index, value, isResponse = false) => {
    if (isResponse) {
      const newResponses = [...responses];
      newResponses[index] = value;
      setResponses(newResponses);
    } else {
      const newAnswers = [...userAnswers];
      newAnswers[index] = value;
      setUserAnswers(newAnswers);
    }
  };

  const calculateScore = () => {
    let nota = 10;
    userAnswers.forEach((answer, i) => {
      let s1 = 0;
      const t = responses[i].length;
      for (let j = 0; j < answer.length; j++) {
        if (responses[i].includes(answer[j])) {
          s1 += 3.75 / t;
        } else {
          s1 -= 0.66 * 3.75 / t;
        }
      }
      if (s1 < 0) s1 = 0;
      nota += s1;
    });
    setScore(nota);
  };

  return (
    <>
    <h1>Ubb Calculator pt Frumosii mei</h1>
    <br></br>
    <h1>Prima data puneti toate raspunsurile pentru barem si dupa completati cu raspunsurile voastre</h1>
    <h1>Refresh la orice schimbare....e prost</h1>
    
    <div className = "pair">
        <div>
        <h2>Raspunsuri Barem</h2>
            {responses.map((response, i) => (
            <div key={i}>
            <label>Intrebarea {i + 1}:</label>
            <input
                type="text"
                value={response}
                onChange={(e) => handleInputChange(i, e.target.value, true)}
            />
            </div>
        ))}
        </div>
        
      
        <div>
            <h2>Raspunsurile Tale</h2>
            {userAnswers.map((answer, i) => (
            <div key={i}>
                <label>Raspuns {i + 1}:</label>
                <input
                type="text"
                value={answer}
                onChange={(e) => handleInputChange(i, e.target.value)}
                />
            </div>
            ))}
        </div>
      
    </div>
    
    <button onClick={calculateScore}>Calculate Score</button>
    {score !== null && <h2>Final Score: {(score/10).toFixed(4)}</h2>}
      </>
    
  );
};

export default Quiz;