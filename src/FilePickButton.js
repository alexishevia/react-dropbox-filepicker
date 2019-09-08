import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

export default function FilePickButton({ onClick }) {
  return (
    <Button style={{ marginRight: 20 }} onClick={onClick} primary>
      Select File
    </Button>
  );
}

FilePickButton.propTypes = {
  onClick: PropTypes.func.isRequired
};
