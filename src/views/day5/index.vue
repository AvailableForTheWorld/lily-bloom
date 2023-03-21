<template>
  <div id="container"></div>
</template>

<script lang="ts" setup>
import {
  Raycaster,
  Vector2,
  DoubleSide,
  Color,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  DirectionalLight,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { onMounted, ref } from 'vue'
import {} from 'three'

const mainFunc = () => {
  const canvas = document.getElementById('c') as HTMLCanvasElement
  // create renderer
  const scene = new Scene()
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5)
  camera.position.z = 2
  const renderer = new WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)

  const box = new BoxGeometry(1, 1, 1)
  const material = new MeshPhongMaterial({ color: 0x8844aa })
  const model = new Mesh(box, material)
  model.position.x = 0
  scene.add(model)
  const color = 0xffffff
  const intensity = 1
  const light = new DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)
  const raycaster = new Raycaster()
  const mouse = new Vector2()

  const onMouseMove = (event: MouseEvent) => {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  window.addEventListener('mousemove', onMouseMove, false)

  function onClick(event: MouseEvent) {
    event.preventDefault()
    console.log('event', event)
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
      // The first intersected object is the closest one
      const object = intersects[0].object
      console.log('You clicked on', object)
    }
  }

  window.addEventListener('click', onClick, false)

  const onMouseClick = (event: MouseEvent) => {
    event.preventDefault()
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (intersects.length > 0) {
      intersects[0].object.material.color = new Color(0xff0000)
    }
  }
  function animate() {
    requestAnimationFrame(animate)

    // Update controls if using OrbitControls
    controls.update()

    renderer.render(scene, camera)
  }

  animate()
}
onMounted(() => {
  mainFunc()
})
</script>

<style lang="scss" scoped></style>
