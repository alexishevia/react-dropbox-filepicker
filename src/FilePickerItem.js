import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "semantic-ui-react";

const isFile = node => node.fileType === "file";
const isDir = node => node.fileType === "directory";

const styles = {
  icon: { float: "none", marginRight: "0.5em" }
};

const getIcon = node => {
  if (isFile(node)) return "file";
  if (isDir(node)) return "folder";
  return "report-problem";
};

const getName = node => {
  return isDir(node) ? `${node.name}/` : node.name;
};

export default function FilePickerItem({ node, onClick }) {
  return (
    <Menu.Item onClick={onClick}>
      <Icon name={getIcon(node)} style={styles.icon} /> {getName(node)}
    </Menu.Item>
  );
}

FilePickerItem.propTypes = {
  node: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fileType: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
