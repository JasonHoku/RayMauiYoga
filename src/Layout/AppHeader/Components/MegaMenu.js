import React, { Fragment } from "react";

import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Popover,
	Nav,
	NavLink,
	Col,
	Row,
	NavItem,
	UncontrolledButtonDropdown,
	Button,
} from "reactstrap";

import PerfectScrollbar from "react-perfect-scrollbar";

import bg2 from "../../../assets/utils/images/dropdown-header/abstract2.jpg";
import bg10 from "../../../assets/utils/images/dropdown-header/abstract10.jpg";
import "font-awesome/css/font-awesome.min.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MegaMenu extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false,
			popoverOpen: false,
			url: "",
		};
		this.updateState = this.updateState.bind(this);
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
			popoverOpen: !this.state.popoverOpen,
		});
	}
	updateState() {
		this.setState({
			url: window.location.hash,
		});
	}
	componentDidMount() {
		window.addEventListener("hashchange", this.updateState, false);
	}
	render() {
		return (
			<Fragment>
				<div>
					<b>RayMauiYoga</b> : {window.location.hash === "#/dashboards/home" ? "Home Page" : window.location.hash === "#/dashboards/calendar" ? "Calendar Page" : window.location.hash === "#/dashboards/blog" ? "Passages by Ray" : window.location.hash === "#/dashboards/videos" ? "Video Library" : window.location.hash === "#/dashboards/gallery" ? "Photo Gallery" : window.location.hash === "#/dashboards/about" ? "About Page" : window.location.hash === "#/dashboards/contact" ? "Contact Ray" :  window.location.hash === "#/dashboards/account" ? "Account Page" : 	"Unknown Page"}
				</div>
			</Fragment>
		);
	}
}

export default MegaMenu;
