import React from "react";
import { Dropdown } from "semantic-ui-react";
import moment from "moment";

export const Notify = ({ notices, deleteNotification, dispatch }) => {
  return (
    <Dropdown
      icon='alarm'
      // eslint-disable-next-line
      text={
        <sup
          style={{
            position: "absolute",
            right: "-3px",
            top: "0px",
            width: "15px",
            height: "15px",
            fontSize: "0.6em",
            borderRadius: "50%",
            background: "orangered",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {notices.length}
        </sup>
      }
      floating
      labeled
      className='icon'
      style={{ marginRight: "0.7em", color: "white", fontSize: "1.3em" }}
    >
      <Dropdown.Menu
        style={{
          Width: "220px",
          marginLeft: "-140px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {notices.map((notice) => (
          <>
            <Dropdown.Item
              onClick={() => deleteNotification(dispatch, notice.id)}
            >
              <p style={{ margin: "0" }}>{notice.message}</p>
              {/* <Dropdown.Item></Dropdown.Item> */}
              <span style={{ color: "#999", padding: "0", fontSize: "0.8em" }}>
                {moment(notice.createdAt).fromNow(true)} ago
              </span>
            </Dropdown.Item>
            <Dropdown.Divider />
          </>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
