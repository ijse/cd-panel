<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <SocketStatus></SocketStatus>
        <Version></Version>
        <a class="has-text-info is-pulled-right">
          <span class="icon"><i class="fab fa-github"></i></span>
          tigerbrokers/gem
        </a>
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
