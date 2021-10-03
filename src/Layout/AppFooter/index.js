import React, { Fragment } from "react";

class AppFooter extends React.Component {
	render() {
		return (
			<Fragment>
				<div className="app-footer">
					<div className="app-footer__inner">
						<div className="app-footer-left">
							<a style={{ position: "relative", top: "7px" }} href="./contact/">
								{" "}
								Contact Us
							</a>
						</div>
						<div className="app-footer-center"></div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default AppFooter;
