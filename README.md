# React Dropbox FilePicker

React Component to select a Dropbox file.

This project assumes:

1. You are building a React application.
2. You need your users to connect to Dropbox and select a file.
3. You need the user's accessToken to be able to modify the file.

## How to Use

1. `npm install --save react-dropbox-filepicker`
2. Include the provided `<FilePicker />` component in your app

```
import FilePicker from "react-dropbox-filepicker";

const APP_KEY = 'YOUR DROPBOX APP KEY';

class YourComponent extends React.Component {
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
```

The FilePicker accepts the following arguments:

- `appKey`
  You can obtain your app key from the [Dropbox App console](https://www.dropbox.com/developers/apps).
- `accessToken`
  The user's Dropbox access token.  
   The `onLogin()` callback will provide you the accessToken value once the user logs in. Your app must persist this value and pass it back to the `<FilePicker />`.
- `filepath`
  Path to the Dropbox file that was picked by the user.  
   The `onFilePick()` callback will provide you the filepath once the user picks a file. Your app must persist this value and pass it back to the `<FilePicker />`.
- `onLogin()`
  Executed when the user connects to Dropbox.
- `onLogout()`
  Executed when the user disconnects from Dropbox.
- `onFilePick()`
  Executed when the user selects a file.
- `onError()`
  Executed when an unexpected error happens.

## Developer Notes

### Publish to npm
Run: `npm run build && npm publish`
