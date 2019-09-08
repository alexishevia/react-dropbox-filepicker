import React from "react";
import PropTypes from "prop-types";
import loadDir from "./api/loadDir";
import FilePickerItem from "./FilePickerItem";
import {
  Header,
  Segment,
  Button,
  Icon,
  Dimmer,
  Loader,
  Menu
} from "semantic-ui-react";

const isFile = node => node.fileType === "file";
const isDir = node => node.fileType === "directory";

const styles = {
  title: {
    display: "inline-block",
    verticalAlign: "middle",
    marginLeft: "3em"
  },
  contents: {
    minHeight: "20em"
  }
};

const initialState = {
  isLoading: false,
  hasError: false,
  path: "",
  contents: null,
  fileSelected: false
};

function getParentDir(path) {
  return path
    .split("/")
    .slice(0, -1)
    .join("/");
}

class FilePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.setState(initialState, () => this.load());
  }

  componentDidUpdate() {
    const { fileSelected } = this.state;
    if (!fileSelected) {
      this.load();
    }
  }

  onGoBack() {
    const { path } = this.state;
    const { onCancel } = this.props;
    if (path === "") {
      onCancel();
      return;
    }

    this.setState({
      ...initialState,
      path: getParentDir(path)
    });
  }

  openNode(node) {
    const { onFilePick, onError } = this.props;
    if (isDir(node)) {
      this.setState({ ...initialState, path: node.path });
      return;
    }
    if (isFile(node)) {
      this.setState({ fileSelected: true }, () => onFilePick(node.path));
      return;
    }
    onError(new Error(`Filepicker: Unkown node type: ${node.type}`));
  }

  load() {
    const { accessToken, onError } = this.props;
    const { isLoading, hasError, path, contents } = this.state;
    if (isLoading || hasError || contents !== null) return;
    this.setState({ isLoading: true, hasError: false });
    loadDir({ accessToken, path })
      .then((result) => {
        this.setState({ isLoading: false, contents: result.contents });
      })
      .catch((err) => {
        onError(err);
        this.setState({ isLoading: false, hasError: true });
      });
  }

  renderHeader() {
    const { path } = this.state;
    return (
      <div>
        <Button icon onClick={() => this.onGoBack()}>
          <Icon name="angle left" />
        </Button>
        <div style={styles.title}>
          <Header size="small" style={{ marginBottom: 0 }}>
            Select File
          </Header>
          <span>{path}</span>
        </div>
      </div>
    );
  }

  renderLoading() {
    const { isLoading } = this.state;
    return (
      <Dimmer active={isLoading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }

  renderContents() {
    const { contents } = this.state;

    if (!contents) {
      return (
        <Segment attached="bottom" style={styles.contents}>
          {this.renderLoading()}
        </Segment>
      );
    }

    if (!contents.length) {
      return (
        <Segment attached="bottom" style={styles.contents}>
          {this.renderLoading()}
          <p>The directory is empty.</p>
        </Segment>
      );
    }

    return (
      <Menu fluid vertical attached="bottom">
        {contents.map(item => (
          <FilePickerItem
            key={item.path}
            node={item}
            onClick={() => this.openNode(item)}
          />
        ))}
      </Menu>
    );
  }

  render() {
    return (
      <div>
        <Segment attached="top">{this.renderHeader()}</Segment>
        {this.renderContents()}
      </div>
    );
  }
}

FilePicker.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  onFilePick: PropTypes.func.isRequired
};

export default FilePicker;
