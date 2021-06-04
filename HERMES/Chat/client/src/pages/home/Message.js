import React, { useState } from "react";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/fr";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Button,
  Tooltip,
} from "@chakra-ui/react";

import { useAuthState } from "../../context/auth";
import { gql, useMutation } from "@apollo/client";

const reactions = ["❤️", "😆", "😯", "😢", "😡", "👍", "👎"];

const REACT_TO_MESSAGE = gql`
  mutation reactToMessage($uuid: String!, $content: String!) {
    reactToMessage(uuid: $uuid, content: $content) {
      uuid
    }
  }
`;

export default function Message({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.username;
  const received = !sent;
  const [showPopover, setShowPopover] = useState(false);
  const reactionIcons = [...new Set(message.reactions.map((r) => r.content))];

  const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
    onError: (err) => console.log(err),
    onCompleted: (data) => setShowPopover(false),
  });

  const react = (reaction) => {
    reactToMessage({ variables: { uuid: message.uuid, content: reaction } });
  };

  const initRef = React.useRef();

  const reactButton = (
    <>
      <Popover
        closeOnBlur={false}
        transition={false}
        rootClose
        placement="top"
        initialFocusRef={initRef}
      >
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <Button size="md" height="auto" width="10%">
                {" "}
                {isOpen ? "😊" : "😊"}
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverCloseButton />
                <PopoverBody>
                  <PopoverArrow />
                  {reactions.map((reaction) => (
                    <Button
                      variant="link"
                      className="react-icon-button"
                      key={reaction}
                      onClick={() => react(reaction)}
                    >
                      {reaction}
                    </Button>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    </>
  );

  return (
    <>
      <div
        className={classNames("d-flex my-3", {
          "ml-auto": sent,
          "mr-auto": received,
        })}
        data-aos={sent ? "fade-left" : "fade-right"}
      >
        {sent && reactButton}
        <Popover
          placement={!sent ? "right" : "left"}
          overlay={
            <Tooltip>
              {moment(message.createdAt)
                .locale("fr")
                .format("DD MMM YYYY à HH:mm")}
            </Tooltip>
          }
          transition={false}
        >
          <div
            className={classNames("py-2 px-3 rounded-pill position-relative", {
              "bg-primary": sent,
              "bg-secondary": received,
            })}
          >
            {message.reactions.length > 0 && (
              <div className="reactions-div bg-secondary p-1 rounded-pill">
                {reactionIcons} {message.reactions.length}
              </div>
            )}
            <p
              className={classNames({ "text-white": sent })}
              key={message.uuid}
            >
              {message.content}
            </p>
          </div>
        </Popover>
        {received && reactButton}
      </div>
    </>
  );
}
