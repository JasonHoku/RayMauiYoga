import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'

const items = [
	{
		id: 1,
		src: " ./assets/images/homeslides/1 (1).jpg",
		altText: "Gallery Randomizer",
		caption: "",
		interval: "0",
	},
	{
		id: 1,
		src: " ./assets/images/homeslides/1 (2).jpg",
		altText: "Gallery Randomizer",
		caption: "",
		interval: "30",
	},
	{
		id: 1,
		src: " ./assets/images/homeslides/1 (3).jpg",
		altText: "Gallery Randomizer",
		caption: "",
		interval: "30",
	},
	{
		id: 1,
		src: " ./assets/images/homeslides/1 (4).jpg",
		altText: "Gallery Randomizer",
		caption: "",
		interval: "30",
	},
	{
		id: 1,
		src: " ./assets/images/homeslides/1 (5).jpg",
		altText: "Gallery Randomizer",
		caption: "",
		interval: "30",
	},
];
function Item(props) {
	return (
		<div ><h2>{props.item.name}</h2>
			<p>{props.item.description}</p>

		</div>
	)
}
const CarouselDefault = () => <Carousel>
	{
		items.map((item, i) => <Item key={i} item={item} />)
	}
</Carousel>;

export default CarouselDefault;
