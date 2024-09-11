import HeaderComponent from '../../components/header';
import { Button, Input, Card, Row, Col, Typography, Space, Rate } from 'antd';
import { StarFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;
const { Text, Title } = Typography;

const cardsData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Course ${index + 1}`,
    countstd: (Math.random() * 500).toFixed(0),
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    price: (Math.random() * 2000).toFixed(2),
    imageUrl: "https://via.placeholder.com/150x150"
}));

function Tuter() {
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
            <Link to="/tuter/create">
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
            {cardsData.map(card => (
              <Col
                xs={24} 
                sm={24} 
                md={12}
                lg={12} 
                key={card.id}
              >
                  <Card
                    style={{
                      borderRadius: '20px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      transition: 'transform 0.3s',
                      height: '100%', 
                    }}

                    bodyStyle={{padding:'15px',}}
                    hoverable
                    actions={[
                      <Link to="/tuter/edit"><EditOutlined key="edit" /></Link>,
                      <DeleteOutlined key="delete" />,
                    ]}
                    >
                  <Link to={`/tuter/${card.id}`} key={card.id} style={{ textDecoration: "none" }}>
                    <Row gutter={15} align="top">
                      <Col span={7}>
                        <img
                          alt={card.name}
                          src={card.imageUrl}
                          style={{
                            borderRadius: '20px',
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                          }}
                          />
                      </Col>
                      <Col span={16}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Title level={4} style={{ color: '#333d51' }}>{card.name}</Title>
                          <Text style={{ color: '#7d7d7d' }}>จำนวนผู้สมัคร: {card.countstd}</Text>
                          <Space>
                            <Rate allowHalf disabled defaultValue={card.rating} character={<StarFilled />} />
                            <Text>{card.rating}</Text>
                          </Space>
                          <Text strong style={{ color: '#ff4500' }}>฿{card.price}</Text>
                        </Space>
                      </Col>
                    </Row>
                  </Link>
                  </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </>
  );
}

export default Tuter;
