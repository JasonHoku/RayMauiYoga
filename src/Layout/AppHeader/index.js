import React, { Fragment } from "react";
import cx from "classnames";
import axios from "axios";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import SendToGoogleAnalytics from "./Components/analytics";

import HeaderLogo from "../AppLogo";

import {
	setEnableMobileMenu,
	setEnableMobileMenuSmall,
} from "../../reducers/ThemeOptions";
import SearchBox from "./Components/SearchBox";
import MegaMenu from "./Components/MegaMenu";
import UserBox from "./Components/UserBox";
import HeaderRightDrawer from "./Components/HeaderRightDrawer";
import { Button } from "reactstrap";

import Login from "../../Login/Login";

import HeaderDots from "./Components/HeaderDots";

import LoginRedirect from "../../Login/LoginRedirect";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			response: [],
		};
		this.onClickGA = this.onClickGA.bind(this);
	}

	closePopupOnClick(event) {
		let { enableMobileMenuSmall, setEnableMobileMenuSmall } = this.props;
		if (enableMobileMenuSmall) {
			console.log(String(event.target.id));
			console.log(String(event.target.className));
			if (this.state.mobileActive === true) {
				if (
					String(event.target.className) === "[object SVGAnimatedString]" ||
					String(event.target.id) === "MobileMenuID" ||
					String(event.target.id) === "btn-icon-wrapper" ||
					String(event.target.id) === "MobileMenuID" ||
					String(event.target.className) === "MobileMenuID" ||
					String(event.target.id) === "MobileMenuIcon"
				) {
					console.log("Yes");
				} else {
					console.log(String(event.target.id));
					this.toggleMobileSmall();
				}
			} else {
				this.setState({ mobileActive: false });
			}
			this.setState({ mobileActive: true });
		} else {
		}
	}

	toggleMobileSmall() {
		let { enableMobileMenuSmall, setEnableMobileMenuSmall } = this.props;
		setEnableMobileMenuSmall(!enableMobileMenuSmall);
		this.setState({ mobileActive: false });
	}
	componentDidMount() {
		document.addEventListener("click", this.closePopupOnClick.bind(this), false);
		document.addEventListener("click", this.onClickGA.bind(this), false);
		ReactGA.initialize("UA-102481694-8");
	}
	componentWillUnmount() {
		document.removeEventListener("click", this.onClickGA.bind(this), false);
	}

	onClickGA(event) {
		ReactGA.pageview(window.location.href + window.location);
		const domNode = findDOMNode(event.target);
		ReactGA.outboundLink(
			{
				label: "Clicked :" + domNode.outerHTML,
			},
			function () {
				try {
				} catch (error) {}
			}
		);
	}

	render() {
		let { headerBackgroundColor, enableMobileMenuSmall, enableHeaderShadow } =
			this.props;
		return (
			<Fragment>
				<CSSTransitionGroup
					component="div"
					className={cx("app-header", headerBackgroundColor, {
						"header-shadow": enableHeaderShadow,
					})}
					transitionName="HeaderAnimation"
					transitionAppear={true}
					transitionAppearTimeout={1500}
					transitionEnter={false}
					transitionLeave={false}
				>
					<SendToGoogleAnalytics />
					<HeaderLogo />
					<div
						className={cx("app-header__content", {
							"header-mobile-open": enableMobileMenuSmall,
						})}
					>
						<div className="app-header-left">
							<SearchBox />
							<MegaMenu />
						</div>
						<div className="app-header-right">
							<Router>
								<Switch>
									<Route
										path="/#/dashboards/home/connect/google/redirect"
										component={LoginRedirect}
									/>
									<Route exact path="/" component={Login} />
									<Login />
								</Switch>
							</Router>

							<UserBox />
							<HeaderRightDrawer />
						</div>
					</div>
				</CSSTransitionGroup>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
	closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
	headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
	enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({
	setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
	setEnableMobileMenuSmall: (enable) =>
		dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
