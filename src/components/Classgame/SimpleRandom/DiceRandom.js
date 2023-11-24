import React, { useEffect, useRef, useState } from "react";
import * as CANNON from "cannon-es";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import classes from "./SimpleRandom.module.css";

import Swal from "sweetalert2";

const DiceRandom = () => {
  const [diceNum, setDiceNum] = useState(1);
  const canvasRef = useRef(null);
  const scoreResultRef = useRef(null);
  const rollBtnRef = useRef(null);
  let diceArray = [];

  let renderer, scene, camera, diceMesh, physicsWorld;

  const params = {
    numberOfDice: 2,
    segments: 40,
    edgeRadius: 0.1,
    notchRadius: 0.15,
    notchDepth: 0.09,
  };

  initPhysics();

  useEffect(() => {
    window.addEventListener("resize", updateSceneSize);
    return () => window.removeEventListener("resize", updateSceneSize);
  }, []);

  useEffect(() => {
    initScene(diceNum);
  }, [diceNum]);

  /** 주사위 개수 변경함수 */
  const diceNumHandler = (pm) => {
    if (pm === "plus") {
      if (diceNum > 3) {
        Swal.fire(
          "개수 초과!",
          "주사위는 최대 4개까지 늘릴 수 있어요!",
          "warning"
        );
        return;
      }

      setDiceNum((prev) => prev + 1);
    } else {
      if (diceNum === 1) return;
      setDiceNum((prev) => prev - 1);
    }
  };

  function initScene(diceNum) {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: canvasRef?.current,
    });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, 1, 1, 120);
    camera.position.set(0, 2, 0).multiplyScalar(2);
    camera.lookAt(0, 0, 0);

    updateSceneSize();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const topLight = new THREE.PointLight(0xffffff, 0.5);
    topLight.position.set(10, 15, 3);
    topLight.castShadow = true;
    topLight.shadow.mapSize.width = 2048;
    topLight.shadow.mapSize.height = 2048;
    topLight.shadow.camera.near = 5;
    topLight.shadow.camera.far = 400;
    scene.add(topLight);

    createFloor();
    diceMesh = createDiceMesh();

    for (let i = 0; i < diceNum; i++) {
      diceArray?.push(createDice(diceMesh));
      addDiceEvents(diceArray?.[i]);
    }

    throwDice();
    render();
  }

  function initPhysics() {
    physicsWorld = new CANNON.World({
      allowSleep: true,
      gravity: new CANNON.Vec3(0, -60, 0),
    });
    physicsWorld.defaultContactMaterial.restitution = 0.3;
  }

  function createFloor() {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(450, 450),
      new THREE.ShadowMaterial({
        opacity: 0.15,
      })
    );
    floor.receiveShadow = true;
    floor.position.y = -6;
    floor.quaternion.setFromAxisAngle(
      new THREE.Vector3(-1, 0, 0),
      Math.PI * 0.5
    );
    scene.add(floor);

    const floorBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    floorBody.position.copy(floor.position);
    floorBody.quaternion.copy(floor.quaternion);
    physicsWorld.addBody(floorBody);
  }

  function createDiceMesh() {
    const boxMaterialOuter = new THREE.MeshStandardMaterial({
      color: 0xdedede,
      emissive: 0x080808,
      roughness: 0,
      metalness: 1,
    });
    const boxMaterialInner = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xf2f2f2,
      roughness: 0,
      metalness: 1,
      side: THREE.DoubleSide,
    });

    const diceMesh = new THREE.Group();
    const innerMesh = new THREE.Mesh(createInnerGeometry(), boxMaterialInner);
    const outerMesh = new THREE.Mesh(createBoxGeometry(), boxMaterialOuter);
    outerMesh.castShadow = true;
    diceMesh.add(innerMesh, outerMesh);

    return diceMesh;
  }

  function createDice(diceMesh) {
    const mesh = diceMesh.clone();
    scene.add(mesh);

    const body = new CANNON.Body({
      mass: 0.3,
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
      sleepTimeLimit: 0.02,
    });
    physicsWorld.addBody(body);

    return { mesh, body };
  }

  function createBoxGeometry() {
    let boxGeometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      params.segments,
      params.segments,
      params.segments
    );

    const positionAttr = boxGeometry.attributes.position;
    const subCubeHalfSize = 0.5 - params.edgeRadius;

    for (let i = 0; i < positionAttr.count; i++) {
      let position = new THREE.Vector3().fromBufferAttribute(positionAttr, i);

      const subCube = new THREE.Vector3(
        Math.sign(position.x),
        Math.sign(position.y),
        Math.sign(position.z)
      ).multiplyScalar(subCubeHalfSize);
      const addition = new THREE.Vector3().subVectors(position, subCube);

      if (
        Math.abs(position.x) > subCubeHalfSize &&
        Math.abs(position.y) > subCubeHalfSize &&
        Math.abs(position.z) > subCubeHalfSize
      ) {
        addition.normalize().multiplyScalar(params.edgeRadius);
        position = subCube.add(addition);
      } else if (
        Math.abs(position.x) > subCubeHalfSize &&
        Math.abs(position.y) > subCubeHalfSize
      ) {
        addition.z = 0;
        addition.normalize().multiplyScalar(params.edgeRadius);
        position.x = subCube.x + addition.x;
        position.y = subCube.y + addition.y;
      } else if (
        Math.abs(position.x) > subCubeHalfSize &&
        Math.abs(position.z) > subCubeHalfSize
      ) {
        addition.y = 0;
        addition.normalize().multiplyScalar(params.edgeRadius);
        position.x = subCube.x + addition.x;
        position.z = subCube.z + addition.z;
      } else if (
        Math.abs(position.y) > subCubeHalfSize &&
        Math.abs(position.z) > subCubeHalfSize
      ) {
        addition.x = 0;
        addition.normalize().multiplyScalar(params.edgeRadius);
        position.y = subCube.y + addition.y;
        position.z = subCube.z + addition.z;
      }

      const notchWave = (v) => {
        v = (1 / params.notchRadius) * v;
        v = Math.PI * Math.max(-1, Math.min(1, v));
        return params.notchDepth * (Math.cos(v) + 1);
      };
      const notch = (pos) => notchWave(pos[0]) * notchWave(pos[1]);

      const offset = 0.23;

      if (position.y === 0.5) {
        position.y -= notch([position.x, position.z]);
      } else if (position.x === 0.5) {
        position.x -= notch([position.y + offset, position.z + offset]);
        position.x -= notch([position.y - offset, position.z - offset]);
      } else if (position.z === 0.5) {
        position.z -= notch([position.x - offset, position.y + offset]);
        position.z -= notch([position.x, position.y]);
        position.z -= notch([position.x + offset, position.y - offset]);
      } else if (position.z === -0.5) {
        position.z += notch([position.x + offset, position.y + offset]);
        position.z += notch([position.x + offset, position.y - offset]);
        position.z += notch([position.x - offset, position.y + offset]);
        position.z += notch([position.x - offset, position.y - offset]);
      } else if (position.x === -0.5) {
        position.x += notch([position.y + offset, position.z + offset]);
        position.x += notch([position.y + offset, position.z - offset]);
        position.x += notch([position.y, position.z]);
        position.x += notch([position.y - offset, position.z + offset]);
        position.x += notch([position.y - offset, position.z - offset]);
      } else if (position.y === -0.5) {
        position.y += notch([position.x + offset, position.z + offset]);
        position.y += notch([position.x + offset, position.z]);
        position.y += notch([position.x + offset, position.z - offset]);
        position.y += notch([position.x - offset, position.z + offset]);
        position.y += notch([position.x - offset, position.z]);
        position.y += notch([position.x - offset, position.z - offset]);
      }

      positionAttr.setXYZ(i, position.x, position.y, position.z);
    }

    boxGeometry.deleteAttribute("normal");
    boxGeometry.deleteAttribute("uv");
    boxGeometry = BufferGeometryUtils.mergeVertices(boxGeometry);

    boxGeometry.computeVertexNormals();

    return boxGeometry;
  }

  function createInnerGeometry() {
    const baseGeometry = new THREE.PlaneGeometry(
      1 - 2 * params.edgeRadius,
      1 - 2 * params.edgeRadius
    );
    const offset = 0.48;
    return BufferGeometryUtils.mergeGeometries(
      [
        baseGeometry.clone().translate(0, 0, offset),
        baseGeometry.clone().translate(0, 0, -offset),
        baseGeometry
          .clone()
          .rotateX(0.5 * Math.PI)
          .translate(0, -offset, 0),
        baseGeometry
          .clone()
          .rotateX(0.5 * Math.PI)
          .translate(0, offset, 0),
        baseGeometry
          .clone()
          .rotateY(0.5 * Math.PI)
          .translate(-offset, 0, 0),
        baseGeometry
          .clone()
          .rotateY(0.5 * Math.PI)
          .translate(offset, 0, 0),
      ],
      false
    );
  }

  function addDiceEvents(dice) {
    dice.body.addEventListener("sleep", (e) => {
      dice.body.allowSleep = false;

      const euler = new CANNON.Vec3();
      e.target.quaternion.toEuler(euler);

      const eps = 0.1;
      let isZero = (angle) => Math.abs(angle) < eps;
      let isHalfPi = (angle) => Math.abs(angle - 0.5 * Math.PI) < eps;
      let isMinusHalfPi = (angle) => Math.abs(0.5 * Math.PI + angle) < eps;
      let isPiOrMinusPi = (angle) =>
        Math.abs(Math.PI - angle) < eps || Math.abs(Math.PI + angle) < eps;

      if (isZero(euler.z)) {
        if (isZero(euler.x)) {
          showRollResults(1);
        } else if (isHalfPi(euler.x)) {
          showRollResults(4);
        } else if (isMinusHalfPi(euler.x)) {
          showRollResults(3);
        } else if (isPiOrMinusPi(euler.x)) {
          showRollResults(6);
        } else {
          // landed on edge => wait to fall on side and fire the event again
          dice.body.allowSleep = true;
        }
      } else if (isHalfPi(euler.z)) {
        showRollResults(2);
      } else if (isMinusHalfPi(euler.z)) {
        showRollResults(5);
      } else {
        // landed on edge => wait to fall on side and fire the event again
        dice.body.allowSleep = true;
      }
    });
  }

  function showRollResults(score) {
    if (!scoreResultRef || !scoreResultRef.current) return;
    if (scoreResultRef.current?.innerHTML === "") {
      scoreResultRef.current.innerHTML += score;
    } else {
      scoreResultRef.current.innerHTML += " , " + score;
    }
  }

  function render() {
    physicsWorld.fixedStep();

    for (const dice of diceArray) {
      dice.mesh.position.copy(dice.body.position);
      dice.mesh.quaternion.copy(dice.body.quaternion);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  function updateSceneSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(700, 450);
  }

  function throwDice() {
    if (!scoreResultRef || !scoreResultRef.current) return;
    scoreResultRef.current.innerHTML = "";

    diceArray.forEach((d, dIdx) => {
      d.body.velocity.setZero();
      d.body.angularVelocity.setZero();

      d.body.position = new CANNON.Vec3(4, dIdx * 1.5, -0.5);
      d.mesh.position.copy(d.body.position);

      d.mesh.rotation.set(
        2 * Math.PI * Math.random(),
        0,
        2 * Math.PI * Math.random()
      );
      d.body.quaternion.copy(d.mesh.quaternion);

      const force = 1 + 2 * Math.random();
      d.body.applyImpulse(
        new CANNON.Vec3(-force, force, 0),
        new CANNON.Vec3(0, 0, 0.2)
      );

      d.body.allowSleep = true;
    });
  }

  return (
    <div className="container">
      <canvas ref={canvasRef} id="canvas"></canvas>
      <div ref={scoreResultRef} className={classes["score"]}>
        주사위: <span id="score-result"></span>
      </div>
      <div className="ui-controls">
        <div className={classes["diceNum-div"]}>
          <div className={classes["diceNum-div"]}>
            <button
              className={classes["diceAddBtn"]}
              id="minus-btn"
              onClick={() => diceNumHandler("minus")}
            >
              -
            </button>
            <span style={{ fontSize: "30px" }}>주사위 : {diceNum}개</span>
            <button
              className={classes["diceAddBtn"]}
              id="plus-btn"
              onClick={() => diceNumHandler("plus")}
            >
              +
            </button>
          </div>

          <button
            ref={rollBtnRef}
            className={classes["roll-btn"]}
            onClick={throwDice}
          >
            던져보자!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiceRandom;
