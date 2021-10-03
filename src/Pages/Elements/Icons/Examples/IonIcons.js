import React, { Fragment } from "react";
import {TransitionGroup} from "react-transition-group";
import { Row, Col, Card, CardBody, Container } from "reactstrap";

import * as Ionicons from "react-icons/io";
import {
  IoIosRefresh,
  IoIosPizza,
  IoIosHeart,
  IoIosInfinite,
  IoLogoNodejs,
} from "react-icons/io";
// import Ionicon from 'react-ionicons'

const iconData = [
  Ionicons["IoIosAddCircleOutline"],
  Ionicons["IoIosAddCircle"],
  Ionicons["IoIosAdd"],
  Ionicons["IoIosAirplane"],
  Ionicons["IoIosAlarm"],
  Ionicons["IoIosAlbums"],
  Ionicons["IoIosAlert"],
  Ionicons["IoIosAmericanFootball"],
  Ionicons["IoIosAnalytics"],
  Ionicons["IoIosAperture"],
  Ionicons["IoIosApps"],
  Ionicons["IoIosAppstore"],
  Ionicons["IoIosArchive"],
  Ionicons["IoIosArrowBack"],
  Ionicons["IoIosArrowDown"],
  Ionicons["IoIosArrowDropdownCircle"],
  Ionicons["IoIosArrowDropdown"],
  Ionicons["IoIosArrowDropleft"],
  Ionicons["IoIosArrowDroprightCircle"],
  Ionicons["IoIosArrowDropright"],
  Ionicons["IoIosArrowDropupCircle"],
  Ionicons["IoIosArrowDropup"],
  Ionicons["IoIosArrowForward"],
  Ionicons["IoIosArrowRoundBack"],
  Ionicons["IoIosArrowRoundDown"],
  Ionicons["IoIosArrowRoundForward"],
  Ionicons["IoIosArrowRoundUp"],
  Ionicons["IoIosArrowUp"],
  Ionicons["IoIosAt"],
  Ionicons["IoIosAttach"],
  Ionicons["IoIosBackspace"],
  Ionicons["IoIosBarcode"],
  Ionicons["IoIosBaseball"],
  Ionicons["IoIosBasket"],
  Ionicons["IoIosBasketball"],
  Ionicons["IoIosBatteryCharging"],
  Ionicons["IoIosBatteryDead"],
  Ionicons["IoIosBatteryFull"],
  Ionicons["IoIosBeaker"],
  Ionicons["IoIosBed"],
  Ionicons["IoIosBeer"],
  Ionicons["IoIosBicycle"],
  Ionicons["IoIosBluetooth"],
  Ionicons["IoIosBoat"],
  Ionicons["IoIosBody"],
  Ionicons["IoIosBonfire"],
  Ionicons["IoIosBook"],
  Ionicons["IoIosBookmark"],
  Ionicons["IoIosBookmarks"],
  Ionicons["IoIosBowtie"],
  Ionicons["IoIosBriefcase"],
  Ionicons["IoIosBrowsers"],
  Ionicons["IoIosBrush"],
  Ionicons["IoIosBug"],
  Ionicons["IoIosBuild"],
  Ionicons["IoIosBulb"],
  Ionicons["IoIosBus"],
  Ionicons["IoIosBusiness"],
  Ionicons["IoIosCafe"],
  Ionicons["IoIosCalculator"],
  Ionicons["IoIosCalendar"],
  Ionicons["IoIosCall"],
  Ionicons["IoIosCamera"],
  Ionicons["IoIosCar"],
  Ionicons["IoIosCard"],
  Ionicons["IoIosCart"],
  Ionicons["IoIosCash"],
  Ionicons["IoIosCellular"],
  Ionicons["IoIosChatboxes"],
  Ionicons["IoIosChatbubbles"],
  Ionicons["IoIosCheckboxOutline"],
  Ionicons["IoIosCheckbox"],
  Ionicons["IoIosCheckmarkCircleOutline"],
  Ionicons["IoIosCheckmarkCircle"],
  Ionicons["IoIosCheckmark"],
  Ionicons["IoIosClipboard"],
  Ionicons["IoIosClock"],
  Ionicons["IoIosCloseCircleOutline"],
  Ionicons["IoIosCloseCircle"],
  Ionicons["IoIosClose"],
  Ionicons["IoIosCloudCircle"],
  Ionicons["IoIosCloudDone"],
  Ionicons["IoIosCloudDownload"],
  Ionicons["IoIosCloudOutline"],
  Ionicons["IoIosCloudUpload"],
  Ionicons["IoIosCloud"],
  Ionicons["IoIosCloudyNight"],
  Ionicons["IoIosCloudy"],
  Ionicons["IoIosCodeDownload"],
  Ionicons["IoIosCodeWorking"],
  Ionicons["IoIosCode"],
  Ionicons["IoIosCog"],
  Ionicons["IoIosColorFill"],
  Ionicons["IoIosColorFilter"],
  Ionicons["IoIosColorPalette"],
  Ionicons["IoIosColorWand"],
  Ionicons["IoIosCompass"],
  Ionicons["IoIosConstruct"],
  Ionicons["IoIosContact"],
  Ionicons["IoIosContacts"],
  Ionicons["IoIosContract"],
  Ionicons["IoIosContrast"],
  Ionicons["IoIosCopy"],
  Ionicons["IoIosCreate"],
  Ionicons["IoIosCrop"],
  Ionicons["IoIosCube"],
  Ionicons["IoIosCut"],
  Ionicons["IoIosDesktop"],
  Ionicons["IoIosDisc"],
  Ionicons["IoIosDocument"],
  Ionicons["IoIosDoneAll"],
  Ionicons["IoIosDownload"],
  Ionicons["IoIosEasel"],
  Ionicons["IoIosEgg"],
  Ionicons["IoIosExit"],
  Ionicons["IoIosExpand"],
  Ionicons["IoIosEyeOff"],
  Ionicons["IoIosEye"],
  Ionicons["IoIosFastforward"],
  Ionicons["IoIosFemale"],
  Ionicons["IoIosFiling"],
  Ionicons["IoIosFilm"],
  Ionicons["IoIosFingerPrint"],
  Ionicons["IoIosFitness"],
  Ionicons["IoIosFlag"],
  Ionicons["IoIosFlame"],
  Ionicons["IoIosFlashOff"],
  Ionicons["IoIosFlash"],
  Ionicons["IoIosFlashlight"],
  Ionicons["IoIosFlask"],
  Ionicons["IoIosFlower"],
  Ionicons["IoIosFolderOpen"],
  Ionicons["IoIosFolder"],
  Ionicons["IoIosFootball"],
  Ionicons["IoIosFunnel"],
  Ionicons["IoIosGift"],
  Ionicons["IoIosGitBranch"],
  Ionicons["IoIosGitCommit"],
  Ionicons["IoIosGitCompare"],
  Ionicons["IoIosGitMerge"],
  Ionicons["IoIosGitNetwork"],
  Ionicons["IoIosGitPullRequest"],
  Ionicons["IoIosGlasses"],
  Ionicons["IoIosGlobe"],
  Ionicons["IoIosGrid"],
  Ionicons["IoIosHammer"],
  Ionicons["IoIosHand"],
  Ionicons["IoIosHappy"],
  Ionicons["IoIosHeadset"],
  Ionicons["IoIosHeartDislike"],
  Ionicons["IoIosHeartEmpty"],
  Ionicons["IoIosHeartHalf"],
  Ionicons["IoIosHeart"],
  Ionicons["IoIosHelpBuoy"],
  Ionicons["IoIosHelpCircleOutline"],
  Ionicons["IoIosHelpCircle"],
  Ionicons["IoIosHelp"],
  Ionicons["IoIosHome"],
  Ionicons["IoIosHourglass"],
  Ionicons["IoIosIceCream"],
  Ionicons["IoIosImage"],
  Ionicons["IoIosImages"],
  Ionicons["IoIosInfinite"],
  Ionicons["IoIosInformationCircleOutline"],
  Ionicons["IoIosInformationCircle"],
  Ionicons["IoIosInformation"],
  Ionicons["IoIosJet"],
  Ionicons["IoIosJournal"],
  Ionicons["IoIosKey"],
  Ionicons["IoIosKeypad"],
  Ionicons["IoIosLaptop"],
  Ionicons["IoIosLeaf"],
  Ionicons["IoIosLink"],
  Ionicons["IoIosListBox"],
  Ionicons["IoIosList"],
  Ionicons["IoIosLocate"],
  Ionicons["IoIosLock"],
  Ionicons["IoIosLogIn"],
  Ionicons["IoIosLogOut"],
  Ionicons["IoIosMagnet"],
  Ionicons["IoIosMailOpen"],
  Ionicons["IoIosMailUnread"],
  Ionicons["IoIosMail"],
  Ionicons["IoIosMale"],
  Ionicons["IoIosMan"],
  Ionicons["IoIosMap"],
  Ionicons["IoIosMedal"],
  Ionicons["IoIosMedical"],
  Ionicons["IoIosMedkit"],
  Ionicons["IoIosMegaphone"],
  Ionicons["IoIosMenu"],
  Ionicons["IoIosMicOff"],
  Ionicons["IoIosMic"],
  Ionicons["IoIosMicrophone"],
  Ionicons["IoIosMoon"],
  Ionicons["IoIosMore"],
  Ionicons["IoIosMove"],
  Ionicons["IoIosMusicalNote"],
  Ionicons["IoIosMusicalNotes"],
  Ionicons["IoIosNavigate"],
  Ionicons["IoIosNotificationsOff"],
  Ionicons["IoIosNotificationsOutline"],
  Ionicons["IoIosNotifications"],
  Ionicons["IoIosNuclear"],
  Ionicons["IoIosNutrition"],
  Ionicons["IoIosOpen"],
  Ionicons["IoIosOptions"],
  Ionicons["IoIosOutlet"],
  Ionicons["IoIosPaperPlane"],
  Ionicons["IoIosPaper"],
  Ionicons["IoIosPartlySunny"],
  Ionicons["IoIosPause"],
  Ionicons["IoIosPaw"],
  Ionicons["IoIosPeople"],
  Ionicons["IoIosPersonAdd"],
  Ionicons["IoIosPerson"],
  Ionicons["IoIosPhoneLandscape"],
  Ionicons["IoIosPhonePortrait"],
  Ionicons["IoIosPhotos"],
  Ionicons["IoIosPie"],
  Ionicons["IoIosPin"],
  Ionicons["IoIosPint"],
  Ionicons["IoIosPizza"],
  Ionicons["IoIosPlanet"],
  Ionicons["IoIosPlayCircle"],
  Ionicons["IoIosPlay"],
  Ionicons["IoIosPodium"],
  Ionicons["IoIosPower"],
  Ionicons["IoIosPricetag"],
  Ionicons["IoIosPricetags"],
  Ionicons["IoIosPrint"],
  Ionicons["IoIosPulse"],
  Ionicons["IoIosQrScanner"],
  Ionicons["IoIosQuote"],
  Ionicons["IoIosRadioButtonOff"],
  Ionicons["IoIosRadioButtonOn"],
  Ionicons["IoIosRadio"],
  Ionicons["IoIosRainy"],
  Ionicons["IoIosRecording"],
  Ionicons["IoIosRedo"],
  Ionicons["IoIosRefreshCircle"],
  Ionicons["IoIosRefresh"],
  Ionicons["IoIosRemoveCircleOutline"],
  Ionicons["IoIosRemoveCircle"],
  Ionicons["IoIosRemove"],
  Ionicons["IoIosReorder"],
  Ionicons["IoIosRepeat"],
  Ionicons["IoIosResize"],
  Ionicons["IoIosRestaurant"],
  Ionicons["IoIosReturnLeft"],
  Ionicons["IoIosReturnRight"],
  Ionicons["IoIosReverseCamera"],
  Ionicons["IoIosRewind"],
  Ionicons["IoIosRibbon"],
  Ionicons["IoIosRocket"],
  Ionicons["IoIosRose"],
  Ionicons["IoIosSad"],
  Ionicons["IoIosSave"],
  Ionicons["IoIosSchool"],
  Ionicons["IoIosSearch"],
  Ionicons["IoIosSend"],
  Ionicons["IoIosSettings"],
  Ionicons["IoIosShareAlt"],
  Ionicons["IoIosShare"],
  Ionicons["IoIosShirt"],
  Ionicons["IoIosShuffle"],
  Ionicons["IoIosSkipBackward"],
  Ionicons["IoIosSkipForward"],
  Ionicons["IoIosSnow"],
  Ionicons["IoIosSpeedometer"],
  Ionicons["IoIosSquareOutline"],
  Ionicons["IoIosSquare"],
  Ionicons["IoIosStarHalf"],
  Ionicons["IoIosStarOutline"],
  Ionicons["IoIosStar"],
  Ionicons["IoIosStats"],
  Ionicons["IoIosStopwatch"],
  Ionicons["IoIosSubway"],
  Ionicons["IoIosSunny"],
  Ionicons["IoIosSwap"],
  Ionicons["IoIosSwitch"],
  Ionicons["IoIosSync"],
  Ionicons["IoIosTabletLandscape"],
  Ionicons["IoIosTabletPortrait"],
  Ionicons["IoIosTennisball"],
  Ionicons["IoIosText"],
  Ionicons["IoIosThermometer"],
  Ionicons["IoIosThumbsDown"],
  Ionicons["IoIosThumbsUp"],
  Ionicons["IoIosThunderstorm"],
  Ionicons["IoIosTime"],
  Ionicons["IoIosTimer"],
  Ionicons["IoIosToday"],
  Ionicons["IoIosTrain"],
  Ionicons["IoIosTransgender"],
  Ionicons["IoIosTrash"],
  Ionicons["IoIosTrendingDown"],
  Ionicons["IoIosTrendingUp"],
  Ionicons["IoIosTrophy"],
  Ionicons["IoIosTv"],
  Ionicons["IoIosUmbrella"],
  Ionicons["IoIosUndo"],
  Ionicons["IoIosUnlock"],
  Ionicons["IoIosVideocam"],
  Ionicons["IoIosVolumeHigh"],
  Ionicons["IoIosVolumeLow"],
  Ionicons["IoIosVolumeMute"],
  Ionicons["IoIosVolumeOff"],
  Ionicons["IoIosWalk"],
  Ionicons["IoIosWallet"],
  Ionicons["IoIosWarning"],
  Ionicons["IoIosWatch"],
  Ionicons["IoIosWater"],
  Ionicons["IoIosWifi"],
  Ionicons["IoIosWine"],
  Ionicons["IoIosWoman"],
  Ionicons["IoLogoAndroid"],
  Ionicons["IoLogoAngular"],
  Ionicons["IoLogoApple"],
  Ionicons["IoLogoBitbucket"],
  Ionicons["IoLogoBitcoin"],
  Ionicons["IoLogoBuffer"],
  Ionicons["IoLogoChrome"],
  Ionicons["IoLogoClosedCaptioning"],
  Ionicons["IoLogoCodepen"],
  Ionicons["IoLogoCss3"],
  Ionicons["IoLogoDesignernews"],
  Ionicons["IoLogoDribbble"],
  Ionicons["IoLogoDropbox"],
  Ionicons["IoLogoEuro"],
  Ionicons["IoLogoFacebook"],
  Ionicons["IoLogoFlickr"],
  Ionicons["IoLogoFoursquare"],
  Ionicons["IoLogoFreebsdDevil"],
  Ionicons["IoLogoGameControllerA"],
  Ionicons["IoLogoGameControllerB"],
  Ionicons["IoLogoGithub"],
  Ionicons["IoLogoGoogle"],
  Ionicons["IoLogoGoogleplus"],
  Ionicons["IoLogoHackernews"],
  Ionicons["IoLogoHtml5"],
  Ionicons["IoLogoInstagram"],
  Ionicons["IoLogoIonic"],
  Ionicons["IoLogoIonitron"],
  Ionicons["IoLogoJavascript"],
  Ionicons["IoLogoLinkedin"],
  Ionicons["IoLogoMarkdown"],
  Ionicons["IoLogoModelS"],
  Ionicons["IoLogoNoSmoking"],
  Ionicons["IoLogoNodejs"],
  Ionicons["IoLogoNpm"],
  Ionicons["IoLogoOctocat"],
  Ionicons["IoLogoPinterest"],
  Ionicons["IoLogoPlaystation"],
  Ionicons["IoLogoPolymer"],
  Ionicons["IoLogoPython"],
  Ionicons["IoLogoReddit"],
  Ionicons["IoLogoRss"],
  Ionicons["IoLogoSass"],
  Ionicons["IoLogoSkype"],
  Ionicons["IoLogoSlack"],
  Ionicons["IoLogoSteam"],
  Ionicons["IoLogoTumblr"],
  Ionicons["IoLogoTux"],
  Ionicons["IoLogoTwitch"],
  Ionicons["IoLogoTwitter"],
  Ionicons["IoLogoUsd"],
  Ionicons["IoLogoVimeo"],
];
console.log("hello", iconData);
const IconData = [
  "IoIosAddCircleOutline",
  "IoIosAddCircle",
  "IoIosAdd",
  "IoIosAirplane",
  "IoIosAlarm",
  "IoIosAlbums",
  "IoIosAlert",
  "IoIosAmericanFootball",
  "IoIosAnalytics",
  "IoIosAperture",
  "IoIosApps",
  "IoIosAppstore",
  "IoIosArchive",
  "IoIosArrowBack",
  "IoIosArrowDown",
  "IoIosArrowDropdownCircle",
  "IoIosArrowDropdown",
  "IoIosArrowDropleft",
  "IoIosArrowDroprightCircle",
  "IoIosArrowDropright",
  "IoIosArrowDropupCircle",
  "IoIosArrowDropup",
  "IoIosArrowForward",
  "IoIosArrowRoundBack",
  "IoIosArrowRoundDown",
  "IoIosArrowRoundForward",
  "IoIosArrowRoundUp",
  "IoIosArrowUp",
  "IoIosAt",
  "IoIosAttach",
  "IoIosBackspace",
  "IoIosBarcode",
  "IoIosBaseball",
  "IoIosBasket",
  "IoIosBasketball",
  "IoIosBatteryCharging",
  "IoIosBatteryDead",
  "IoIosBatteryFull",
  "IoIosBeaker",
  "IoIosBed",
  "IoIosBeer",
  "IoIosBicycle",
  "IoIosBluetooth",
  "IoIosBoat",
  "IoIosBody",
  "IoIosBonfire",
  "IoIosBook",
  "IoIosBookmark",
  "IoIosBookmarks",
  "IoIosBowtie",
  "IoIosBriefcase",
  "IoIosBrowsers",
  "IoIosBrush",
  "IoIosBug",
  "IoIosBuild",
  "IoIosBulb",
  "IoIosBus",
  "IoIosBusiness",
  "IoIosCafe",
  "IoIosCalculator",
  "IoIosCalendar",
  "IoIosCall",
  "IoIosCamera",
  "IoIosCar",
  "IoIosCard",
  "IoIosCart",
  "IoIosCash",
  "IoIosCellular",
  "IoIosChatboxes",
  "IoIosChatbubbles",
  "IoIosCheckboxOutline",
  "IoIosCheckbox",
  "IoIosCheckmarkCircleOutline",
  "IoIosCheckmarkCircle",
  "IoIosCheckmark",
  "IoIosClipboard",
  "IoIosClock",
  "IoIosCloseCircleOutline",
  "IoIosCloseCircle",
  "IoIosClose",
  "IoIosCloudCircle",
  "IoIosCloudDone",
  "IoIosCloudDownload",
  "IoIosCloudOutline",
  "IoIosCloudUpload",
  "IoIosCloud",
  "IoIosCloudyNight",
  "IoIosCloudy",
  "IoIosCodeDownload",
  "IoIosCodeWorking",
  "IoIosCode",
  "IoIosCog",
  "IoIosColorFill",
  "IoIosColorFilter",
  "IoIosColorPalette",
  "IoIosColorWand",
  "IoIosCompass",
  "IoIosConstruct",
  "IoIosContact",
  "IoIosContacts",
  "IoIosContract",
  "IoIosContrast",
  "IoIosCopy",
  "IoIosCreate",
  "IoIosCrop",
  "IoIosCube",
  "IoIosCut",
  "IoIosDesktop",
  "IoIosDisc",
  "IoIosDocument",
  "IoIosDoneAll",
  "IoIosDownload",
  "IoIosEasel",
  "IoIosEgg",
  "IoIosExit",
  "IoIosExpand",
  "IoIosEyeOff",
  "IoIosEye",
  "IoIosFastforward",
  "IoIosFemale",
  "IoIosFiling",
  "IoIosFilm",
  "IoIosFingerPrint",
  "IoIosFitness",
  "IoIosFlag",
  "IoIosFlame",
  "IoIosFlashOff",
  "IoIosFlash",
  "IoIosFlashlight",
  "IoIosFlask",
  "IoIosFlower",
  "IoIosFolderOpen",
  "IoIosFolder",
  "IoIosFootball",
  "IoIosFunnel",
  "IoIosGift",
  "IoIosGitBranch",
  "IoIosGitCommit",
  "IoIosGitCompare",
  "IoIosGitMerge",
  "IoIosGitNetwork",
  "IoIosGitPullRequest",
  "IoIosGlasses",
  "IoIosGlobe",
  "IoIosGrid",
  "IoIosHammer",
  "IoIosHand",
  "IoIosHappy",
  "IoIosHeadset",
  "IoIosHeartDislike",
  "IoIosHeartEmpty",
  "IoIosHeartHalf",
  "IoIosHeart",
  "IoIosHelpBuoy",
  "IoIosHelpCircleOutline",
  "IoIosHelpCircle",
  "IoIosHelp",
  "IoIosHome",
  "IoIosHourglass",
  "IoIosIceCream",
  "IoIosImage",
  "IoIosImages",
  "IoIosInfinite",
  "IoIosInformationCircleOutline",
  "IoIosInformationCircle",
  "IoIosInformation",
  "IoIosJet",
  "IoIosJournal",
  "IoIosKey",
  "IoIosKeypad",
  "IoIosLaptop",
  "IoIosLeaf",
  "IoIosLink",
  "IoIosListBox",
  "IoIosList",
  "IoIosLocate",
  "IoIosLock",
  "IoIosLogIn",
  "IoIosLogOut",
  "IoIosMagnet",
  "IoIosMailOpen",
  "IoIosMailUnread",
  "IoIosMail",
  "IoIosMale",
  "IoIosMan",
  "IoIosMap",
  "IoIosMedal",
  "IoIosMedical",
  "IoIosMedkit",
  "IoIosMegaphone",
  "IoIosMenu",
  "IoIosMicOff",
  "IoIosMic",
  "IoIosMicrophone",
  "IoIosMoon",
  "IoIosMore",
  "IoIosMove",
  "IoIosMusicalNote",
  "IoIosMusicalNotes",
  "IoIosNavigate",
  "IoIosNotificationsOff",
  "IoIosNotificationsOutline",
  "IoIosNotifications",
  "IoIosNuclear",
  "IoIosNutrition",
  "IoIosOpen",
  "IoIosOptions",
  "IoIosOutlet",
  "IoIosPaperPlane",
  "IoIosPaper",
  "IoIosPartlySunny",
  "IoIosPause",
  "IoIosPaw",
  "IoIosPeople",
  "IoIosPersonAdd",
  "IoIosPerson",
  "IoIosPhoneLandscape",
  "IoIosPhonePortrait",
  "IoIosPhotos",
  "IoIosPie",
  "IoIosPin",
  "IoIosPint",
  "IoIosPizza",
  "IoIosPlanet",
  "IoIosPlayCircle",
  "IoIosPlay",
  "IoIosPodium",
  "IoIosPower",
  "IoIosPricetag",
  "IoIosPricetags",
  "IoIosPrint",
  "IoIosPulse",
  "IoIosQrScanner",
  "IoIosQuote",
  "IoIosRadioButtonOff",
  "IoIosRadioButtonOn",
  "IoIosRadio",
  "IoIosRainy",
  "IoIosRecording",
  "IoIosRedo",
  "IoIosRefreshCircle",
  "IoIosRefresh",
  "IoIosRemoveCircleOutline",
  "IoIosRemoveCircle",
  "IoIosRemove",
  "IoIosReorder",
  "IoIosRepeat",
  "IoIosResize",
  "IoIosRestaurant",
  "IoIosReturnLeft",
  "IoIosReturnRight",
  "IoIosReverseCamera",
  "IoIosRewind",
  "IoIosRibbon",
  "IoIosRocket",
  "IoIosRose",
  "IoIosSad",
  "IoIosSave",
  "IoIosSchool",
  "IoIosSearch",
  "IoIosSend",
  "IoIosSettings",
  "IoIosShareAlt",
  "IoIosShare",
  "IoIosShirt",
  "IoIosShuffle",
  "IoIosSkipBackward",
  "IoIosSkipForward",
  "IoIosSnow",
  "IoIosSpeedometer",
  "IoIosSquareOutline",
  "IoIosSquare",
  "IoIosStarHalf",
  "IoIosStarOutline",
  "IoIosStar",
  "IoIosStats",
  "IoIosStopwatch",
  "IoIosSubway",
  "IoIosSunny",
  "IoIosSwap",
  "IoIosSwitch",
  "IoIosSync",
  "IoIosTabletLandscape",
  "IoIosTabletPortrait",
  "IoIosTennisball",
  "IoIosText",
  "IoIosThermometer",
  "IoIosThumbsDown",
  "IoIosThumbsUp",
  "IoIosThunderstorm",
  "IoIosTime",
  "IoIosTimer",
  "IoIosToday",
  "IoIosTrain",
  "IoIosTransgender",
  "IoIosTrash",
  "IoIosTrendingDown",
  "IoIosTrendingUp",
  "IoIosTrophy",
  "IoIosTv",
  "IoIosUmbrella",
  "IoIosUndo",
  "IoIosUnlock",
  "IoIosVideocam",
  "IoIosVolumeHigh",
  "IoIosVolumeLow",
  "IoIosVolumeMute",
  "IoIosVolumeOff",
  "IoIosWalk",
  "IoIosWallet",
  "IoIosWarning",
  "IoIosWatch",
  "IoIosWater",
  "IoIosWifi",
  "IoIosWine",
  "IoIosWoman",
  "IoLogoAndroid",
  "IoLogoAngular",
  "IoLogoApple",
  "IoLogoBitbucket",
  "IoLogoBitcoin",
  "IoLogoBuffer",
  "IoLogoChrome",
  "IoLogoClosedCaptioning",
  "IoLogoCodepen",
  "IoLogoCss3",
  "IoLogoDesignernews",
  "IoLogoDribbble",
  "IoLogoDropbox",
  "IoLogoEuro",
  "IoLogoFacebook",
  "IoLogoFlickr",
  "IoLogoFoursquare",
  "IoLogoFreebsdDevil",
  "IoLogoGameControllerA",
  "IoLogoGameControllerB",
  "IoLogoGithub",
  "IoLogoGoogle",
  "IoLogoGoogleplus",
  "IoLogoHackernews",
  "IoLogoHtml5",
  "IoLogoInstagram",
  "IoLogoIonic",
  "IoLogoIonitron",
  "IoLogoJavascript",
  "IoLogoLinkedin",
  "IoLogoMarkdown",
  "IoLogoModelS",
  "IoLogoNoSmoking",
  "IoLogoNodejs",
  "IoLogoNpm",
  "IoLogoOctocat",
  "IoLogoPinterest",
  "IoLogoPlaystation",
  "IoLogoPolymer",
  "IoLogoPython",
  "IoLogoReddit",
  "IoLogoRss",
  "IoLogoSass",
  "IoLogoSkype",
  "IoLogoSlack",
  "IoLogoSteam",
  "IoLogoTumblr",
  "IoLogoTux",
  "IoLogoTwitch",
  "IoLogoTwitter",
  "IoLogoUsd",
  "IoLogoVimeo",
];

