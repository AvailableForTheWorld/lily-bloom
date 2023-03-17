<template>
  <canvas id="c"></canvas>
</template>

<script lang="ts" setup>
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  DirectionalLight,
  Color,
  DoubleSide,
} from 'three'
import { onMounted } from 'vue'
const mainFunc = () => {
  const canvas = document.getElementById('c') as HTMLCanvasElement
  // create renderer
  const renderer = new WebGLRenderer({ antialias: true, canvas })
  const fov = 40
  const aspect = 2 // 相机默认值
  const near = 0.1
  const far = 1000
  const camera = new PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 120
  const scene = new Scene()
  scene.background = new Color(0xaaaaaa)
  const objects: Mesh[] = []
  const spread = 15

  function addObject(x: number, y: number, obj: Mesh) {
    obj.position.x = x * spread
    obj.position.y = y * spread
    scene.add(obj)
    objects.push(obj)
  }

  function createMaterial() {
    const material = new MeshPhongMaterial({
      side: DoubleSide,
    })
    const hue = Math.random()
    const saturation = 1
    const luminance = 0.5
    material.color.setHSL(hue, saturation, luminance)
    return material
  }
  function addSolidGeometry(x, y, geometry) {
    const mesh = new Mesh(geometry, createMaterial())
    addObject(x, y, mesh)
  }
  const width = 8
  const height = 8
  const depth = 8
  addSolidGeometry(-2, -2, new BoxGeometry(width, height, depth))
  renderer.render(scene, camera)
}
onMounted(() => {
  mainFunc()
})
</script>

<style lang="scss" scoped></style>
