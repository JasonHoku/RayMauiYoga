import React, { Fragment } from "react";
import { connect } from "react-redux";

import { CgMoreVerticalO } from "react-icons/cg";

import { Link } from "react-router-dom";

import {
	setEnableClosedSidebar,
	setEnableMobileMenu,
	setEnableMobileMenuSmall,
} from "../../reducers/ThemeOptions";

class HeaderLogo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			mobile: false,
			activeSecondaryMenuMobile: false,
		};
	}

	handleClickOutside(event) {
		if (String(event.target.className).includes("Burger")) {
		} else {
			if (this.state.active === true) {
				this.toggleEnableClosedSidebar();
			}
		}
		this.setState({ active: false });
	}

	componentDidMount() {
		setTimeout(() => {
			document.getElementById("headerLogoID").hidden = false;
			document.getElementById("headerLogoID").style.opacity = 1;
		}, 750);
		document.addEventListener("click", this.handleClickOutside.bind(this), true);
	}
	componentWillUnmount() {
		document.removeEventListener(
			"click",
			this.handleClickOutside.bind(this),
			false
		);
	}
	toggleEnableClosedSidebar = () => {
		let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
		setEnableClosedSidebar(!enableClosedSidebar);
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
				<div className="app-header__logo">
					<Link
						onClick={() => {
							if (caches) {
								caches.keys().then(function (names) {
									for (let name of names) caches.delete(name);
								});
							}
							if (window.location.pathname === "/") {
								window.location.reload();
							} else if (window.location.pathname === "/home") {
								window.location.reload();
							}
						}}
						style={{
							opacity: 0,
							transitionDuration: "1s",
							transition: "opacity 1s",
						}}
						id="headerLogoID"
						aria-label="Landing Page Link"
						to="/"
					>
						<div
							style={{
								position: "absolute",
								left: "50%",
								top: "5px",
								transform: "translateX(-100px)",
							}}
							className="logo-src"
						></div>
					</Link>
					<div className="header__pane ml-auto"></div>
				</div>
				<span style={{ position: "absolute", top: "-0px", left: "25px" }}>
					<CgMoreVerticalO
						id="SidebarButton"
						aria-label="Navigate With Sidebar Button"
						role="button"
						alt="Navigate With Sidebar Button"
						style={{
							position: "absolute",
							transition: "all 1s",
							top: window.innerWidth / window.innerHeight < 1 ? "2px" : "2px",
							left: window.innerWidth / window.innerHeight < 1.3 ? "-10px" : "-10px",
							zIndex: 1001,
							cursor: "pointer",
						}}
						onMouseOver={() => {
							document.getElementById("SidebarButton").style.transform =
								"rotate(360deg) ";
						}}
						onMouseLeave={() => {
							document.getElementById("SidebarButton").style.transform =
								"rotate(0deg)";
						}}
						size={55}
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
				</span>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
	enableMobileMenu: state.ThemeOptions.enableMobileMenu,
	enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({
	setEnableClosedSidebar: (enable) => dispatch(setEnableClosedSidebar(enable)),
	setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
	setEnableMobileMenuSmall: (enable) =>
		dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);
