import React from "react";
import PropTypes from "prop-types";
import LoginButton from "./LoginButton";

export default function LoggedOut({ appKey, onLogin, onError }) {
  return (
    <div>
      <p>You can connect to Dropbox to backup/sync your transactions.</p>
      <div
        style={{ flexDirection: "row", justifyContent: "center", padding: 10 }}
      >
        <LoginButton appKey={appKey} onLogin={onLogin} onError={onError} />
      </div>
    </div>
  );
}

LoggedOut.defaultProps = {
  onError: () => false
};

LoggedOut.propTypes = {
  appKey: PropTypes.string.isRequired,
  onLogin: PropTypes.func.isRequired,
  onError: PropTypes.func
};
