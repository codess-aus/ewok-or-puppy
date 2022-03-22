<template>
  <div id="app">
    <DetectImage msg="Has your puppy joined the Dark Side?"/>
  </div>
</template>

<script>
import DetectImage from './components/DetectImage.vue'

export default {
  name: 'App',
  components: {
    DetectImage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
