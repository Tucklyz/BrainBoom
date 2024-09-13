import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Course from './page/Course';
import SCourseDetail from './page/CourseDetail'; 
import MyCourse from './page/MyCourse';
import Tutor from './page/Tutor';
import Create from './page/Tutor/Create';
import Edit from './page/Tutor/Edit';
import TCourseDetail from './page/Tutor/CourseDetail';
import Search from './page/Search';
import Show from './page/Search/Show';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        {/*Course System*/}
        <Route path="/" element={<Course />} />
        <Route path="/course/:id" element={<SCourseDetail />}/>
        <Route path="/myCourses" element={<MyCourse />}/>
        <Route path="/tutor" element={<Tutor />}/>
        <Route path="/tutor/create" element={<Create />}/>
        <Route path="/tutor/edit" element={<Edit />}/>
        <Route path="/tutor/:id" element={<TCourseDetail />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/search/show" element={<Show />}/>

        {/*Review System*/}
      </Routes>
    </Router>
  );
};

export default App;
