import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import MessageItem from "./MessageItem";
import { AuthContext } from "../../shared/context/auth-context";
import "./MessageList.css";

const MessageList = (props) => {
  const auth = useContext(AuthContext);
  const userId = useParams().userId;

  if (props.items.length === 0 && auth.userId === userId) {
    return (
      <div className="message-list center">
        <Card>
          <h2>You have no messages till now!</h2>
        </Card>
      </div>
    );
  }

  if (props.items.length === 0) {
    return (
      <div className="message-list center">
        <Card>
          <h2>Write the first message!</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="message-list">
      {props.items.map((message) => (
        <MessageItem
          key={message.id}
          id={message.id}
          creatorId={message.creator}
          ownerId={message.owner}
          msgBody={message.msgBody}
          onDelete={props.onDeleteMessage}
        />
      ))}
    </ul>
  );
};

export default MessageList;
