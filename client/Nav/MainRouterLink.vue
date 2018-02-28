<template>
  <router-link v-bind="$props" active-class="is-active">
    <slot></slot>
  </router-link>
</template>
<script>
  export default {
    name: 'MainRouterLink',
    props: [ 'to' ]
  }
</script>
<style scoped>
  .is-active {
    font-weight: bold;
    border-bottom: 1px solid currentColor;
  }
</style>
