<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <SocketStatus></SocketStatus>
      </div>
    </div>
  </footer>
</template>
<script>
  import SocketStatus from './SocketStatus'

  export default {
    name: 'Footer',
    components: {
      SocketStatus
    }
  }
</script>
<style scoped>
  .footer {
    position: sticky;
    bottom: 0;
  }
</style>
