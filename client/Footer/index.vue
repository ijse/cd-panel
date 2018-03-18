<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <SocketStatus></SocketStatus>
        <Version></Version>
      </div>
    </div>
  </footer>
</template>
<script>
  import Version from './Version'
  import SocketStatus from './SocketStatus'

  export default {
    name: 'Footer',
    components: {
      Version,
      SocketStatus
    }
  }
</script>
