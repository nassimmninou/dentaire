import React from "react";
import Student from "./components/professor_task/Student";
import Professor from "./components/admin_task/Professor";
import Groupe from "./components/admin_task/Groupe";
import Groupe_student from "./components/professor_task/Groupe_student";

import Tooth from "./components/professor_task/Tooth";
import Statistiques from "./components/professor_task/StudentByGroupe";
import Pw from "./components/professor_task/Pw";
import Zfile from "./components/professor_task/Zfile";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Sidebar />} />
        <Route path="/groupe" exact element={<Groupe />} />

        <Route path="/professor" exact element={<Professor />} />
        <Route path="/student" exact element={<Student />} />
        <Route path="/tooths" exact element={<Tooth />} />

        <Route path="/groupestudent" exact element={<Groupe_student />} />
        <Route path="/statistics" exact element={<Statistiques />} />
        <Route path="/pws" exact element={<Pw />} />
        <Route path="/zfile" exact element={<Zfile />} />
      </Routes>
    </>
  );
}

export default App;
