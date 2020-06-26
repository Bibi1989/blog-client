import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { getFile } from "../users/GetImageFile";

const ProfileSettings = ({ user, updateUser }) => {
  console.log(user);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

  const handleFile = async ({ target: { files } }) => {
    const img = await getFile(files);
    console.log(img);
    setImage(img);
  };

  const onsubmit = (e) => {
    e.preventDefault();

    if (username) {
      updateUser(user.id, { username });
      return setUsername("");
    }
    if (image) {
      updateUser(user.id, { image_url: image });
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
