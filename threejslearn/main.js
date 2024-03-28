import * as THREE from 'three';
// Scene
const scene = new THREE.Scene();

// creating a sphere
const geometry = new THREE.SphereGeometry( 3, 90, 90 ); 
const material = new THREE.MeshStandardMaterial({
  color:  '#ff0056',
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//light
const light = new THREE.PointLight(0xFFFFFF, 70, 100, 1.7 );
light.position.set(0, 10, 10) // x, y, z respectively
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(45, 800 / 600 , 0.1, 100) 
//the 0.1 and 100 is for the camera position at z if it goes past 0.1 or 100 the sphere will not show
camera.position.z = 20;
scene.add(camera)

//Renderer
const canvas = document.querySelector( '.webgl' );
const renderer = new  THREE.WebGLRenderer({canvas});
renderer.setSize(800, 600)
renderer.render(scene, camera)