import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const ErrorPage = () => {
  return (
    <Error>
      <h2>Expired token or invalid link try again</h2>
      <Link to='/login'>
        <Button color='twitter' style={{ marginTop: "10px" }}>
          Go Back to Site
        </Button>
      </Link>
    </Error>
  );
};

export default ErrorPage;

const Error = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
