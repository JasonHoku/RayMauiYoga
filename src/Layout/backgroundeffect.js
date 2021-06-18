import * as THREE from "three/build/three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { Water } from "three/examples/jsm/objects/Water2.js";

import { FresnelShader } from "three/examples/jsm/shaders/FresnelShader.js";

let container;

let camera, scene, renderer;

const spheres = [];

let mouseX = 0,
	mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

setTimeout(() => {
	if (document.querySelector("#bgEffectDOM")) {
		init();
		animate();
	} else {
		setTimeout(() => {
			if (document.querySelector("#bgEffectDOM")) {
				init();
				animate();
			} else {
				setTimeout(() => {
					if (document.querySelector("#bgEffectDOM")) {
						init();
						animate();
					} else {
					}
				}, 250);
			}
		}, 250);
	}
}, 250);

function init() {
	container = document.createElement("div");
	document.querySelector("#bgEffectDOM").appendChild(container);

	camera = new THREE.PerspectiveCamera(
		60,
		window.innerWidth / window.innerHeight,
		1,
		100000
	);
	camera.position.z = 3200;

	//

	scene = new THREE.Scene();

	const urls = [
		"./images/bgjpg2-flipx.jpg",
		"./images/bgjpg2-flipx.jpg",
		"./images/bgjpg2-flipx.jpg",
		"./images/bgjpg2-flipx.jpg",
		"./images/bgjpg2-flipx.jpg",
		"./images/bgjpg2.jpg",
	];
	//

	const textureCube = new THREE.CubeTextureLoader().load(urls);

	scene.background = textureCube;

	const geometry = new THREE.SphereGeometry(100, 32, 16);

	const shader = FresnelShader;
	const uniforms = THREE.UniformsUtils.clone(shader.uniforms);

	uniforms["tCube"].value = textureCube;

	const material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader,
	});

	for (let i = 0; i < 150; i++) {
		const mesh = new THREE.Mesh(geometry, material);

		mesh.position.x = Math.random() * 10000 - 5000;
		mesh.position.y = Math.random() * 10000 - 5000;
		mesh.position.z = Math.random() * 10000 - 5000;

		mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

		scene.add(mesh);

		spheres.push(mesh);
	}

	var ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);

	var lights = [];
	lights[0] = new THREE.DirectionalLight(0xffffff, 1);
	lights[0].position.set(1, 0, 0);
	lights[1] = new THREE.DirectionalLight(0x11e8bb, 1);
	lights[1].position.set(0.75, 1, 0.5);
	lights[2] = new THREE.DirectionalLight(0x420089, 1);
	lights[2].position.set(-0.75, -1, 0.5);
	scene.add(lights[0]);
	scene.add(lights[1]);
	scene.add(lights[2]);
	//

	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	//

	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	const timer = 0.00001 * Date.now();
	camera.lookAt(scene.position);

	for (let i = 0, il = spheres.length; i < il; i++) {
		const sphere = spheres[i];

		sphere.position.x = 5000 * Math.cos(timer + i);
		sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
	}

	renderer.render(scene, camera);
}
