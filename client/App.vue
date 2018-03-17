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
    <div class="pageloader is-danger is-right-to-left" style="opacity: .5"
      :class="{ 'is-active': !connected }">
      <span class="title">Connecting...</span>
    </div>
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
      loading: false,
      msg: 'hello world'
    }
  }
}
</script>
<style>
  @import "bulma-tooltip/dist/bulma-tooltip.min.css";
  @import "bulma-pageloader/dist/bulma-pageloader.min.css";

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
</style>

