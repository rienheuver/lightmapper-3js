// Credit: https://discourse.threejs.org/t/most-simple-way-to-wait-loading-in-gltf-loader/13896/3
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

// this utility function allows you to use any three.js
// loader with promises and async/await
export function modelLoader(url: string): Promise<GLTF> {
  return new Promise((resolve, reject) => {
    loader.load(url, (data) => resolve(data), undefined, reject);
  });
}
