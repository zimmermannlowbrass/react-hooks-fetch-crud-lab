import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList( ) {

  const [questions, setQuestions] = useState([])

  function setListWithDeletedItem(deletedQ) {
    fetch(`http://localhost:4000/questions/${deletedQ.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() =>{
      const newQuestions = questions.filter(q => q.id !== deletedQ.id)
      setQuestions(newQuestions)
    })
  }

  function resetTheCorrectAnswer(changedQuestion, newIndex) {
    //first do a patch
    fetch(`http://localhost:4000/questions/${changedQuestion.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: newIndex
      })
    })
    //then reset the state
    const newQuestions = questions.map((question) => {
      if (question.id === changedQuestion.id) {
        return {
          answers : question.answers,
          correctIndex: newIndex,
          id: question.id,
          prompt: question.prompt
        }
      } else {
        return question
      }
    })
    setQuestions(newQuestions)
  }

  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
    .then(r => r.json())
    .then(fetchedData => setQuestions(fetchedData))
  }, [])
  
  const questionList = questions.map((question) => {
      return (
        <QuestionItem
        makeCorrectAnswerChange = {resetTheCorrectAnswer}
        deleteClick = {setListWithDeletedItem}
        key = {question.id}
        question = {question} />
      )
    })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
