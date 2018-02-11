<template>
  <div class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        / CDPanel /
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/mr" class="navbar-item"> MR </router-link>
        <router-link to="/backlog" class="navbar-item"> Backlog </router-link>
        <router-link to="/setting" class="navbar-item"> Setting </router-link>
        <router-link to="/help" class="navbar-item"> Help </router-link>
      </div>
    </div>
  </div>
</template>

