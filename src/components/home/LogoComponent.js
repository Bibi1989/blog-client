import React from "react";
import { Image, Logo } from "./PostBody";

const LogoComponent = ({ post, user, image = "" }) => {
  return (
    <Logo style={{ cursor: "pointer" }}>
      {user.username === post.username && image ? (
        <Image>
          <img src={image} />
        </Image>
      ) : (
        post.User.username.slice(0, 2).toUpperCase()
      )}
    </Logo>
  );
};

export default LogoComponent;
