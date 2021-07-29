import React, { Fragment, useEffect, useState } from "react";

export default function MegaMenu() {

	const [navVar, setNavVar] = useState(window.location.pathname);

	useEffect(() => {
		if (!window.navUpdater) {
			window.navUpdater = document.addEventListener("mousedown", () => {

				setTimeout(() => {
					setNavVar(window.location.pathname)
				}, 250)


			})

		}
	})


	return (
		<Fragment>
			<div>
				<b>RayMauiYoga</b> : {String(navVar === "/" ? "Home Page" : navVar === "/calendar" ? "Calendar Page" : navVar === "/blog" ? "Passages by Ray" : navVar === "/videos" ? "Video Library" : navVar === "/gallery" ? "Photo Gallery" : navVar === "/about" ? "About Page" : navVar === "/contact" ? "Contact Ray" : navVar === "/account" ? "Account Page" : "Unknown Page"
				)}
			</div>
		</Fragment>
	);
}
