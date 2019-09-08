import React from 'react'
import ReactDOM from 'react-dom'
import FilePicker from "../src/index";

const APP_KEY = 'YOUR DROPBOX APP KEY';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      filepath: null,
    };
  }

  render() {
    const { accessToken, filepath } = this.state;
    return (
      <FilePicker
        appKey={APP_KEY}
        accessToken={accessToken}
        filepath={filepath}
        onLogin={accessToken => this.setState({ accessToken })}
        onLogout={() => this.setState({ accessToken: null, filepath: null })}
        onFilePick={filepath => this.setState({ filepath })}
        onError={error => console.error(error.message)}
      />
    )
  }
}

ReactDOM.render(<App />, document.body)
