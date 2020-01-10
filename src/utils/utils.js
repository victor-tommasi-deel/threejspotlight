import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  Mesh,
  SpotLight,
  BoxGeometry,
  MeshPhongMaterial,
  DoubleSide,
  PlaneGeometry
} from 'three';

const MeshPhong = (obj) => new MeshPhongMaterial(obj);

const createCube = (width, height, depth) => {
  const geometry = new BoxGeometry(width, height, depth);
  const material = MeshPhong({
    color: 0xdff913,
    shininess: 100,
    side: DoubleSide
  });
  const cube = new Mesh(geometry, material);
  cube.position.z = 0;
  cube.position.y = 0;
  cube.position.x = 5;
  return cube;
};

const createPlane = (width, height, depth) => {
  const geometry = new BoxGeometry(width, height, depth);
  const material = MeshPhong({ color: 0x693421, side: DoubleSide });
  const plane = new Mesh(geometry, material);
  plane.position.y = -1;
  return plane;
};

const addToScene = (array, scene) => {
  Object.entries(array).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });
};

const init = (objs, position) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.set(position.x, position.y, position.z);

  const spotLight = new SpotLight(0xffffff);
  spotLight.position.set(15, 20, 10);
  spotLight.angle = Math.PI / 20;
  spotLight.penumbra = 0.05;
  spotLight.decay = 2;
  spotLight.distance = 200;

  objs.push(spotLight);

  addToScene(objs, scene);

  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera, spotLight };
};

export { init, createCube, createPlane };
