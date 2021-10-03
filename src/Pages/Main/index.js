import React, { Fragment } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { withRouter } from "react-router-dom";

import AppMain from "../../Layout/AppMain";

import AppAuth from "../../Layout/AppAuth/index.js";

import firebase from "firebase/app";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			closedSmallerSidebar: false,
		};
	}

	componentDidMount() {
		window.addEventListener("hashchange", this.toggle1, false);
		document.body.addEventListener("click", async function (e) {
			const cityRef = firebase
				.firestore()
				.collection("WebsiteStatistics")
				.doc("clicks");

			try {
				await firebase.firestore().runTransaction(async (t) => {
					const doc = await t.get(cityRef);

					const newCount = doc.data().value + 1;
					t.update(cityRef, { value: newCount });
					// console.log(newCount)
				});
			} catch (e) {
				console.log("Transaction failure:", e);
			}
		});
	}

	componentWillUnmount() {
		document.removeEventListener("hashchange", this.toggle1.bind(this), false);
	}
	toggle1() {
		if (String(window.location.hash).includes("/mediums")) {
		} else {
			window.scrollTo(0, 0);
		}
	}
	render() {
		let {
			colorScheme,
			enableFixedHeader,
			enableFixedSidebar,
			enableFixedFooter,
			enableClosedSidebar,
			closedSmallerSidebar,
			enableMobileMenu,
			enablePageTabsAlt,
		} = this.props;

		let width = window.innerWidth;

		window.onresize = function () {
			width = window.innerWidth;
		};

		return (
			<Fragment>
				<div
					style={{
						backgroundColor: "transparent",
						position: "sticky",
						margin: 0,
						padding: 0,
						width: "100%",
						height: "100vh",
					}}
					className={cx(
						"app-container app-theme-" + colorScheme,
						{ "fixed-header": enableFixedHeader },
						{ "fixed-sidebar": enableFixedSidebar || width < 1250 },
						{ "fixed-footer": enableFixedFooter },
						{ "closed-sidebar": enableClosedSidebar || width < 1250 },
						{
							"closed-sidebar-mobile": closedSmallerSidebar || width < 1250,
						},
						{ "sidebar-mobile-open": enableMobileMenu },
						{ "body-tabs-shadow-btn": enablePageTabsAlt }
					)}
				>
					<AppMain />
				</div>
			</Fragment>
		);
	}
}

const mapStateToProp = (state) => ({
	colorScheme: state.ThemeOptions.colorScheme,
	enableFixedHeader: state.ThemeOptions.enableFixedHeader,
	enableMobileMenu: state.ThemeOptions.enableMobileMenu,
	enableFixedFooter: state.ThemeOptions.enableFixedFooter,
	enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
	enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
	enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,
});

export default withRouter(connect(mapStateToProp)(Main));
