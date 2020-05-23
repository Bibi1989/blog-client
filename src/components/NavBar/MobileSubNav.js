import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { UserContext } from "../userContext/UserProvider";
import { Dropdown } from "semantic-ui-react";

const MobileSubNav = () => {
  let { getUser, getAllUsers, allUsers } = React.useContext(UserContext);
  let users = JSON.parse(sessionStorage.getItem("user"));
  const dispatch = useDispatch();
  const loading = useSelector(({ posts: { loading } }) => loading);
  const available_tags = [
    { tags: "post", color: "orangered" },
    { tags: "dev", color: "lime" },
    { tags: "article", color: "teal" },
    { tags: "question", color: "red" },
  ];

  React.useEffect(() => {
    getAllUsers("");

    // eslint-disable-next-line
  }, []);
  return (
    <Nav>
      <User>
        <Drop icon='' text='Users' floating labeled className='icon'>
          <Dropdown.Menu>
            {allUsers !== null &&
              allUsers.map((all) => (
                <Dropdown.Item>{all.username}</Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Drop>
      </User>
      <Tags>
        <Drop icon='' text='Tags' floating labeled className='icon'>
          <Dropdown.Menu>
            {available_tags.map((tag) => (
              <Dropdown.Item>{tag.tags}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Drop>
      </Tags>
    </Nav>
  );
};

export default MobileSubNav;

const Nav = styled.nav`
  width: 100vw;
  display: flex;
  padding: 0.3em 1em;
  background: tomato;
  color: white;
`;
const User = styled.div`
  .icon {
    &:first-child {
      border-right: 1px solid #ccc;
    }
  }
`;
const Tags = styled.div``;
const Drop = styled(Dropdown)`
  margin-right: 1em;
`;