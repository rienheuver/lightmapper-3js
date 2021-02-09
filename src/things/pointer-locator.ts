import {
  Camera,
  CircleGeometry,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Raycaster,
  Vector2,
} from 'three';

export class PointerLocator extends Mesh {
  private mouse: Vector2;

  constructor() {
    const geometry = new CircleGeometry(0.2, 32);
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
    });
    super(geometry, material);
    // Turn, so it's flat instead of upright
    this.rotation.x = Math.PI * 1.5;
    // Move it very slightly above the floor to prevent clipping
    this.position.set(0, 0.001, 0);
    this.mouse = new Vector2();
  }

  moveToEvent(
    event: PointerEvent,
    camera: Camera,
    raycaster: Raycaster,
    path: Object3D
  ): void {
    // Calculate position of mouse in the canvas
    this.mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(this.mouse, camera);
    // Get objects that intersect with casted ray
    const intersects = raycaster.intersectObject(path);
    if (intersects.length === 0) {
      return;
    }
    // Get location of intersection
    const newLocation = intersects[0].point;
    // Reset y-axis of location to slightly above floor to prevent rounding errors
    newLocation.y = 0.001;
    // Move locator to new location
    this.position.set(...newLocation.toArray());
  }

  update(): void {
    return;
  }

  activate(): void {
    return;
  }
}
