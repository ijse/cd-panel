<template>
  <div id="app">
    <NavBar></NavBar>
    <h1 class="title">{{ msg }}</h1>
  </div>
</template>

<script>
import NavBar from './Nav'
export default {
  name: 'App',
  components: {
    NavBar
  },
  data () {
    return {
      msg: 'hello world'
    }
  }
}
</script>

