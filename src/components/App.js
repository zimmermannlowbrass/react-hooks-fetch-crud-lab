import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  function handleNewQ(newQ) {
    console.log(newQ)
    setPage([...page, newQ])

  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm grabNewData = {handleNewQ}/> : 
      <QuestionList />}
    </main>
  );
}

export default App;
