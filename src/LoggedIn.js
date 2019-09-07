import React from "react";
import PropTypes from "prop-types";
import FilePickButton from "./FilePickButton";
import LogoutButton from "./LogoutButton";

export default function LoggedIn({ openFilePicker, onLogout }) {
  return (
    <div>
      <p>
        You are connected to Dropbox, but you still need to select a file to use
        for sync.
      </p>
      <div
        style={{ flexDirection: "row", justifyContent: "center", padding: 10 }}
      >
        <FilePickButton onClick={openFilePicker} />
        <LogoutButton onClick={onLogout} />
      </div>
    </div>
  );
}

LoggedIn.propTypes = {
  openFilePicker: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};
