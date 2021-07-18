import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'

const items = [
	{
		id: 1,
		src: " ./assets/images/homeslides/1 (1).jpg",
		altText: "Gallery Randomizer",
		caption: "",
		interval: "30",
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
			<div style={{ width: "250px", height: "150px", textAlign: "center" }}>
				<img style={{
					borderRadius: "50%",
					maxWidth: "100%",
					minWidth: "100%",
					minHeight: "100%",
					position: "absolute",
					left: "0",
					top: "0",
					zIndex: 3,
					maxHeight: "100%",
				}} src={props.item.src} alt="" />

				{/* Filler anit- FOIT */}
				<img style={{
					borderRadius: "50%",
					maxWidth: "100%",
					minWidth: "100%",
					position: "absolute",
					left: "0",
					top: "0",
					zIndex: 1,
					minHeight: "100%",
					maxHeight: "100%",
				}} src="./assets/images/homeslides/1 (4).jpg" alt="" />
			</div>
		</div>
	)
}
const CarouselDefault = () => <Carousel>
	{
		items.map((item, i) => <Item key={i} item={item} />)
	}
</Carousel>;

export default CarouselDefault;
