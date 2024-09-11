import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Course from './page/Course';
import SCourseDetail from './page/CourseDetail'; 
import MyCourse from './page/MyCourse';
import Tuter from './page/Tuter';
import Create from './page/Tuter/Create';
import Edit from './page/Tuter/Edit';
import TCourseDetail from './page//Tuter/CourseDetail'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Course />} />
        <Route path="/course/:id" element={<SCourseDetail />}/>
        <Route path="/myCourses" element={<MyCourse />}/>
        <Route path="/tuter" element={<Tuter />}/>
        <Route path="/tuter/create" element={<Create />}/>
        <Route path="/tuter/edit" element={<Edit />}/>
        <Route path="/tuter/:id" element={<TCourseDetail />}/>
      </Routes>
    </Router>
  );
};

export default App;
