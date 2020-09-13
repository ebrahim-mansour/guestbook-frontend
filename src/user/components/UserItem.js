import React from "react";
import { Link } from "react-router-dom";

import "./UserItem.css";
import Card from "../../shared/components/UIElements/Card.js";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/messages`}>
          <div className="user-item__image"></div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.ownedMessagesCount}{" "}
              {props.ownedMessagesCount === 1 ? "Message" : "Messages"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
