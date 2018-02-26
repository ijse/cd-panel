<template>
  <div class="404page">
    <div class="has-text-centered">
      Page Not Found. Redirecting to dashboard...
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Page404',
    created () {
      this.timer = window.setTimeout(() => {
        this.$router.replace('/')
      }, 2000)
    },
    deactivated () {
      this.cancel()
    },
    beforeDestroy () {
      this.cancel()
    },
    methods: {
      cancel () {
        window.clearTimeout(this.timer)
      }
    }
  }
</script>
