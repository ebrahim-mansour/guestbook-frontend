import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import NewMessage from "./NewMessage";
import MessageItem from "./MessageItem";
import { AuthContext } from "../../shared/context/auth-context";
import "./MessageList.css";

const MessageList = (props) => {
  const auth = useContext(AuthContext);
  const userId = useParams().userId;

  if (props.items.length === 0 && auth.userId === userId) {
    return (
      <Card className="message-list">
        <h2>You have no messages till now!</h2>
      </Card>
    );
  }

  if (auth.userId === userId) {
    return (
      <ul className="message-list">
        {props.items.map((message) => (
          <MessageItem
            key={message.id}
            id={message.id}
            creatorId={message.creator}
            ownerId={message.owner}
            msgBody={message.msgBody}
            reply={message.reply}
            onDelete={props.onDeleteMessage}
          />
        ))}
      </ul>
    );
  }

  if (props.items.length === 0) {
    return (
      <div className="message-list center">
        <Card>
          <h2>Write the first message!</h2>
        </Card>
        <br />
        <NewMessage />
      </div>
    );
  }

  return (
    <div>
      <NewMessage onAdd={props.onAddMessage} />
      <ul className="message-list">
        {props.items.map((message) => (
          <MessageItem
            key={message.id}
            id={message.id}
            creatorId={message.creator}
            ownerId={message.owner}
            msgBody={message.msgBody}
            reply={message.reply}
            onDelete={props.onDeleteMessage}
          />
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
