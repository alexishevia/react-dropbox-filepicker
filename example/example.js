import React from "react";
import ReactDOM from "react-dom";
import FilePicker from "../src/index";

// APP_KEY is defined in webpack.config.js
if (!APP_KEY) {
  throw new Error("APP_KEY must be defined for the example to work.");
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      filepath: null
    };
  }

  render() {
    const { accessToken, filepath } = this.state;
    return (
      <FilePicker
        appKey={APP_KEY}
        accessToken={accessToken}
        filepath={filepath}
        onLogin={token => this.setState({ accessToken: token })}
        onLogout={() => this.setState({ accessToken: null, filepath: null })}
        onFilePick={path => this.setState({ filepath: path })}
        onError={error => console.error(error.message)}
      />
    );
  }
}

ReactDOM.render(<App />, global.document.body);
