<template>
  <canvas id="c"></canvas>
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

import { onMounted, ref } from 'vue'
import {} from 'three'

const mainFunc = () => {
  const canvas = document.getElementById('c') as HTMLCanvasElement
  // create renderer
  const renderer = new WebGLRenderer({ antialias: true, canvas })
  const fov = 75
  const aspect = 2 // 相机默认值
  const near = 0.1
  const far = 5
  const camera = new PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 2
  const scene = new Scene()
  // create geometry
  const boxWidth = 1
  const boxHeight = 1
  const boxDepth = 1
  const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth)
  function makeInstance(geometry: BoxGeometry, color: number, x: number) {
    const material = new MeshPhongMaterial({ color })
    const cube = new Mesh(geometry, material)
    scene.add(cube)
    cube.position.x = x
    return cube
  }
  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ]
  renderer.render(scene, camera)
  const color = 0xffffff
  const intensity = 1
  const light = new DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)
  const resizeRendererToDisplaySize = (renderer: WebGLRenderer) => {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = (canvas.clientWidth * pixelRatio) | 0
    const height = (canvas.clientHeight * pixelRatio) | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }
  const render = (time: number) => {
    time *= 0.001
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 1
      const rot = time * speed
      cube.rotation.x = rot
      cube.rotation.y = rot
    })
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  const raycaster = new Raycaster()
  const mouse = new Vector2()
  const onMouseMove = (event: MouseEvent) => {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }
  window.addEventListener('mousemove', onMouseMove, false)

  const update = () => {
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera)
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children)
    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.color.set(0xff0000)
    }
  }
  const animate = () => {
    requestAnimationFrame(animate)
    update()
    renderer.render(scene, camera)
  }
  animate()
}
onMounted(() => {
  mainFunc()
})
</script>

<style lang="scss" scoped></style>
