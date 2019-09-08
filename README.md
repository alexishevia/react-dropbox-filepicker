# React Dropbox FilePicker

React Component to select a Dropbox file.

This project assumes:

1. You are building a React application.
2. You need your users to connect to Dropbox and select a file.
3. You need the user's accessToken to be able to modify the file.

## How to Use

1. `npm install --save react-dropbox-filepicker`
2. Include the provided `<FilePicker />` component in your app

IMPORTANT:  
In this initial version of react-dropbox-filepicker I'm using components from [Semantic UI React](https://react.semantic-ui.com/).  
In order for components to render correctly, you need to add a Theme as [described here](https://react.semantic-ui.com/usage#theme).

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
        onLogin={token => this.setState({ accessToken: token })}
        onLogout={() => this.setState({ accessToken: null, filepath: null })}
        onFilePick={path => this.setState({ filepath: path })}
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

### Running the project

The `example` folder has a simple app that uses the DropboxFilePicker and saves all data as local state.

To run the example:

1. Create a Dropbox App in the [App Console](https://www.dropbox.com/developers/apps). Take note of your app key.
2. Make sure to add `http://localhost:8080/` as a valid _Redirect URI_
3. Run the example app with:

```
npm install
APP_KEY='YOUR DROPBOX APP KEY' npm start
```

### Publish to npm

Run: `npm run build && npm publish`
