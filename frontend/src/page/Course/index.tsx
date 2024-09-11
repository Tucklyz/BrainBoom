import { Card, Button } from "antd";
import { Star } from "phosphor-react";
import { Link } from "react-router-dom";
import HeaderComponent from '../../components/header';

const { Meta } = Card;

const cardsData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Course ${index + 1}`,
  tuter: `Tuter ${index + 1}`,
  rating: (Math.random() * 5).toFixed(1),
  price: (Math.random() * 2000).toFixed(2),
  imageUrl: "https://via.placeholder.com/200x200",
}));

function Course() {
  return (
    <>
    <HeaderComponent />
    <section
      style={{
        padding: "95px 50px 30px 50px",
      }}
    >
      {["แนะนำสำหรับคุณ", "ยอดนิยม", "คอร์สของฉัน"].map((categoryTitle) => (
        <div key={categoryTitle} style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "30px",
              color: "#002A48",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {categoryTitle}
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              gap: "15px",
              paddingBottom: "15px",
            }}
          >
            {cardsData.map((card) => (
              <Link to={`/course/${card.id}`} key={card.id} style={{ textDecoration: "none" }}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={card.name}
                      src={card.imageUrl}
                      style={{
                        borderRadius: "20px",
                        height: "200px",
                        objectFit: "cover",
                        width: "100%",
                        padding: "10px",
                        overflow: "hidden", 
                      }}
                    />
                  }
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    width: "200px",
                  }}

                  bodyStyle={{ padding: "0px 10px 10px 10px" }}
                >
                  <Meta
                    title={card.name}
                    description={`Tuter: ${card.tuter}`}
                    style={{ fontSize: "12px"}}
                  />
                  <div
                    style={{
                      marginTop: "5px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <span>Rating: {card.rating}</span>
                    <Star
                      size={15}
                      weight="fill"
                      style={{ color: "#ffcc00", marginLeft: "5px" }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "5px",
                      fontWeight: "bold",
                      color: "#ff4500",
                      fontSize: "14px", 
                    }}
                  >
                    <span className="currency">฿</span>
                    {card.price}
                  </div>
                </Card>
              </Link>
            ))}
            <div
              style={{
                flex: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100px",
              }}
            >
              <Link to={`/course/category/${categoryTitle}`} style={{ textDecoration: "none" }}>
                <Button
                  type="link"
                  style={{
                    display: "block",
                    textAlign: "center",
                    color:"#002A48",
                    margin: "10px 0",
                  }}
                >
                  ดูเพิ่มเติม
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
    </>
  );
}

export default Course;
