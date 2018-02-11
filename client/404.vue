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
      window.setTimeout(() => {
        this.$router.replace('/')
      }, 2000)
    }
  }
</script>
