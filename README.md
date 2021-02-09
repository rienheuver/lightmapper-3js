# Lightmapper - Threejs
This mini-repo let's you visualize blender-scenes exporter in GLTF-format.

The movement is very basic: drag to rotate camera, click to move to a new position. The moveable area is defined by an object in your scene called 'Floor'. Export your entire blender scene and put it in `src/models/scene.glb`.

There is an example file in the root of this repo called `scene.blend`. It's far form perfect, but shows the general idea.

## Getting started
First install yarn: yarnjs.com

Then run the following commands in a terminal
- `git clone git@github.com:rienheuver/escaperoom.git`
- `cd lightmapper-3js`
- `yarn`
- `yarn start`

It should now be running in your browser on localhost:8080