import React from "react";

export const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
   const starClassName = i <= rating ? "star-small" : "star-small empty"
    stars.push(
      <svg
        key={i}
        className="starClassName"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill={i <= rating ? "gold" : "gray"}
      >
        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
      </svg>
    );
  }
  return (
    <div className="star-row">
        {stars}
    </div>
)
};
