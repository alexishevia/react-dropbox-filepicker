import React from "react";
import PropTypes from "prop-types";
import ChangeFileButton from "./ChangeFileButton";
import LogoutButton from "./LogoutButton";

export default function FileSelected({ filepath, openFilePicker, onLogout }) {
  return (
    <div>
      <p>
        You are connected to Dropbox and syncing to file:
        <br />
        {filepath}
      </p>
      <div
        style={{ flexDirection: "row", justifyContent: "center", padding: 10 }}
      >
        <ChangeFileButton onClick={openFilePicker} />
        <LogoutButton onClick={onLogout} />
      </div>
    </div>
  );
}

FileSelected.propTypes = {
  filepath: PropTypes.string.isRequired,
  openFilePicker: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};
