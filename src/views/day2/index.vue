<template>
  <canvas id="c"></canvas>
</template>

<script lang="ts" setup>
import { WebGLRenderer, PerspectiveCamera, Scene, BoxGeometry, MeshPhongMaterial, Mesh, DirectionalLight } from 'three'
import { onMounted } from 'vue'
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
}
onMounted(() => {
  mainFunc()
})
</script>

<style lang="scss" scoped></style>
