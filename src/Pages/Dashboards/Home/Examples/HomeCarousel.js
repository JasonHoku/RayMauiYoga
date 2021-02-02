import React from "react";
import { UncontrolledCarousel } from "reactstrap";

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

const CarouselDefault = () => <UncontrolledCarousel items={items} caption="" />;

export default CarouselDefault;
