import * as THREE from 'three';
import CameraControls from 'camera-controls';
import {
  AmbientLight,
  Clock,
  Color,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

export function initScene(CAMERAHEIGHT: number, LIGHTSTRENGTH: number) {
  CameraControls.install({ THREE });

  // Initialize some basic components of the app
  const canvas = document.querySelector('canvas')!;
  const renderer = new WebGLRenderer({ canvas });
  const clock = new Clock();
  const scene = new Scene();
  scene.background = new Color('hsl(197, 100%, 68%)'); // sky blue

  // Initialize camera
  const camera = new PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  const EPS = 1e-5;
  camera.position.set(0, CAMERAHEIGHT, EPS);

  // Initialize camera controls, https://github.com/yomotsu/camera-controls
  const cameraControls = new CameraControls(camera, renderer.domElement);
  cameraControls.azimuthRotateSpeed = -0.3; // negative value to invert rotation direction
  cameraControls.polarRotateSpeed = -0.3; // negative value to invert rotation direction
  cameraControls.truckSpeed = (1 / EPS) * 3;
  cameraControls.mouseButtons.wheel = CameraControls.ACTION.NONE;
  cameraControls.mouseButtons.right = CameraControls.ACTION.NONE;
  cameraControls.touches.two = CameraControls.ACTION.NONE;
  cameraControls.touches.three = CameraControls.ACTION.NONE;
  cameraControls.setTarget(0, CAMERAHEIGHT, -1); // Make camera look forward, instead of to origin (center of floor)
  cameraControls.saveState();

  // Initialize lighting
  const ambientLight = new AmbientLight(0xffffff, LIGHTSTRENGTH);
  scene.add(ambientLight);

  return { renderer, clock, scene, camera, cameraControls };
}
