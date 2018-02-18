<template>
  <button class="button is-primary" :disabled="disabled">
    Release
  </button>
</template>
<script>
  export default {
    name: 'ReleaseButton',
    props: {
      disabled: Boolean
    }
  }
</script>
