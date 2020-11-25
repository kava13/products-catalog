import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index.js";
import {
  getSectionsBydId,
  sectionsSelector,
  productsSelector,
} from "../selectors/index.js";

import { TreeView, TreeItem } from "@material-ui/lab";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import "../css/sections.css";

const mapStateToProps = (state) => {
  const props = {
    sectionsById: getSectionsBydId(state),
    sections: sectionsSelector(state),
  };
  return props;
};

const actionCreators = {
  setFilterId: actions.setFilterId,
};

class Sections extends React.Component {
  handleSetFilterId = (id) => {
    const { setFilterId } = this.props;
    setFilterId({ id });
  };

  renderNode = (section) => {
    const { sectionsById } = this.props;

    return (
      <TreeItem
        key={section.id}
        nodeId={section.id}
        label={section.name}
        onLabelClick={
          section.parent ? () => this.handleSetFilterId(section.id) : null
        }
      >
        {section.parts &&
          section.parts.map((partId) => {
            return this.renderNode(sectionsById[partId]);
          })}
      </TreeItem>
    );
  };

  render() {
    const { sections } = this.props;
    const rootNodes = sections.filter((item) => item.parts);

    return (
      <div>
        <TreeView
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
        >
          {rootNodes &&
            rootNodes.map((section) => {
              return this.renderNode(section);
            })}
        </TreeView>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Sections);
