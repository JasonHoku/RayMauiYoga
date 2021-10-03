import React, { Fragment } from "react";
import { connect } from "react-redux";

import { CgMoreVerticalO } from "react-icons/cg";

import cx from "classnames";

import { FiMoreVertical } from "react-icons/fi";

import { IconContext } from "react-icons";

import { Button } from "reactstrap";

import {
	setEnableMobileMenu,
	setEnableMobileMenuSmall,
} from "../../reducers/ThemeOptions";

class AppMobileMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			mobile: false,
			activeSecondaryMenuMobile: false,
		};
		this.toggleMobileSidebar = this.toggleMobileSidebar.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	handleClickOutside(event) {
		if (String(event.target.className).includes("Burger")) {
		} else {
			this.setState({ active: false });
			this.toggleMobileSidebar();
			this.toggleMobileSmall();
		}
	}

	UNSAFE_componentWillMount() {
		window.addEventListener("hashchange", this.hashChangeEvent, true);
		document.addEventListener("click", this.handleClickOutside.bind(this), true);
	}
	componentWillUnmount() {
		document.removeEventListener(
			"click",
			this.handleClickOutside.bind(this),
			false
		);
	}

	toggleMobileSidebar = () => {
		let { enableMobileMenu, setEnableMobileMenu } = this.props;
		setEnableMobileMenu(!enableMobileMenu);
	};

	toggleMobileSmall = () => {
		let { enableMobileMenuSmall, setEnableMobileMenuSmall } = this.props;
		setEnableMobileMenuSmall(!enableMobileMenuSmall);
	};

	state = {
		openLeft: false,
		openRight: false,
		relativeWidth: false,
		width: 280,
		noTouchOpen: false,
		noTouchClose: false,
	};

	render() {
		return (
			<Fragment>
				<div className="app-header__mobile-menu">
					<div
						style={{ position: "relative", top: "-8px", right: "15px" }}
						onClick={this.toggleMobileSidebar}
					>
						<CgMoreVerticalO
							id="SidebarButton2"
							aria-label="Navigate With Sidebar Button"
							role="button"
							alt="Navigate With Sidebar Button"
							style={{
								position: "absolute",
								transition: "all 1s",
								top: window.innerWidth / window.innerHeight < 1 ? "0px" : "0px",
								left: window.innerWidth / window.innerHeight < 1 ? "5px" : "25px",
								zIndex: 1001,
								cursor: "pointer",
							}}
							onMouseOver={() => {
								document.getElementById("SidebarButton2").style.transform =
									"rotate(360deg) ";
							}}
							onMouseLeave={() => {
								document.getElementById("SidebarButton2").style.transform =
									"rotate(0deg)";
							}}
							size={50}
							color="#112200"
							onClick={() => {
								if (this.state.active) {
									this.setState({
										active: !this.state.active,
									});
								} else {
									this.setState({
										active: this.state.active,
									});
								}
								window.toggleSidebar();
							}}
						/>
					</div>
				</div>
				<div className="app-header__menu">
					<span onClick={this.toggleMobileSmall}>
						<Button
							size="sm"
							className={cx("btn-icon btn-icon-only MobileMenuID", {
								active: this.state.activeSecondaryMenuMobile,
							})}
							color="primary"
							onClick={() =>
								this.setState({
									activeSecondaryMenuMobile: !this.state.activeSecondaryMenuMobile,
								})
							}
						>
							<div id="MobileMenuID" className="btn-icon-wrapper">
								<IconContext.Provider
									value={{ color: "white", className: "MobileMenuID" }}
								>
									<FiMoreVertical
										style={{
											transform: "scale(2)",
											position: "relative",
											top: "-2px",
										}}
									/>
								</IconContext.Provider>{" "}
							</div>
						</Button>
					</span>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
	enableMobileMenu: state.ThemeOptions.enableMobileMenu,
	enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({
	setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
	setEnableMobileMenuSmall: (enable) =>
		dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppMobileMenu);
