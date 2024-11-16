import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    1.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let car;
let mixer;
const loader = new GLTFLoader();
loader.load('/car.glb',
    function (gltf) {
        car = gltf.scene;
        scene.add(car);
        car.scale.set(15, 15, 15);
        mixer = new THREE.AnimationMixer(car);
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xfffafa, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(100, 100, 100);
scene.add(topLight);


const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02);
};
reRender3D();

let arrPositionModel = [
    {
        id: 'banner',
        position: {x: 0, y: -1, z: 0},
        rotation: {x: 0, y: 1.5, z: 0}
    },
    {
        id: "intro",
        position: { x: 1, y: -1, z: -20 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
        id: "description",
        position: { x: 1, y: -1, z: -20 },
        rotation: { x: 0.5, y: 0.5, z: 0 },
    },
    {
        id: "features",
        position: { x: 1, y: -1, z: -20 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
        id: "contact",
        position: { x: -0.8, y:-0.8, z: -2 },
        rotation: { x: 0, y: 0, z: 0 },
    },
];
/*************  ✨ Codeium Command ⭐  *************/
    /**
     * Change the position and rotation of the car based on the current section viewed.
/******  ad4eac69-4c9b-43d9-b27f-888f9114a0d2  *******/
const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(car.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(car.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        })
    }
}
window.addEventListener('scroll', () => {
    if (car) {
        modelMove();
    }
})
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})