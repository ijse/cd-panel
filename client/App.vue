<template>
  <section class="app" v-cloak>
    <NavBar></NavBar>
    <div class="container">
      <div class="level">
        <div class="level-left level-item">
          <h1 class="title"> {{ $route.name }} </h1>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </section>
</template>

<script>
import NavBar from './Nav'
import Footer from './Footer'
export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  data () {
    return {
      msg: 'hello world'
    }
  }
}
</script>
<style>
  html, body {
    height: 100%;
  }
  .app {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .app>.container {
    flex: 1;
  }
  [v-cloak] {
    display: none;
  }
</style>

