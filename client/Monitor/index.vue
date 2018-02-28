<template>
  <div class="monitor">
    <nav class="level">
      <div class="leve-left"></div>
      <div class="level-right">
        <p class="level-item">
          <button class="button is-primary" @click="clearAll()">ClearAll</button>
        </p>
      </div>
    </nav>
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
    },
    created () {
      this.$socket.emit('open-monitor')
    },
    methods: {
      clearAll () {
        this.screen = ''
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
