import CameraControls from 'camera-controls';
import { Camera, Object3D, Raycaster, Scene, Vector2 } from 'three';

import { PointerLocator } from '../things/pointer-locator';

export class GameControls {
  // Reuseable vector to save resources
  private mouse: Vector2;
  // Indicator for where you are pointing on the floor for movement
  private pointerLocator: PointerLocator;
  // timer for clicking and releasing the mouse
  private mouseTimer = 0;

  constructor(
    scene: Scene,
    camera: Camera,
    raycaster: Raycaster,
    path: Object3D,
    cameraControls: CameraControls,
    CAMERAHEIGHT: number
  ) {
    this.mouse = new Vector2();
    this.pointerLocator = new PointerLocator();
    scene.add(this.pointerLocator);

    document.addEventListener('pointerdown', () => {
      this.mouseTimer = new Date().getTime();
    });

    document.addEventListener('pointermove', (event) => {
      this.pointerLocator.moveToEvent(event, camera, raycaster, path);
    });

    document.addEventListener('pointerup', (event) => {
      // If the mouse was pressed and released shortly after, so a genuine click and no drag:
      if (new Date().getTime() - this.mouseTimer < 150) {
        // Calculate position of mouse in the canvas
        this.mouse.set(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(this.mouse, camera);
        // Get objects that intersect with casted ray
        const intersects = raycaster.intersectObject(path, true);
        if (intersects.length === 0) {
          return;
        }
        // Get location of intersection
        const newLocation = intersects[0].point;
        // Reset y-axis of location to camera height to prevent rounding errors and gradually moving camera up/down
        newLocation.y = CAMERAHEIGHT;
        // Move camera to new location with easing
        cameraControls.moveTo(...newLocation.toArray(), true);
      }
      this.mouseTimer = 0;
    });
  }
}
