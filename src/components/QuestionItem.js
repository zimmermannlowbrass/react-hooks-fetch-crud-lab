import React from "react";

function QuestionItem({ question, deleteClick, makeCorrectAnswerChange}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    deleteClick(question)
  }

  function handleCorrectAnswerChange(e) {
    const newCorrect = e.target.value
    makeCorrectAnswerChange(question, newCorrect)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
        defaultValue={correctIndex}
        onChange = {handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick = {handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
