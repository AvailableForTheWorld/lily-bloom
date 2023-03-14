<template>
  <canvas id="c"></canvas>
</template>

<script lang="ts" setup>
import { WebGLRenderer } from 'three'
const mainFunc = () => {
  const canvas = document.getElementById('c') as HTMLCanvasElement
  // create renderer
  const renderer = new WebGLRenderer({ antialias: true, canvas })
}
</script>

<style lang="scss" scoped></style>
