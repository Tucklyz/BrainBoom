import {CourseInterface} from "../../interfaces/ICourse"; 

const apiUrl = "http://localhost:8000";

async function GetCourses() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${apiUrl}/courses`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Response is not in JSON format');
      }
    });

  return res;
}


async function CreateCourse(data: CourseInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/courses`, requestOptions)
    .then((res) => {
      if (res.status == 201) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function UpdateCourse(data: CourseInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/courses`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function GetCourseById(id: number) {
  const requestOptions = {
    method: "GET"
  };

  const res = await fetch(`${apiUrl}/courses/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function GetCourseByCategoryID(categoryID: number){
  try {
      const response = await fetch(`/courses/category/${categoryID}`);
      if (!response.ok) throw new Error('การตอบสนองของเครือข่ายไม่ถูกต้อง');
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
          return await response.json();
      } else {
          throw new Error('การตอบสนองไม่ใช่ JSON');
      }
  } catch (error) {
      console.error('ข้อผิดพลาดในการดึงข้อมูลคอร์ส:', error);
      return false;
  }
};

async function GetCourseByTutorID(tutorID: number) {
  try {
    const response = await fetch(`${apiUrl}/tutor/${tutorID}`); 

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (Array.isArray(data)) {
        return data;
      } else {
        throw new Error('Received data is not an array');
      }
    } else {
      throw new Error('Response is not JSON');
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    return []; // คืนค่าที่เป็น Array แทน `false`
  }
}

export {

  GetCourses,

  CreateCourse,

  UpdateCourse,

  GetCourseById,

  GetCourseByCategoryID,

  GetCourseByTutorID,

};