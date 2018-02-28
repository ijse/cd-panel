<template>
  <div class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item" title="Dashboard">
        <span class="icon"><i class="fas fa-home"></i></span>/ CDPanel /
      </router-link>
      <div class="navbar-burger" :class="{ 'is-active': burgerOn }"
        @click="burgerOn = !burgerOn">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': burgerOn }">
      <div class="navbar-start">
        <main-router-link to="/board" class="navbar-item"> Board </main-router-link>
        <main-router-link to="/queue" class="navbar-item"> Queue </main-router-link>
        <main-router-link to="/backlog" class="navbar-item"> Backlog </main-router-link>
        <main-router-link to="/monitor" class="navbar-item"> Monitor </main-router-link>
        <main-router-link to="/setting" class="navbar-item"> Setting </main-router-link>
        <main-router-link to="/help" class="navbar-item"> Help </main-router-link>
      </div>
      <div class="navbar-end">
        <span class="navbar-item has-text-danger" v-if="!connected"> Connecting...  </span>
        <a class="navbar-item has-text-info" v-else>
          <span class="icon"><i class="fab fa-github"></i></span>
          tigerbrokers/gem
        </a>
        <ThemeSwitch></ThemeSwitch>
      </div>
    </div>
  </div>
</template>

<script>
  import MainRouterLink from './MainRouterLink'
  import ThemeSwitch from './ThemeSwitch'

  export default {
    name: 'NavBar',
    components: {
      MainRouterLink,
      ThemeSwitch
    },
    data: () => ({
      burgerOn: false,
      connected: false
    }),
    sockets: {
      connect () {
        this.connected = true
      },
      disconnect () {
        this.connected = false
      }
    }
  }
</script>
