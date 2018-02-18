<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <div class="socket-status">
          <div class="tags has-addons">
            <span class="tag is-dark">Socket</span>
            <span class="tag is-success" v-if="connected"> Connect </span>
            <span class="tag is-danger" v-else> Disconnect </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    name: 'Footer',
    data: () => ({
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
