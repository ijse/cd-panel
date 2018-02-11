<template>
  <section id="app">
    <NavBar></NavBar>
    <div class="container">
      <router-view></router-view>
    </div>
  </section>
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

