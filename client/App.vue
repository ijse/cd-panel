<template>
  <section class="app">
    <NavBar></NavBar>
    <div class="container">
      <div class="level">
        <div class="level-left level-item">
          <h1 class="title"> {{ $route.name }} </h1>
        </div>
      </div>
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

