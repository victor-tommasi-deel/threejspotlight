import React from 'react';
import {
  init,
  createCone,
  createCube,
  createPlane,
  createSphere
} from './utils/utils';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.01,
      renderer: null,
      scene: null,
      camera: null,
      cube: null,
      plane: null,
      spotLight: null
    };
  }

  componentDidMount = () => {
    const cube = createCube(5, 5, 5);
    const plane = createPlane(2000, 1, 2000);
    const start = init([cube, plane], { x: 0, y: 10, z: 20 });
    const { viewer } = this.refs;
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera, spotLight } = start;
    this.setState({
      renderer,
      scene,
      camera,
      spotLight,
      plane,
      cube
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const { ADD, scene, camera, renderer, cube, spotLight, plane } = this.state;
    if (
      scene !== null &&
      camera !== null &&
      renderer !== null &&
      cube !== null &&
      plane !== null &&
      spotLight !== null
    ) {
      spotLight.angle += ADD;
      if (spotLight.angle > Math.PI / 2 || spotLight.angle < 0) {
        this.setState({
          ADD: ADD * -1
        });
      }
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div ref="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
