import React from "react";

const LikeButton = () => {
  return (
    <div>
      <span>
        <i className='fas fa-heart'></i> {likeCount}
      </span>
    </div>
  );
};

export default LikeButton;
