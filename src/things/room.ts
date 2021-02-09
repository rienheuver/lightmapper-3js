import { Object3D } from 'three';

export class Room extends Object3D {
  private model: Object3D;

  constructor(model: Object3D) {
    super();
    this.model = model;
    this.add(model);
  }

  findObject(name: string): Object3D | undefined {
    return this.model.children.find((child) => child.name === name);
  }

  update(): void {
    return;
  }

  activate(): void {
    return;
  }
}
