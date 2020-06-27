import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Button } from "semantic-ui-react";

const ProfileSettings = ({ user, updateUser, updateUserImage }) => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

  const handleFile = async ({ currentTarget: { files } }) => {
    setImage(files[0]);
  };

  const onsubmit = (e) => {
    e.preventDefault();

    if (username) {
      updateUser(user.id, { username });
      setUsername("");
    }
    if (image) {
      const formDate = new FormData();
      formDate.append("file", image);
      updateUserImage(formDate);
      return setImage("");
    }
  };
  return (
    <SettingWrapper>
      <div>
        <h3 className='setting-header'>{user.username} Settings</h3>
      </div>
      <FormDiv>
        <h3 className='setting-header'>Update Profile Username</h3>
        <form onSubmit={onsubmit}>
          <div>
            <label htmlFor='username'>Change Username: </label>
            <input
              type='text'
              name='username'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Change Username'
            />
          </div>
          <Button type='submit' style={{ marginTop: "0.8em" }}>
            Change Name
          </Button>
        </form>
      </FormDiv>
      <FormDiv>
        <h3 className='setting-header'>Update Profile Image</h3>
        <form onSubmit={onsubmit}>
          <div>
            <label htmlFor='file'>Change Profile Image: </label>
            <input
              type='file'
              name='file'
              id='file'
              onChange={handleFile}
              placeholder='Change Profile Image'
              accept='image/*'
            />
          </div>
          <Button type='submit' style={{ marginTop: "0.8em" }}>
            Update Profile Image
          </Button>
        </form>
      </FormDiv>
    </SettingWrapper>
  );
};

export default ProfileSettings;

const SettingWrapper = styled.div`
  .setting-header {
    text-decoration: underline;
    margin-bottom: 1em;
    color: #777777;
  }
`;

const FormDiv = styled.div`
  border-bottom: 1px solid #aaaaaa;
  padding-bottom: 1.5em;
  margin-bottom: 1.5em;

  input {
    padding: 0.7em;
    border: 1px solid #999;
    border-radius: 0.3em;
    outline: none;
  }

  label {
    display: block;
  }
`;
