import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// A reusable low-poly fish silhouette (forward = +Z). Body + dorsal fin + vertical tail fin.
let _fish = null;
export function getFishGeometry() {
  if (_fish) return _fish;

  // body: elongated teardrop along Z
  const body = new THREE.SphereGeometry(0.5, 14, 12);
  body.scale(0.42, 0.5, 1.15);

  // taper the nose slightly
  const nose = new THREE.SphereGeometry(0.5, 12, 10);
  nose.scale(0.3, 0.34, 0.5);
  nose.translate(0, 0, 0.95);

  // vertical caudal (tail) fin — flattened cone behind body
  const tail = new THREE.ConeGeometry(0.42, 0.75, 5);
  tail.rotateX(Math.PI / 2); // tip toward +Z, base -Z
  tail.rotateY(Math.PI); // flip so tip points back (-Z)
  tail.scale(0.16, 0.9, 1); // flatten in X → vertical fin
  tail.translate(0, 0, -1.15);

  // dorsal fin on top
  const dorsal = new THREE.ConeGeometry(0.22, 0.5, 4);
  dorsal.scale(0.12, 1, 0.7);
  dorsal.translate(0, 0.42, -0.1);

  _fish = mergeGeometries([body, nose, tail, dorsal]);
  _fish.computeVertexNormals();
  return _fish;
}
