<template>
  <section class="app" v-cloak>
    <NavBar></NavBar>
    <div class="container">
      <div class="level">
        <div class="level-left level-item">
          <h1 class="title"> {{ $route.name }} </h1>
        </div>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Footer></Footer>
    <div class="is-overlay lock-shade" v-show="!connected"></div>
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
  sockets: {
    connect () {
      this.connected = true
    },
    disconnect () {
      this.connected = false
    }
  },
  data () {
    return {
      connected: false,
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
    padding: 10px;
  }
  [v-cloak] {
    display: none;
  }
  .lock-shade {
    background-color: currentColor;
    opacity: .1;
  }
</style>

