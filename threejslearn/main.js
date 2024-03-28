import * as THREE from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// Scene
const scene = new THREE.Scene();

// creating a sphere
const geometry = new THREE.SphereGeometry( 3, 90, 90 ); 
const material = new THREE.MeshStandardMaterial({
  color:  '#ff0056',
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//Sizes of the screen
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//light
const light = new THREE.PointLight(0xFFFFFF, 70, 100, 1.7 );
light.position.set(0, 10, 10) // x, y, z respectively
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height , 0.1, 100) 
//the 0.1 and 100 is for the camera position at z if it goes past 0.1 or 100 the sphere will not show
camera.position.z = 20;
scene.add(camera)

//Renderer
const canvas = document.querySelector( '.webgl' );
const renderer = new  THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//controls for  moving around the sphere
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

//Resizing
window.addEventListener('resize', () =>{
  // Update sizes
  console.log(window.innerWidth, window.innerHeight)
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update camera
  //make sure to update the camera for it to be in sync
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix(); // helps with the aspect ratio of the sphere
  renderer.setSize(sizes.width, sizes.height)
})

// rerender the canvas so that the sphere is always kept updated as it changes the screen ratio
const loop = () => {
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop()