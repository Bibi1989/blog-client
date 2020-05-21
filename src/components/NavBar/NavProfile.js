import React from "react";
import { Dropdown } from "semantic-ui-react";
import { Logo, Image } from "../home/PostBody";

export const Profile = ({ users, history, handleLogout, image }) => (
  <Dropdown
    text={
      // <Logo
      //   width='30px'
      //   style={{
      //     background: "white",
      //     color: "#777",
      //     fontSize: "0.8em",
      //     margin: "0",
      //     cursor: "pointer",
      //   }}
      // >
      //   {users.username.toUpperCase().slice(0, 2)}
      // </Logo>
      <Logo
        width='30px'
        style={{
          background: "white",
          color: "#777",
          fontSize: "0.8em",
          margin: "0",
          cursor: "pointer",
        }}
      >
        {image ? (
          <Image width='30px'>
            <img src={image} />
          </Image>
        ) : (
          users.username.toUpperCase().slice(0, 2)
        )}
      </Logo>
    }
    icon=''
    floating
    labeled
    className='icon'
  >
    <Dropdown.Menu style={{ minWidth: "250px", marginLeft: "-220px" }}>
      <Dropdown.Item
        // eslint-disable-next-line
        icon='address card outline'
        onClick={() => history.push(`/profile/${users.id}`)}
      >
        Profile
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        icon='sign-out'
        onClick={() => {
          handleLogout();
          history.push("/login");
        }}
      >
        Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
