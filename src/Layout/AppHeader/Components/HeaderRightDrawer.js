import React, { Fragment } from "react";


class HeaderRightDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      openLeft: false,
      openRight: false,
      relativeWidth: false,
      width: 450,
      noTouchOpen: false,
      noTouchClose: false,
    };
  }

  render() {
    const { openRight } = this.state;

    return (
      <Fragment>


      </Fragment>
    );
  }
}

export default HeaderRightDrawer;
