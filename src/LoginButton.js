import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const accessTokenRegex = "access_token=([^&]+)";

export default function DropboxLoginButton({ appKey, onLogin, onError }) {
  if (window.location.hash && window.location.hash.match(accessTokenRegex)) {
    const [, token] = window.location.hash.match(accessTokenRegex);
    onLogin(token);
    return <div>Login to Dropbox was successful.</div>;
  }

  const onClick = () => {
    const redirectURI = window.location.href;
    window.location.href = [
      "https://www.dropbox.com/1/oauth2/authorize",
      "?response_type=token",
      `&client_id=${appKey}`,
      `&redirect_uri=${redirectURI}`
    ].join("");
  };

  return <Button onClick={onClick}>Connect to Dropbox</Button>;
}

DropboxLoginButton.defaultProps = {
  onError: () => false
};

DropboxLoginButton.propTypes = {
  appKey: PropTypes.string.isRequired,
  onLogin: PropTypes.func.isRequired,
  onError: PropTypes.func
};
