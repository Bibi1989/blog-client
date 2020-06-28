import React from "react";
import { Dropdown } from "semantic-ui-react";
import { Logo, Image } from "../home/PostCard";

export const Profile = ({ users, history, handleLogout, image }) => (
  <Dropdown
    text={
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
          <Image
            width='30px'
            title='Click to to see links of profile and logout'
          >
            <img src={image} alt='logo' />
          </Image>
        ) : (
          <Image width='30px'>
            <img src='../../../avatar.png' alt='profile logo' />
          </Image>
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
