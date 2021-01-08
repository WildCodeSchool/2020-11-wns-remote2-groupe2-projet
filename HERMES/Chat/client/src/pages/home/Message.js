import React from "react";
import cx from "classnames";
import moment from "moment";
import "moment/locale/fr";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { useAuthState } from "../../context/auth";

export default function Message({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.username;
  const received = !sent;

  return (
    <OverlayTrigger
      placement={sent ? "right" : "left"}
      overlay={
        <Tooltip>
          {moment(message.createdAt).locale("fr").format("LLL")}
        </Tooltip>
      }
      transition={false}
    >
      <div
        className={cx("d-flex my-3", {
          "ml-auto": sent,
          "mr-auto": received,
        })}
      >
        <div
          className={cx("py-2 px-3 rounded-pill", {
            "bg-primary": sent,
            "bg-secondary": received,
          })}
        >
          <p className={cx({ "text-white": sent })} key={message.uuid}>
            {message.content}
          </p>
        </div>
      </div>
    </OverlayTrigger>
  );
}
