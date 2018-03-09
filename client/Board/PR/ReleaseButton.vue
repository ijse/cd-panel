<template>
  <button class="button is-primary" :disabled="isDisabled">
    Release
  </button>
</template>
<script>
  export default {
    name: 'ReleaseButton',
    props: {
      data: Object
    },
    computed: {
      isDisabled () {
        return this.data.buildStats !== 'Ready'
      }
    }
  }
</script>
