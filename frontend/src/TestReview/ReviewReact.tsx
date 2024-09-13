import { useState, useEffect } from "react";
import {
  GetReviewById,
  GetFilteredReviews,
  GetUserById,
  SearchReviewsByKeyword,
  GetRatingsAvgByCourseID,
} from "../services/https";
import { ReviewInterface } from "../interfaces/IReview";
import { FaStar } from "react-icons/fa";
import "./gol.css";

const ReviewReact = () => {
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<ReviewInterface[]>([]);
  const [starLevel, setStarLevel] = useState<string>("All");
  const [courseID] = useState<number>(2);
  const [userName, setUserName] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [averageRatings, setAverageRatings] = useState<
    { rating: number; percentage: number }[]
  >([]);
  const [userProfile, setUserProfile] = useState<string>("");

  // Function to get user name by ID
  const getUserNameById = async (id: number) => {
    let user = await GetUserById(id);
    if (user) {
      setUserName(`${user.FirstName ?? ""} ${user.LastName ?? ""}`);
      setUserProfile(user.Profile || "");
    }
  };

  // Function to get reviews by course ID
  const getReviewsById = async (id: number) => {
    let res = await GetReviewById(id);
    if (res) {
      setReviews(res);
      setFilteredReviews(res);
    }
  };

  // Function to get filtered reviews based on star level
  const getFilteredReviews = async () => {
    if (starLevel === "All") {
      setFilteredReviews(reviews);
    } else {
      const filtered = await GetFilteredReviews(starLevel, courseID);
      if (filtered) {
        setFilteredReviews(filtered);
      }
    }
  };

  // Function to search reviews by keyword
  const searchReviews = async (keyword: string) => {
    if (keyword.length > 1) {
      const wordBoundaryRegex = new RegExp(`\\b(${keyword})\\b`, "gi");
      const result = await SearchReviewsByKeyword(keyword, courseID);
      if (result) {
        // Replace the search keyword with <span> in the comment text
        const updatedReviews = result.map((review: ReviewInterface) => {
          if (review.Comment) {
            const updatedComment = review.Comment.replace(
              wordBoundaryRegex,
              '<span class="highlighted-text">$1</span>'
            );
            return { ...review, Comment: updatedComment };
          }
          return review;
        });
        setFilteredReviews(updatedReviews.length > 0 ? updatedReviews : []);
      }
    } else if (keyword.length === 0) {
      // If the search keyword is empty, show all reviews
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews([]);
    }
  };

  // Function to get average ratings by course ID
  const getAverageRatings = async () => {
    const avgRatings = await GetRatingsAvgByCourseID(courseID);
    if (avgRatings) {
      setAverageRatings(avgRatings);
    }
  };

  // Effect to fetch reviews and user name on component mount
  useEffect(() => {
    getReviewsById(courseID);
    getUserNameById(1);
  }, [courseID]);

  // Effect to get filtered reviews whenever star level, reviews, or course ID changes
  useEffect(() => {
    getFilteredReviews();
  }, [starLevel, reviews, courseID]);

  // Effect to get average ratings whenever reviews change
  useEffect(() => {
    if (reviews.length > 0) {
      getAverageRatings();
    }
  }, [reviews]);

  // Function to format date
  const formatDate = (date?: Date | string) => {
    if (!date) return "Unknown Date";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (typeof date === "string") {
      return new Date(date).toLocaleDateString(undefined, options);
    }

    return date.toLocaleDateString(undefined, options);
  };

  // Function to render star rating
  const renderStarsUser = (rating: number = 0) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? "star-color-rating" : "star-color-fail"}
      />
    ));
  };

  // Function to render comment with highlighted search keyword
  const renderComment = (comment?: string) => {
    if (!comment) return null;
    return <span dangerouslySetInnerHTML={{ __html: comment }} />;
  };

  // Handler for search button click
  const handleSearch = () => {
    searchReviews(searchKeyword);
  };

  return (
    <div>
      <div>
        <label htmlFor="starLevel">Star Rating:</label>
        <select
          id="starLevel"
          value={starLevel}
          onChange={(e) => setStarLevel(e.target.value)}
        >
          <option value="All">All</option>
          <option value="FiveStar">5 Stars</option>
          <option value="FourStar">4 Stars</option>
          <option value="ThreeStar">3 Stars</option>
          <option value="TwoStar">2 Stars</option>
          <option value="OneStar">1 Star</option>
        </select>
      </div>
      <br />
      <div>
        <label htmlFor="searchKeyword">Search:</label>
        <input
          id="searchKeyword"
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <br />
      <br />
      <p>
        Average 1 Star :{" "}
        {averageRatings.find((r) => r.rating === 1)?.percentage.toFixed(2) ||
          "0.00"}
        %
      </p>
      <p>
        Average 2 Star :{" "}
        {averageRatings.find((r) => r.rating === 2)?.percentage.toFixed(2) ||
          "0.00"}
        %
      </p>
      <p>
        Average 3 Star :{" "}
        {averageRatings.find((r) => r.rating === 3)?.percentage.toFixed(2) ||
          "0.00"}
        %
      </p>
      <p>
        Average 4 Star :{" "}
        {averageRatings.find((r) => r.rating === 4)?.percentage.toFixed(2) ||
          "0.00"}
        %
      </p>
      <p>
        Average 5 Star :{" "}
        {averageRatings.find((r) => r.rating === 5)?.percentage.toFixed(2) ||
          "0.00"}
        %
      </p>
      <center style={{ color: "red" }}>Test React</center>
      {filteredReviews.length > 0 ? (
        filteredReviews.map((review) => (
          <div>
            <div key={review.ID} className="review-container">
              <img
                src={userProfile}
                className="review-profile-img"
                alt="User Profile"
              />
              <div className="reviews-comment-text">
                <p>Name: {userName}</p>
                <p>Rating: {renderStarsUser(review.Rating ?? 0)} </p>
                <p>Comment: {renderComment(review.Comment)}</p>
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

export default ReviewReact;
