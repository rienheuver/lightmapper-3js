import { Raycaster } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { GameControls } from './helpers/game-controls';
import { initScene } from './helpers/init-scene';
import { modelLoader } from './helpers/model-loader';
import { Room } from './things/room';

async function main() {
  const CAMERAHEIGHT = 2;
  const LIGHTSTRENGTH = 1;

  const roomModel = (await modelLoader('models/scene.glb')) as GLTF;
  const room = new Room(roomModel.scene);

  // Initialize app
  const { renderer, clock, scene, camera, cameraControls } = initScene(
    CAMERAHEIGHT,
    LIGHTSTRENGTH
  );

  // Initialize some variables we can reuse to save resources
  const raycaster = new Raycaster();

  // Add all elements to the scene
  const path = room.findObject('Floor')!;
  scene.add(roomModel.scene);

  // Initialize movement controls
  new GameControls(
    scene,
    camera,
    raycaster,
    path,
    cameraControls,
    CAMERAHEIGHT
  );

  requestAnimationFrame(render);

  function render() {
    const delta = clock.getDelta();
    // Update cameraControls, delta is needed for easing
    cameraControls.update(delta);

    // Check if window or screen (thus canvas) has been resized to adjust for that
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    // Re-render scene
    renderer.render(scene, camera);

    // Request new frame to render (thus keep render looping)
    requestAnimationFrame(render);
  }
}
document.addEventListener('DOMContentLoaded', function () {
  main().catch((error) => console.log(error));
});
