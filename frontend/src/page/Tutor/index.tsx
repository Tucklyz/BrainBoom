import { useState, useEffect } from 'react';
import HeaderComponent from '../../components/header';
import { Button, Input, Card, Row, Col, Typography, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { GetCourseByTutorID, DeleteCourse } from '../../services/https';
import { CourseInterface } from '../../interfaces/ICourse';

const { Search } = Input;
const { Text, Title } = Typography;

function Tutor() {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const tutorID = 1; 

  const navigate = useNavigate();

  const handleCourseClick = (course: CourseInterface) => {
    navigate(`/tutor/${course.ID}`, { state: { course } });
  };

  const deleteCourse = async (courseID: number) => {
    try {
      const response = await DeleteCourse(courseID);
      console.log('API response:', response);
      setCourses(courses.filter(course => course.ID !== courseID));
      console.log(`Course with ID ${courseID} deleted successfully`);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await GetCourseByTutorID(tutorID);
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error('Received data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [tutorID]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <HeaderComponent />
      <section
        style={{
          padding: "95px 50px 30px 50px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0px auto',
            maxWidth: '1200px',
            borderRadius: '20px',
            border: '2px solid #e0e0e0',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            padding: '50px 100px',
            backgroundColor: '#ffffff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <Title level={2} style={{ color: '#333d51' }}>หลักสูตร</Title>
          <Space style={{ marginBottom: '20px', justifyContent: 'space-between' }}>
            <Search
              placeholder="ค้นหาหลักสูตร"
              style={{
                width: 500,
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Link to="/tutor/create">
              <Button
                type="primary"
                style={{
                  backgroundColor: '#333d51',
                  borderColor: '#333d51',
                  borderRadius: '10px',
                  padding: '0 20px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                สร้างหลักสูตร
              </Button>
            </Link>
          </Space>

          <Row gutter={[15, 15]} justify="center">
            {courses.map(course => (
              <Col
                xs={24} 
                sm={24} 
                md={12}
                lg={12} 
                key={course.ID}
              >
                <Card
                  style={{
                    borderRadius: '20px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.3s',
                    height: '100%', 
                  }}
                  hoverable
                  actions={[
                    <Link to={`/tutor/edit/${course.ID}`} key="edit"><EditOutlined /></Link>,
                    <DeleteOutlined key="delete" onClick={() => deleteCourse(course.ID || 0)} />,
                  ]}
                >
                  <div key={course.ID} onClick={() => handleCourseClick(course)}>
                    <Row gutter={15} align="top">
                      <Col span={7}>
                        <img
                          alt={course.Title}
                          src={course.ProfilePicture ? course.ProfilePicture : "https://via.placeholder.com/200x200"}
                          style={{
                            borderRadius: '20px',
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                          }}
                        />
                      </Col>
                      <Col span={17}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Title level={4} style={{ color: '#333d51' }}>{course.Title}</Title>
                          <Text style={{ color: '#7d7d7d' }}>จำนวนผู้สมัคร: {/*{course.CountStd || 0}*/}</Text>
                          <Space>
                            <Text>5.0{/*{course.Rating || 'N/A'}*/}</Text>
                          </Space>
                          <Text strong style={{ color: '#ff4500' }}>฿{course.Price}</Text>
                        </Space>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </>
  );
}

export default Tutor;
