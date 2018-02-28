<template>
  <div class="app-version is-inline-block">
    <div class="tags has-addons" v-if="version">
      <span class="tag is-dark">Version</span>
      <span class="tag is-info"> {{ version }} </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SocketStatus',
  data: () => ({
    version: null
  }),
  sockets: {
    version (version) {
      this.version = version
    }
  }
}
</script>
