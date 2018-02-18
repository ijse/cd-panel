<template>
  <div class="navbar is-fixed-top">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        / CDPanel /
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
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    data: () => ({
      burgerOn: false
    })
  }
</script>
