<template>
  <div id="three"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xeeeeee)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
const loader = new GLTFLoader()
renderer.setSize(window.innerWidth, window.innerHeight)
onMounted(() => {
  const three = document.getElementById('three') as HTMLElement
  three.appendChild(renderer.domElement)
})
const geometry = new THREE.CircleGeometry(2, 32)

loader.load(
  '/src/assets/model/test.glb',
  gltf => {
    console.log('gltf', gltf)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const model = gltf.scene
    function animate() {
      requestAnimationFrame(animate)

      model.rotation.x += 0.01
      model.rotation.y += 0.01
      model.rotation.z += 0.01

      renderer.render(scene, camera)
    }
    scene.add(gltf.scene)
    animate()
  },
  undefined,
  error => {
    console.error('loader ERROR: ', error)
  },
)
camera.position.z = 20
</script>

<style lang="scss" scoped></style>
