import React from "react";
import { UncontrolledCarousel } from "reactstrap";

//import image3 from "../../../../assets/images/thumbs/04.png";

const max = 13;

const items = []
for (let i = 1; i <= 10; i++) {



	items.push(

		{
			id: i,
			src:
				" /images/Pictures/GallerySlides/1 (" + i +
				").jpg",
			altText: "GalleryImage" + i,

			interval: "30",
		})

}

const CarouselDefault = () => <UncontrolledCarousel items={items} />;

export default CarouselDefault;
