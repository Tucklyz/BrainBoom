import { Card, Button, Typography, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../../components/header';

const { Title, Text } = Typography;

// ข้อมูลรีวิว
const reviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    comment: 'This course is excellent. The content is well-organized and easy to follow. Highly recommended!',
    imageUrl: 'https://via.placeholder.com/100x100'
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4,
    comment: 'Very informative and engaging. I learned a lot from this course.',
    imageUrl: 'https://via.placeholder.com/100x100'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    rating: 4.5,
    comment: 'Great course with practical examples. The instructor was very knowledgeable.',
    imageUrl: 'https://via.placeholder.com/100x100'
  }
];

function CourseDetail() {
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent />
      <section
        style={{
          padding: '95px 50px 30px 50px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0px auto',
            maxWidth: '1200px',
            borderRadius: '20px',
            border: '2px solid #CBD0D8',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '50px 65px',
            backgroundColor: '#ffffff',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                width: '30%',
                height: '375px',
              }}
            >
              <Card
                cover={
                  <img
                    src="https://via.placeholder.com/300x300"
                    alt="Course"
                    style={{
                      borderRadius: '10px',
                      objectFit: 'cover',
                      width: '100%',
                      height: '300px',
                      padding: '10px',
                    }}
                  />
                }
                bordered={false}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
                bodyStyle={{ padding: '10px 25px' }}
              >
                <Text type="secondary">Created by: Macc</Text>
                <br />
                <Text type="secondary">Updated: Date</Text>
              </Card>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '70%',
                padding: '20px',
              }}
            >
              <Title level={2}>The React Course 2024</Title>
              <Text
                style={{
                  fontSize: '24px',
                  color: '#003459',
                  fontWeight: 'bold',
                }}
              >
                $99999999999999.99 Bath
              </Text>
              <Button
                type="primary"
                style={{
                  borderRadius: '25px',
                  marginTop: '10px',
                  backgroundColor: '#003459',
                  borderColor: '#003459',
                  transition: 'background-color 0.3s, border-color 0.3s',
                }}
                onClick={() => navigate('/payment')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#002a3d';
                  e.currentTarget.style.borderColor = '#002a3d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#003459';
                  e.currentTarget.style.borderColor = '#003459';
                }}
              >
                ซื้อเลย
              </Button>

              <Divider style={{ margin: '20px' }} />

              <Text strong style={{ fontSize: '18px' }}>
                <u>This group consists of</u>
              </Text>

              <Text style={{ lineHeight: '2.0' }}>
                Continue studying: 24 Hours
                <br />
                Number of chapters: 12 chapters
                <br />
                Study format: Online
                <br />
                Requirements: Students must attend classes on time
                <br />
                Things to prepare: Students should bring their notebooks
              </Text>

              <Divider style={{ margin: '20px' }} />

              <div
                style={{
                  borderRadius: '20px',
                  border: '2px solid rgba(63, 54, 54, 0.304)',
                  padding: '20px',
                  marginBottom: '10px',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <Text>
                  เรียนรู้การพัฒนาเว็บแอปพลิเคชันที่มีประสิทธิภาพด้วย React ซึ่งเป็นไลบรารีที่ได้รับความนิยมสูงสุดในการสร้างส่วนติดต่อผู้ใช้ คอร์สนี้เหมาะสำหรับนักพัฒนาทุกระดับที่ต้องการพัฒนาทักษะในการเขียนโค้ดด้วย React<br/><br/>

                  พื้นฐานของ React และ JSX<br/>
                  การจัดการสถานะ (State Management)<br/>
                  การใช้ Hooks และ Context API<br/>
                  การเชื่อมต่อกับ API ภายนอก<br/>
                  การทดสอบและดีบั๊กแอปพลิเคชัน<br/>
                  การปรับปรุงประสิทธิภาพและการดีไซน์<br/>
                  ข้อกำหนด: นักเรียนควรมีความรู้พื้นฐานเกี่ยวกับ HTML, CSS, และ JavaScript<br/><br/>

                  ผลลัพธ์ที่คาดหวัง: หลังจากเรียนคอร์สนี้เสร็จสิ้น นักเรียนจะสามารถสร้างและปรับปรุงแอปพลิเคชัน React ได้อย่างมั่นใจ รวมถึงสามารถจัดการและปรับปรุงแอปพลิเคชันที่มีการใช้งานจริง<br/>
                </Text>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '0px 45px',
            }}
          >
            <Divider />
            <Title level={3} style={{ color: '#667479' }}>
              Review
            </Title>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}
            >
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  hoverable
                  style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    padding: '0px',
                  }}
                  bodyStyle={{ padding: '10px' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '15px',
                    }}
                  >
                    <img
                      src={review.imageUrl}
                      alt={review.name}
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        width: '65px',
                        height: '65px',
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <Text strong style={{ fontSize: '16px' }}>
                        {review.name}
                      </Text>
                      <span style={{ color: '#FFD700', fontSize: '16px', fontWeight: 'bold' }}>
                        {'★'.repeat(Math.floor(review.rating))}
                      </span>
                      <Text type="secondary" style={{ marginTop: '5px' }}>
                        {review.comment}
                      </Text>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div
              style={{
                flex: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Button
                type="link"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  color: '#002A48',
                  margin: '10px 0',
                }}
              >
                ดูเพิ่มเติม
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseDetail;
