import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const warningMsg = "Are you sure you want to disconnect from Dropbox?";

export default function LogoutButton({ onClick }) {
  function onBtnPress() {
    if (window.confirm(warningMsg)) {
      onClick();
    }
  }
  return (
    <Button secondary onClick={onBtnPress}>
      Disconnect
    </Button>
  );
}

LogoutButton.propTypes = {
  onClick: PropTypes.func.isRequired
};
