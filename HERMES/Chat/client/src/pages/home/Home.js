import React, { Fragment, useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql, useSubscription } from "@apollo/client";

import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useMessageDispatch } from "../../context/message";

import Users from "./Users";
import Messages from "./Messages";
import logo from "../../../src/img/hermes1.png";
import logOut from "../../../src/img/logout.svg";
import "../../App.scss";

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

const NEW_REACTION = gql`
  subscription newReaction {
    newReaction {
      uuid
      content
      message {
        uuid
        from
        to
      }
    }
  }
`;

export default function Home({ history }) {
  const authDispatch = useAuthDispatch();
  const messageDispatch = useMessageDispatch();

  const { user } = useAuthState();

  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE
  );

  const { data: reactionData, error: reactionError } = useSubscription(
    NEW_REACTION
  );

  useEffect(() => {
    if (messageError) console.log(messageError);

    if (messageData) {
      const message = messageData.newMessage;
      const otherUser =
        user.username === message.to ? message.from : message.to;

      messageDispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: otherUser,
          message,
        },
      });
    }
  }, [messageError, messageData, messageDispatch, user]);

  useEffect(() => {
    if (reactionError) console.log(reactionError);

    if (reactionData) {
      const reaction = reactionData.newReaction;
      const otherUser =
        user.username === reaction.message.to
          ? reaction.message.from
          : reaction.message.to;

      messageDispatch({
        type: "ADD_REACTION",
        payload: {
          username: otherUser,
          reaction,
        },
      });
    }
  }, [reactionError, reactionData, messageDispatch, user]);

  const logout = () => {
    authDispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  return (
    <Fragment>
      <Row style={{ margin: "0 auto" }}>
        <Link to="/">
          <img className="logo-hermes" src={logo} alt="logo-hermes" />
        </Link>
        <Button
          variant="link"
          style={{
            fontWeight: 900,
            color: "#39414f",
          }}
          onClick={logout}
        >
          <div className="conteneur">
            <img className="logo-logout" src={logOut} alt="logout" />
            <div className="content">
              <p style={{ marginLeft: "17px" }}>Déconnexion</p>
            </div>
          </div>
        </Button>
      </Row>
      <Row className="bg-chat">
        <Users />
        <Messages />
      </Row>
    </Fragment>
  );
}
