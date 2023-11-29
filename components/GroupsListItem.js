import React from "react";
import Link from "next/link";
import { formatDate } from "../helpers/helper";

class GroupsListItem extends React.Component {
  render() {
    const { group } = this.props;
    return (
      <div className="group-panel">
        <h3 className="group-panel-title">
          <Link href={"/group/" + group.id}>{group.name}</Link>
        </h3>
        <p className="sub-title-green">{group.id}</p>
        <p className="sub-title">Balance = {group.balance} wei</p>
        <br />
        <span className="main-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis dignissim diam, et
          pretium ligula suscipit eget. Vivamus finibus venenatis massa, ac eleifend lorem pharetra
          consectetur.{" "}
        </span>
      </div>
    );
  }
}

export default GroupsListItem;
