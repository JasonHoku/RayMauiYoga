import * as THREE from "three/build/three";

import firebase from "firebase/app";

import "firebase/app";
import "firebase/firestore";

import { useEffect, useRef } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { GUI } from "three/examples//jsm/libs/dat.gui.module.js";

import { UnrealBloomPass } from "three/examples//jsm/postprocessing/UnrealBloomPass.js";

export default function MainThreeJS() {
	const roundInfo = useRef(false);

	useEffect(() => {
		roundInfo.current = {
			isRoundActive: false,
			roundNumber: 1,
			patternList: [],
			tilePatternDecided: false,
			clickData: { userPattern: [], userClickCount: 0 },
			username: "Anonymous",
		};

		setTimeout(() => {
			render();
		}, 100);

		let sceneLines;
		let note;
		let tempo;
		var text;
		// create web audio api context

		let shaderVertex = `
        varying vec2 vUv;

        void main() {

            vUv = uv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

        }`;

		let shaderFragment = `
uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;

varying vec2 vUv;

void main() {

    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

}`;

		const ENTIRE_SCENE = 0,
			BLOOM_SCENE = 1;

		const bloomLayer = new THREE.Layers();
		bloomLayer.set(BLOOM_SCENE);

		const params = {
			exposure: 1,
			bloomStrength: 5,
			bloomThreshold: 0,
			bloomRadius: 0,
			scene: "Scene with Glow",
		};

		const color = new THREE.Color();

		color.setHSL(0.41, 0.8, 0.08);

		const darkMaterial = new THREE.MeshBasicMaterial({ color: color });
		const materials = {};

		const renderer = new THREE.WebGLRenderer({ antialias: true });

		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.toneMapping = THREE.ReinhardToneMapping;
		renderer.setClearColor(0xfeffff, 1);
		document.querySelector("#bgEffectDOM").appendChild(renderer.domElement);

		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(
			40,
			window.innerWidth / window.innerHeight,
			1,
			200
		);

		camera.position.set(10, 0, window.innerWidth <= 800 ? 32 : 33);

		camera.lookAt(10, 0, -50);

		renderer.setClearColor(0xfeffff, 0.1);

		scene.add(new THREE.AmbientLight(0xfeffff, 2));

		const renderScene = new RenderPass(scene, camera);
		const bloomPass = new UnrealBloomPass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			1.5,
			0.4,
			0.85
		);
		bloomPass.threshold = params.bloomThreshold;
		bloomPass.strength = params.bloomStrength;
		bloomPass.radius = params.bloomRadius;

		const bloomComposer = new EffectComposer(renderer);
		bloomComposer.renderToScreen = false;
		bloomComposer.addPass(renderScene);
		bloomComposer.addPass(bloomPass);

		const finalPass = new ShaderPass(
			new THREE.ShaderMaterial({
				uniforms: {
					baseTexture: { value: null },
					bloomTexture: { value: bloomComposer.renderTarget2.texture },
				},
				vertexShader: shaderVertex,
				fragmentShader: shaderFragment,
				defines: {},
			}),
			"baseTexture"
		);
		finalPass.needsSwap = true;

		const finalComposer = new EffectComposer(renderer);
		finalComposer.addPass(renderScene);
		finalComposer.addPass(finalPass);

		setupScene();

		window.onresize = function () {
			const width = window.innerWidth;
			const height = window.innerHeight;

			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			renderer.setSize(width, height);

			bloomComposer.setSize(width, height);
			finalComposer.setSize(width, height);

			render();
		};

		////////////////////////////////
		function setupScene() {
			////////////////////////////////
			scene.traverse(disposeMaterial);
			scene.children.length = 0;

			const geometry = new THREE.BoxGeometry(Math.random() * 0.2 + 0.01, 100);
			for (let i = 0; i < 12; i++) {
				const color = new THREE.Color();
				color.setHSL(1, 0.1, 0.1);
				const material = new THREE.MeshBasicMaterial({ color: color });
				sceneLines = new THREE.Mesh(geometry, material);
				sceneLines.position.x = -25 + 1 * i + i * 5;
				sceneLines.position.y = -10;
				sceneLines.position.z = -50;
				if (i % 3 === 1) sceneLines.rotation.z = Math.random() * -50;
				sceneLines.layers.enable(0);
				scene.add(sceneLines);
			}

			// End Setup Now Start

			/////////////////////////////////////
		}

		function disposeMaterial(obj) {
			if (obj.material && obj.name !== "text") {
				obj.material.dispose();
			}
		}

		color.setHSL(0.41, 0.2, 0.1);
		scene.background = color;

		function render() {
			scene.traverse((el, index) => {
				if (el.type === "Mesh" && el.name !== "text") {
					if (Math.random() * 2 >= 1.5) {
						el.rotation.z += 0.0003;
					}
					color.setHSL(0.41 + Math.random() * 0.03, 0.2, 0.1);
				}
			});

			renderer.render(scene, camera);
			renderBloom(true);
			bloomComposer.renderToScreen = true;
			setTimeout(() => {
				render();
			}, 1000);
		}

		function renderBloom(mask) {
			if (mask === true) {
				scene.traverse(darkenNonBloomed);
				bloomComposer.render();
				scene.traverse(restoreMaterial);
			}
		}

		function darkenNonBloomed(obj) {
			if (
				obj.isMesh &&
				bloomLayer.test(obj.layers) === false &&
				obj.name !== "text"
			) {
				materials[obj.uuid] = obj.material;
				obj.material = darkMaterial;
			}
		}

		function restoreMaterial(obj) {
			if (materials[obj.uuid] && obj.name !== "text") {
				obj.material = materials[obj.uuid];
				delete materials[obj.uuid];
			}
		}
		render();
	});

	return false;
}
