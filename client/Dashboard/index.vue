<template>
  <div class="dashboard">
    this is dashboard
  </div>
</template>
<script>
  export default {
    name: 'Dashboard',
    sockets: {
      news (data) {
        console.log('>>', data)
      }
    }
  }
</script>