const IonIconsExample = () => (
  <Fragment>
    <TransitionGroup component="div" transitionName="TabsAnimation" transitionAppear={true}
      transitionAppearTimeout={0} transitionEnter={false} transitionLeave={false}>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                <Row>
                  <Col md="2">
                    <div className="font-icon-wrapper">
                      <IoIosRefresh fontSize="60px" color="#347eff" />
                      <p>rotate=true</p>
                    </div>
                  </Col>
                  <Col md="2">
                    <div className="font-icon-wrapper">
                      <IoIosPizza fontSize="60px" color="orange" />
                      <p>shake=true</p>
                    </div>
                  </Col>
                  <Col md="2">
                    <div className="font-icon-wrapper">
                      <IoIosHeart fontSize="60px" color="red" />
                      <p>beat=true</p>
                    </div>
                  </Col>
                  <Col md="2">
                    <div className="font-icon-wrapper">
                      <IoIosInfinite fontSize="60px" color="#333" />
                      <p>rotate=true</p>
                    </div>
                  </Col>
                  <Col md="2">
                    <div className="font-icon-wrapper">
                      <IoLogoNodejs icon="logo-nodejs" onClick={() => alert("Hi!")} fontSize="60px" color="#43853d"/>
                      <p>onClick event</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                <Row>
                  {iconData.map((IconName, index) => (
                    <Col md="2" key={IconName}>
                      <div className="font-icon-wrapper">
                        <IconName fontSize="35px" color="#333" />
                        <p>{IconData[index]}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </TransitionGroup>
  </Fragment>
);

export default IonIconsExample;
