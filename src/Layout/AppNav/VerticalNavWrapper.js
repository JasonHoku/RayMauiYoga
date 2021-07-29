import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MetisMenu from "react-metismenu";
import { setEnableMobileMenu } from "../../reducers/ThemeOptions";
import { MainNav, AboutNav, AdminNav } from "./NavItems";

import { IoIosInformationCircleOutline, IoIosCog, IoMdImages } from "react-icons/io";

import { GiAtom } from "react-icons/gi";

import { GoMailRead } from "react-icons/go";

import { SiGooglecalendar, SiShopify } from "react-icons/si";

import { GiCutDiamond } from "react-icons/gi";

import { CgNotes } from "react-icons/cg";

import { FaVideo } from "react-icons/fa";

import { Link } from "react-router-dom";

import { VscAccount } from "react-icons/vsc";

class Nav extends Component {
	state = {};

	toggleMobileSidebar = () => {
		let { enableMobileMenu, setEnableMobileMenu } = this.props;
		setEnableMobileMenu(!enableMobileMenu);
	};

	render() {
		return (
			<Fragment>
				<h5 className="app-sidebar__heading">Index</h5>
				<Link onClick={this.toggleMobileSidebar} to="/">
					<h4>
						<button className="gradientBtn" style={{ width: "100%" }}>
							<span
								className="metismenu-item"
								style={{ position: "relative", top: "-3px", left: "-15px" }}
							>
								<svg className="spin2" height="25px" width="25px">
									<GiAtom />
								</svg>
								&nbsp;&nbsp;&nbsp;
							</span>
							<span
								className="sidebarLinks"
								style={{ position: "relative", top: "1px" }}
							>
								Home
							</span>
						</button>
					</h4>
				</Link>
				<Link onClick={this.toggleMobileSidebar} to="/calendar">
					<h4>
						<button className="gradientBtn" style={{ width: "100%" }}>
							<span
								className="metismenu-item"
								style={{ position: "relative", top: "-3px", left: "-15px" }}
							>
								<SiGooglecalendar />
								&nbsp;&nbsp;&nbsp;
							</span>
							<span
								className="sidebarLinks"
								style={{ position: "relative", top: "1px" }}
							>
								Schedule
							</span>
						</button>
					</h4>
				</Link>
				<Link onClick={this.toggleMobileSidebar} to="/blog">
					<h4>
						<button className="gradientBtn" style={{ width: "100%" }}>
							<span
								className="metismenu-item"
								style={{ position: "relative", top: "-3px", left: "-15px" }}
							>
								<CgNotes />
								&nbsp;&nbsp;&nbsp;
							</span>
							<span
								className="sidebarLinks"
								style={{ position: "relative", top: "1px" }}
							>
								Blog
							</span>
						</button>
					</h4>
				</Link>
				<Link onClick={this.toggleMobileSidebar} to="/videos">
					<h4>
						<button className="gradientBtn" style={{ width: "100%" }}>
							<span
								className="metismenu-item"
								style={{ position: "relative", top: "-3px", left: "-15px" }}
							>
								<FaVideo />
								&nbsp;&nbsp;&nbsp;
							</span>
							<span
								className="sidebarLinks"
								style={{ position: "relative", top: "1px" }}
							>
								Videos
							</span>
						</button>
					</h4>
				</Link>
				<Link onClick={this.toggleMobileSidebar} to="/gallery">
					<h4>
						<button className="gradientBtn" style={{ width: "100%" }}>
							<span
								className="metismenu-item"
								style={{ position: "relative", top: "-3px", left: "-15px" }}
							>
								<IoMdImages />
								&nbsp;&nbsp;&nbsp;
							</span>
							<span
								className="sidebarLinks"
								style={{ position: "relative", top: "1px" }}
							>
								Gallery
							</span>
						</button>
					</h4>
				</Link>
				<h3 className="app-sidebar__heading">Info</h3>
				<Link onClick={this.toggleMobileSidebar} to="/about">
					<h4>
						<button className="gradientBtn" style={{ width: "100%" }}>
							<span
								className="metismenu-item"
								style={{ position: "relative", top: "-3px", left: "-15px" }}
							>
								<IoIosInformationCircleOutline />
								&nbsp;&nbsp;&nbsp;
							</span>
							<span
								className="sidebarLinks"
								style={{ position: "relative", top: "1px" }}
							>
								Bio
							</span>
						</button>
					</h4>
				</Link>
				<Link onClick={this.toggleMobileSidebar} to="/contact">
					<h4>
						<button className="gradientBtn" style={{ width: "100%" }}>
							<span
								className="metismenu-item"
								style={{ position: "relative", top: "-3px", left: "-15px" }}
							>
								<GoMailRead />
								&nbsp;&nbsp;&nbsp;
							</span>
							<span
								className="sidebarLinks"
								style={{ position: "relative", top: "1px" }}
							>
								Contact
							</span>
						</button>
					</h4>
				</Link>{" "}
				<h5 className="app-sidebar__heading">Account</h5>
				<Link onClick={this.toggleMobileSidebar} to="/account">
					<h4>
						<button className="gradientBtn" style={{ width: "100%" }}>
							<span
								className="metismenu-item"
								style={{ position: "relative", top: "-3px", left: "-15px" }}
							>
								<VscAccount />
								&nbsp;&nbsp;&nbsp;
							</span>
							<span
								className="sidebarLinks"
								style={{ position: "relative", top: "1px" }}
							>
								Login
							</span>
						</button>
					</h4>
				</Link>
				{/*
        <h5 className="app-sidebar__heading">Forms</h5>
        <MetisMenu content={FormsNav} onSelected={this.toggleMobileSidebar} activeLinkFromLocation
          className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>

        <h5 className="app-sidebar__heading">Charts</h5>
        <MetisMenu content={ChartsNav} onSelected={this.toggleMobileSidebar} activeLinkFromLocation
          className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
   */}
			</Fragment>
		);
	}

	isPathActive(path) {
		return this.props.location.pathname.startsWith(path);
	}
}
const mapStateToProps = (state) => ({
	enableMobileMenu: state.ThemeOptions.enableMobileMenu,
});

const mapDispatchToProps = (dispatch) => ({
	setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
