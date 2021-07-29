import React, { Fragment } from "react";
import { connect } from "react-redux";

import { Slider } from "react-burgers";

import AppMobileMenu from "../AppMobileMenu";

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

	toggleEnableClosedSidebar = () => {
		let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
		setEnableClosedSidebar(!enableClosedSidebar);
	};
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
		document.addEventListener(
			"click",
			this.handleClickOutside.bind(this),
			true
		);
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
					<a href="/">
						<div className="logo-src" />
					</a>
					<div className="header__pane ml-auto">
						<div onClick={this.toggleEnableClosedSidebar}>
							<Slider id="SidebarButton"
								aria-label="SidebarButton"
								role="button"
								aria-pressed="false"
								style={{ position: "absolute", top: "-5px", left: "10px" }}
								width={35}
								lineHeight={9}
								lineSpacing={4}
								color="#253030"
								active={this.state.active}
								onClick={() => this.setState({ active: !this.state.active })}
							/>
						</div>
					</div>
				</div>
				<AppMobileMenu />
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
