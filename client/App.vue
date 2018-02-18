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

