import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setEnableMobileMenu } from "../../reducers/ThemeOptions";

import {
	IoIosInformationCircleOutline,
	IoIosCog,
	IoMdImages,
} from "react-icons/io";

import Drawer from "@material-ui/core/Drawer";

import { GiAtom } from "react-icons/gi";

import { GoMailRead } from "react-icons/go";

import { SiGooglecalendar, SiShopify } from "react-icons/si";

import { GiCutDiamond } from "react-icons/gi";

import { CgNotes } from "react-icons/cg";

import { FaVideo } from "react-icons/fa";

import { Link } from "react-router-dom";

import { VscAccount } from "react-icons/vsc";

class Nav extends Component {
	state = {
		drawerState: { top: false, left: false, bottom: false, right: false },
	};

	toggleMobileSidebar = () => {
		setTimeout(() => {
			this.setState({ drawerState: { left: false } });
		}, 250);
	};

	render() {
		const toggleDrawer = (anchor, open) => (event) => {
			try {
				if (
					event.type === "keydown" &&
					(event.key === "Tab" || event.key === "Shift")
				) {
					return;
				}
			} catch (error) {}
			this.setState({ drawerState: { left: open } });
		};

		if (!window.toggleSidebar) {
			window.toggleSidebar = toggleDrawer("left", true);
		}
		const list = (anchor) => (
			<div
				onMouseLeave={() => {
					setTimeout(() => {
						this.setState({ drawerState: { left: false } });
					}, 250);
				}}
				style={{ width: "245x", height: "100%" }}
			>
				<img
					src="logo.webp"
					style={{
						width: "100%",
						maxWidth: "200px",
						height: "100px",
						objectFit: "scale-down",
					}}
				></img>
				<h5 className="app-sidebar__heading">Main</h5>
				<Link onClick={this.toggleMobileSidebar} to="/">
					<h4
						style={{
							backgroundColor:
								window.location.pathname === "/" ? "#00d2ff" : "transparent",
						}}
					>
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
					<h4
						style={{
							backgroundColor:
								window.location.pathname === "/calendar" ? "#00d2ff" : "transparent",
						}}
					>
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
					<h4
						style={{
							backgroundColor:
								window.location.pathname === "/blog" ? "#00d2ff" : "transparent",
						}}
					>
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
					<h4
						style={{
							backgroundColor:
								window.location.pathname === "/videos" ? "#00d2ff" : "transparent",
						}}
					>
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
					<h4
						style={{
							backgroundColor:
								window.location.pathname === "/gallery" ? "#00d2ff" : "transparent",
						}}
					>
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
				<h3 className="app-sidebar__heading">About</h3>
				<Link onClick={this.toggleMobileSidebar} to="/about">
					<h4
						style={{
							backgroundColor:
								window.location.pathname === "/about" ? "#00d2ff" : "transparent",
						}}
					>
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
					<h4
						style={{
							backgroundColor:
								window.location.pathname === "/contact" ? "#00d2ff" : "transparent",
						}}
					>
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
					<h4
						style={{
							backgroundColor:
								window.location.pathname === "/account" ? "#00d2ff" : "transparent",
						}}
					>
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
			</div>
		);

		let anchor = "left";
		return (
			<Fragment>
				<br />
				<h5 className="app-sidebar__heading">Main</h5>
				<>
					<Link onClick={this.toggleMobileSidebar} to="/">
						<h4
							style={{
								backgroundColor:
									window.location.pathname === "/" ? "#00d2ff" : "transparent",
							}}
						>
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
						<h4
							style={{
								backgroundColor:
									window.location.pathname === "/calendar" ? "#00d2ff" : "transparent",
							}}
						>
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
						<h4
							style={{
								backgroundColor:
									window.location.pathname === "/blog" ? "#00d2ff" : "transparent",
							}}
						>
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
						<h4
							style={{
								backgroundColor:
									window.location.pathname === "/videos" ? "#00d2ff" : "transparent",
							}}
						>
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
						<h4
							style={{
								backgroundColor:
									window.location.pathname === "/gallery" ? "#00d2ff" : "transparent",
							}}
						>
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
					<h3 className="app-sidebar__heading">About</h3>
					<Link onClick={this.toggleMobileSidebar} to="/about">
						<h4
							style={{
								backgroundColor:
									window.location.pathname === "/about" ? "#00d2ff" : "transparent",
							}}
						>
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
						<h4
							style={{
								backgroundColor:
									window.location.pathname === "/contact" ? "#00d2ff" : "transparent",
							}}
						>
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
					<h5 className="app-sidebar__heading">Login</h5>
					<Link onClick={this.toggleMobileSidebar} to="/account">
						<h4
							style={{
								backgroundColor:
									window.location.pathname === "/account" ? "#00d2ff" : "transparent",
							}}
						>
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
				</>
				<React.Fragment key={anchor}>
					<Drawer
						transitionDuration={500}
						style={{ width: "245x" }}
						anchor={anchor}
						open={this.state.drawerState[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
					</Drawer>
				</React.Fragment>
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
