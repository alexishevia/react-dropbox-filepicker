import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const warningMsg =
  "If you change the sync file, all local data will be discarded, and data from the new file will be loaded.\n\nAre you sure you want to change the sync file?";

export default function ChangeFileButton({ onClick }) {
  function onBtnPress() {
    if (window.confirm(warningMsg)) {
      onClick();
    }
  }
  return (
    <Button style={{ marginRight: 20 }} onClick={onBtnPress}>
      Change File
    </Button>
  );
}

ChangeFileButton.propTypes = {
  onClick: PropTypes.func.isRequired
};
