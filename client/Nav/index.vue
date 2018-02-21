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
        <router-link to="/mr" class="navbar-item"> MR </router-link>
        <router-link to="/backlog" class="navbar-item"> Backlog </router-link>
        <router-link to="/setting" class="navbar-item"> Setting </router-link>
        <router-link to="/help" class="navbar-item"> Help </router-link>
      </div>
      <div class="navbar-end">
        <ThemeSwitch></ThemeSwitch>
      </div>
    </div>
  </div>
</template>

<script>
  import ThemeSwitch from './ThemeSwitch'

  export default {
    name: 'NavBar',
    components: {
      ThemeSwitch
    },
    data: () => ({
      burgerOn: false
    })
  }
</script>
