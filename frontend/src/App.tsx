import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Course from './page/Course';
import SCourseDetail from './page/CourseDetail'; 
import MyCourse from './page/MyCourse';
import Tuter from './page/Tuter';
import Create from './page/Tuter/Create';
import Edit from './page/Tuter/Edit';
import TCourseDetail from './page//Tuter/CourseDetail';
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
        <Route path="/tuter" element={<Tuter />}/>
        <Route path="/tuter/create" element={<Create />}/>
        <Route path="/tuter/edit" element={<Edit />}/>
        <Route path="/tuter/:id" element={<TCourseDetail />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/search/show" element={<Show />}/>

        {/*Review System*/}
      </Routes>
    </Router>
  );
};

export default App;
