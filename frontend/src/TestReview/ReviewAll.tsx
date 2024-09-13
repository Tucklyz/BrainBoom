import { useState, useEffect } from "react";
import { ListReview, GetUserById } from "../services/https";
import { ReviewInterface } from "../interfaces/IReview";
import { FaStar } from "react-icons/fa";
import "./gol.css";

const TestReview = () => {
  const [Reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userProfile, setUserProfile] = useState<string>("");

  const getUserNameById = async (id: number) => {
    let user = await GetUserById(id);
    if (user) {
      setUserName(`${user.FirstName} ${user.LastName}`);
      setUserProfile(user.Profile || ""); // แก้ไขตรงนี้ให้เป็น 'Profile' ตาม interface
    }
  };

  const getReview = async () => {
    let res = await ListReview();
    if (res) {
      setReviews(res);
    }
  };

  useEffect(() => {
    getReview();
    getUserNameById(1); // Fetch user's name with UserID = 1
  }, []);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Unknown Date"; // Handle undefined dates
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (date instanceof Date) {
      return date.toLocaleDateString(undefined, options);
    }

    return new Date(date).toLocaleDateString(undefined, options);
  };

  const renderStarsUser = (rating: number = 0) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? "star-color-rating" : "star-color-fail"}
      />
    ));
  };

  return (
    <div>
      <br />
      <br />
      <center style={{ color: "red" }}>Test All Reviews</center>
      {Reviews.length > 0 ? (
        Reviews.map((review) => (
          <div>
            <div key={review.ID} className="review-container">
              <img
                src={userProfile}
                className="review-profile-img"
                alt="User Profile"
              />
              <div className="reviews-comment-text">
                <p>Name: {userName}</p>
                <p>Rating: {renderStarsUser(review.Rating ?? 0)}</p>
                <p>Comment: {review.Comment}</p>
                <p>Review Date: {formatDate(review.ReviewDate)}</p>
              </div>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p>No Reviews Found.</p>
      )}
    </div>
  );
};

export default TestReview;

// <img src={review.Picture}alt="Preview"style={{width: "100px",height: "100px",objectFit: "cover", borderRadius: "0px", }} />