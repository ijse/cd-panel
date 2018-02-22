<template>
  <div class="monitor">
    <pre v-html="screen">
    </pre>
  </div>
</template>
<script>
  export default {
    name: 'Monitor',
    data: () => ({
      screen: ''
    }),
    sockets: {
      stdout (str) {
        this.screen += str
      }
    }
  }
</script>
<style>
.monitor pre {
  background-color: black;
  & .timestamp {
    padding: 0 5px;
    float: left;
    overflow: hidden;
    clear: both;
  }
}
</style>
