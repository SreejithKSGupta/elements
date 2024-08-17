<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  
    export let modelUrl: string;
  
    let modelContainer: HTMLElement;
    let controls: OrbitControls;
  
    onMount(() => {
      if (modelUrl) {
        loadModel();
      }
    });
  
    function loadModel() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, modelContainer.clientWidth / modelContainer.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
      modelContainer.appendChild(renderer.domElement);
  
      const loader = new GLTFLoader();
      loader.load(modelUrl, (gltf) => {
        const model = gltf.scene;
  
        // Scale and position the model
        model.scale.set(4, 4, 4);
        model.position.set(0, 0, 0);
        scene.add(model);
  
        animate();
      });
  
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
  
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 10).normalize();
      scene.add(directionalLight);
  
      // Camera Position
      camera.position.set(0, 2, 5);
  
      // OrbitControls for rotation and zoom
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false;
  
      // Adjust these values for more zoom flexibility
      controls.minDistance = 1;  // Allow closer zoom
      controls.maxDistance = 50; // Allow farther zoom
      controls.maxPolarAngle = Math.PI / 2;
  
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
    }
  </script>
  
  <style>
    #modelContainer {
      width: 100%;
      height: 70vh;
      background-color: transparent;
    }
  </style>
  
  <div id="modelContainer" bind:this={modelContainer}></div>
  