import React from "react";
import PropTypes from "prop-types";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import FileSelected from "./FileSelected";
import FilePicker from "./FilePicker";

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderFilePicker: false
    };
  }

  renderContent() {
    const {
      appKey,
      accessToken,
      filepath,
      onLogin,
      onLogout,
      onFilePick,
      onError
    } = this.props;
    const { renderFilePicker } = this.state;

    const isLoggedIn = !!accessToken;
    const isFileSelected = !!(filepath && filepath.length);
    const openFilePicker = () => this.setState({ renderFilePicker: true });
    const closeFilePicker = () => this.setState({ renderFilePicker: false });

    if (accessToken && accessToken.length && renderFilePicker) {
      return (
        <FilePicker
          accessToken={accessToken}
          onFilePick={path => {
            closeFilePicker();
            onFilePick(path);
          }}
          onError={onError}
          onCancel={closeFilePicker}
        />
      );
    }
    if (isFileSelected) {
      return (
        <FileSelected
          filepath={filepath}
          openFilePicker={openFilePicker}
          onLogout={onLogout}
        />
      );
    }
    if (isLoggedIn) {
      return <LoggedIn openFilePicker={openFilePicker} onLogout={onLogout} />;
    }
    return <LoggedOut appKey={appKey} onLogin={onLogin} onError={onError} />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

Root.defaultProps = {
  accessToken: null,
  filepath: null,
  onError: () => false
};

Root.propTypes = {
  appKey: PropTypes.string.isRequired,
  accessToken: PropTypes.string,
  filepath: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onFilePick: PropTypes.func.isRequired,
  onError: PropTypes.func
};
